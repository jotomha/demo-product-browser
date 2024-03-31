import { VStack, Text } from "@chakra-ui/react";
import CartItem from "./CartItem";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

interface Props {
  cart: Cart;
  onChangeCart: (prodList: CartProduct[]) => void;
}

// Displays all items under the products field inside cart.
const CartDisplay = ({ cart, onChangeCart }: Props) => {
  return (
    <VStack
      alignItems="flex-start"
      marginBottom="auto"
      overflowY="auto"
      justifyContent="flex-start"
    >
      {
        /* convert cart into list of cart items */ cart?.products?.map(
          (prod) => (
            <CartItem
              product={prod}
              key={prod.id}
              onDelete={() => {
                onChangeCart(
                  /* remove the item connected to this cartitem from the products list */
                  cart.products?.filter((item) => item.id != prod.id)
                );
              }}
              onUpdateQuantity={(newQuantity: number) => {
                onChangeCart(
                  /* remap current product list to a new list with same products, but updated quant for selected product */
                  cart.products.map((item) =>
                    item.id != prod.id
                      ? item
                      : { ...item, quantity: newQuantity }
                  )
                );
              }}
            />
          )
        )
      }
      {
        !cart ||
          (!cart.products && (
            <Text>Your cart is empty! Add an item.</Text>
          )) /* default message for null cart or no items*/
      }
    </VStack>
  );
};

export default CartDisplay;
