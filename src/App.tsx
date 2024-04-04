import { Box, Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import ProductDisplay from "./components/ProductDisplay";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import PageSelector from "./components/PageSelector";
import CartDisplay, { Cart, CartProduct } from "./components/CartDisplay";
import { getCart } from "./hooks/useCart";
import { productToPost } from "./services/productToPost";
import CategoryDisplay from "./components/CategoryDisplay";
import SavingBadge from "./components/SavingBadge";
import "./styles/MobileCart.css";

export interface ProductRequest {
  category: string | null;
  search: string | null;
  page: number;
  prodPerPage: number;
}

function App() {
  const [productQuery, setProductQuery] = useState<ProductRequest>({
    category: null,
    search: null,
    page: 1,
    prodPerPage: 16,
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Cart>({} as Cart);
  const [anyModalOpen, setAnyModalOpen] = useState(false);


  useEffect(() => {
    /* were you able to save cart states on the server, this could be used to initially load the cart with a certain id. Keep dependencies empty to only 
  run this initial loading once.
    getCart(setCart, []); */
    setProductQuery({ ...productQuery, page: 1 }); //Anytime the category changes, reset the page to 1 (don't want to stay on page 100 if there's only 5 products to display)
  }, [productQuery.category]);

  return (
    <>
      <Grid //Chakra grid splits the available space into different labeled areas, and implements @media rules automatically to handle
        //formatting of the grid at different screen sizes (base: is 0px, lg: is ~992px)
        templateAreas={{
          base: '"nav" "products"',
          lg: '"nav nav" "products cart"',
        }}
        templateColumns={{
          base: "1fr 0fr",
          lg: "0.75fr 0.25fr",
        }}
        templateRows={{
          base: "0.30fr 1fr",
          sm: "0.15fr 1fr"
        }}
        height={{base: "150%", sm: "100%"}}
        width="100%"
      >
        <GridItem //Main title area & category navigation
          area="nav"
          paddingTop="10px"
          maxHeight="300px"
          minWidth="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Heading marginBottom="12px" textAlign="center">
            Demo Product Browser
          </Heading>
          <Box /* Note: Chakra boxes are just basic divs */
            bgColor="rgba(0,0,0,0.3)"
            width="100%" /* Background box makes category display pop out more */
          >
            <CategoryDisplay
              selectedCategory={productQuery.category}
              onSelectCategory={(t) =>
                setProductQuery({ ...productQuery, category: t })
              }
            />
          </Box>
        </GridItem>

        <GridItem // This is the area for the product display, which contains a search bar, page navigator, and, at smaller resolutions, a button to open the cart.
          area="products"
          h="100%"
          w="100%"
          padding="20px"
          overflowY="hidden"
          paddingBottom="100px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Heading fontSize="2xl" marginBottom="10px">
              Products
            </Heading>
            <Button // Button only displays at smaller resolutions, once the "cart" area disappears from the main grid (implemented with @media rules provided by Chakra)
              display={{ base: "flex", lg: "none" }}
              marginBottom="10px"
              onClick={() => setCartOpen(true)}
            >
              Cart
            </Button>
          </Box>
          <Box // This area holds search bar and page selecter. At smaller resolutions, flex changes to column display to give more space
            // to the search bar.
            display="flex"
            flexDir={{ base: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="left"
            marginBottom="10px"
          >
            <Box
              display={{ base: "block", md: "inline" }} //This is just a containing box for the search bar. Since search bar component is used
              // in more places than just here, I didn't want to lock in a media rule for all search bars, just this main one. This box just forces search
              // bar to stretch across whole display at smaller resolutions, and fit available space in larger.
              width={{ base: "100%" }}
            >
              <SearchBar
                onSearch={(t) =>
                  setProductQuery({ ...productQuery, search: t })
                }
                placeholder="Search for specific products"
                width="100%"
              />
            </Box>
            {/* Small spacing box to divide search bar and page selector vertically in smaller resolutions */}
            <Box width={{ base: "100%", sm: "0%" }} height="10px" />
            <PageSelector /* See page selector component */
              onLeft={() => {
                setProductQuery({
                  ...productQuery,
                  page: Math.max(productQuery.page - 1, 1),
                });
              }}
              onRight={() => {
                setProductQuery({
                  ...productQuery,
                  page: productQuery.page + 1,
                });
              }}
              page={productQuery.page}
              perPage={productQuery.prodPerPage}
              onChangePerPage={(t: number) =>
                setProductQuery({ ...productQuery, prodPerPage: t })
              }
              /* End navigation box */
            />
          </Box>
          <ProductDisplay /* See component for implementation */
            prodReq={productQuery}
            onAddItem={(itemId: number, itemQuantity: number) => {
              let postProducts = productToPost(
                /* See services */
                cart.products
              );
              if (postProducts) {
                const index = postProducts.findIndex(
                  (p) => p.id === itemId
                ); /* If the item we're changing quantity of already exists in the cart, 
                don't push a new object to the array */
                if (index < 0) {
                  /* Item doesn't exist, so can use .push */
                  postProducts.push({
                    id: itemId,
                    quantity: itemQuantity,
                  });
                } else {
                  /* Item does exist, so override previous quantity */
                  postProducts[index] = {
                    ...postProducts[index],
                    quantity: postProducts[index].quantity + itemQuantity,
                  };
                }
              } else {
                // Only one item, so post products could be undefined, in which case .push() wouldn't work
                postProducts = [{ id: itemId, quantity: itemQuantity }];
              }
              getCart(setCart, postProducts); // Actually set the cart via the API
            }}
            setModalOpen={setAnyModalOpen}
          />
        </GridItem>

        <GridItem /* Final display area. This (and the following box that's rendered outside of the grid) is my biggest gripe with my design of this
        webpage. There's a lot of repeated code between the two areas (since both are a cart display, but one is a pop out menu) and I just wasn't sure how to 
        completely alter the structure of the cart so completely between the popout and the normal display that I fully divided the two areas. It's not that their 
        components are different, it's that the formatting is different. */
          area="cart"
          display={{ base: "none", lg: "flex" }}
          flexDirection="column"
          justifyContent="space-between"
          padding="10px"
          width="100%"
        >
          <Heading fontSize="2xl" margin="10px">
            Your Cart
          </Heading>
          <CartDisplay /* See cartDisplay component */
            onChangeCart={(productList: CartProduct[]) =>
              getCart(setCart, productToPost(productList))
            }
            cart={cart}
          />
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            /* Renders the price and checkout /empty buttons */
          >
            <Box
              maxWidth="33%" /* While I definitely could have used the discountedText component here, I wanted finer control over the formatting, so took this approach instead. */
            >
              <Text overflowWrap="anywhere">
                Total price: ${cart.discountedTotal ? cart.discountedTotal : 0}
              </Text>
              {cart.discountedTotal && (
                <Box display={{ lg: "none", xl: "flex" }}>
                  <SavingBadge
                    preText="Saving $"
                    number={(cart.total - cart.discountedTotal).toString()}
                    postText="!"
                  />
                </Box>
              )}
            </Box>
            {/*Note: the functionality of these two buttons in this demo application is the same. In reality this would not be the case.*/}
            <Button onClick={() => getCart(setCart, [])}>Checkout</Button>
            <Button onClick={() => getCart(setCart, [])}>Empty Cart</Button>
          </Box>
        </GridItem>
      </Grid>

      <Box
        className={`mobile_cart ${
          cartOpen ? "cart_active" : ""
        } ${anyModalOpen ? "disabled" : ""}`} /* when cart is active, set the transform differently. transition dur set to 0.3s */
        bgColor="rgba(25,31,44)"
        display={{base:"flex", lg:"none"}}
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          justifyContent="space-between" /* Add a close cart button */
        >
          <Heading fontSize="2xl" margin="10px">
            Your Cart
          </Heading>
          <Button onClick={() => setCartOpen(false)} minWidth="0px">
            Close Cart
          </Button>
        </Box>
        <Box
          bgColor="rgba(28,28,35)"
          borderRadius="20px"
          width="100%"
          height="100%"
          padding="20px"
          marginBottom="10px"
        >
          <CartDisplay
            onChangeCart={(productList: CartProduct[]) =>
              getCart(setCart, productToPost(productList))
            }
            cart={cart}
          />
        </Box>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="space-between" /* Renders the price and checkout /empty buttons */
        >
          <Box
            display="flex"
            flexDir="row"
            alignItems="center"
            marginBottom="10px"
          >
            <Text marginRight="20px">
              Total price: ${cart.discountedTotal ? cart.discountedTotal : 0}
            </Text>
            {cart.discountedTotal && (
              <SavingBadge
                preText="Saving $"
                number={(cart.total - cart.discountedTotal).toString()}
                postText="!"
              />
            )}
          </Box>
          <Button onClick={() => getCart(setCart, [])} marginBottom="10px">
            Checkout
          </Button>
          <Button onClick={() => getCart(setCart, [])}>Empty Cart</Button>
        </Box>
      </Box>
    </>
  );
}

export default App;
