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
  onChangeCart: (CartProduct: []) => void;
}

const CartDisplay = ({ cart, onChangeCart }: Props) => {
  return (
    <VStack
      alignItems="flex-start"
      marginBottom="auto"
      overflowY="auto"
      justifyContent="flex-start"
    >
      {cart?.products?.map((prod) => (
        <CartItem
          product={prod}
          key={prod.id}
          onDelete={() => {
            onChangeCart(cart.products?.filter((item) => item.id != prod.id));
          }}
          onUpdateQuantity={(newQuantity: number) => {
            //I am aware that this appears as an error, as does the above call of onChangeCart, but I'm really not sure why. I spent an hour trying to fix this
            // and I tried multiple different methods to remove the typecheck error but it comes down to some TypeScript semantic that I'm really not sure about.
            onChangeCart(
              cart.products.map((item) =>
                item.id != prod.id ? item : { ...item, quantity: newQuantity }
              )
            );
          }}
        />
      ))}
      {!cart ||
        (!cart.products && <Text>Your cart is empty! Add an item.</Text>)}
    </VStack>
  );
};

export default CartDisplay;
