import { Box, Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import "./App.css";
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

  useEffect(() => {
    /* were you able to save cart states on the server, this could be used to initially load the cart with a certain id. Keep dependencies empty to only 
  run this initial loading once.
    getCart(setCart, []); */
    setProductQuery({ ...productQuery, page: 1 }); //Anytime the category changes, reset the page to 1 (don't want to stay on page 100 if there's only 5 products to display)
  }, [productQuery.category]);

  return (
    <>
      <Grid
        templateAreas={{
          base: '"nav" "products"',
          lg: '"nav nav" "products cart"',
        }}
        templateColumns={{
          base: "1fr 0fr",
          lg: "0.75fr 0.25fr",
        }}
        templateRows={{
          base: "0.15fr 1fr",
        }}
        height="100%"
        width="100%"
      >
        <GridItem
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
          <Box bgColor="rgba(0,0,0,0.3)" width="100%">
            <CategoryDisplay
              selectedCategory={productQuery.category}
              onSelectCategory={(t) =>
                setProductQuery({ ...productQuery, category: t })
              }
            />
          </Box>
        </GridItem>

        <GridItem
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
            <Button
              display={{ base: "flex", lg: "none" }}
              marginBottom="10px"
              onClick={() => setCartOpen(true)}
            >
              Cart
            </Button>
          </Box>
          <Box
            display="flex"
            flexDir={{ base: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="left"
            marginBottom="10px"
          >
            <Box
              display={{ base: "block", md: "inline" }}
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
            <Box width={{ base: "100%", sm: "0%" }} height="5px" />
            <PageSelector
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
            />
          </Box>
          <ProductDisplay
            prodReq={productQuery}
            onAddItem={(itemId: number, itemQuantity: number) => {
              let postProducts = productToPost(cart.products);
              if (postProducts) {
                const index = postProducts.findIndex((p) => p.id === itemId);
                if (index < 0) {
                  postProducts.push({
                    id: itemId,
                    quantity: itemQuantity,
                  });
                } else {
                  postProducts[index] = {
                    ...postProducts[index],
                    quantity: postProducts[index].quantity + itemQuantity,
                  };
                }
              } else {
                postProducts = [{ id: itemId, quantity: itemQuantity }];
              }
              getCart(setCart, postProducts);
            }}
          />
        </GridItem>

        <GridItem
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
          <CartDisplay
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
          >
            <Box>
              <Text>
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
            {/*Note: the functionality of these two buttons in this demo application is the same. In reality this would not be the case.*/}
            <Button onClick={() => getCart(setCart, [])}>Checkout</Button>
            <Button onClick={() => getCart(setCart, [])}>Empty Cart</Button>
          </Box>
        </GridItem>
      </Grid>
      <Box
        className={`mobile_cart ${cartOpen ? "cart_active" : ""}`}
        bgColor="rgba(31,31,43)"
        display={{ base: "flex", lg: "none" }}
        flexDirection="column"
        justifyContent="space-between"
        padding="5%"
      >
        <Box display="flex" justifyContent="space-between">
          <Heading fontSize="2xl" margin="10px">
            Your Cart
          </Heading>
          <Button onClick={() => setCartOpen(false)}>Close Cart</Button>
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
        <Box display="flex" flexDir="column" justifyContent="space-between">
          <Box>
            <Text marginBottom="10px">
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
