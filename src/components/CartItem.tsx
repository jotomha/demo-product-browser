import { Box, Button, Card } from "@chakra-ui/react";
import { CartProduct } from "./CartDisplay";
import DiscountedText from "./DiscountedText";
import QuantityChanger from "./QuantityChanger";

interface Props {
  product: CartProduct;
  onDelete: () => void;
  onUpdateQuantity: (newQuantity: number) => void;
}

const CartItem = ({ product, onDelete, onUpdateQuantity }: Props) => {
  return (
    <Card
      flexDirection="row"
      alignItems="center"
      overflow="hidden"
      justifyContent="space-between"
      padding="10px"
      width="100%"
    >
      {/*Delete button*/}
      <Button backgroundColor="#f1807e" onClick={onDelete}>
        X
      </Button>
      {/*Chakra Box (renders as div) containing the rest of the items. 
      Switches flex from column on phone screens to row on anything bigger for better display. */}
      <Box
        display="flex"
        flexDir={{ base: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems="center"
        minWidth="80%"
      >
        <Box textAlign="center" lineHeight="1">
          {product.title}
        </Box>
        {/*Left and right buttons to change amount of product */}
        <QuantityChanger
          onUpdateQuantity={onUpdateQuantity}
          quantity={product.quantity}
        />
        {/*Render the total discounted price of the products (calculated with quantity). 
        I considered showing the savings you were making on each item here as well (which 
        is why I just used a discountedText component) but the cartItem display became too crowded*/}
        <DiscountedText
          normalPrice={product.price}
          discountPerc={product.discountPercentage}
          discountPrice={product.discountedPrice}
          showDiscount={false}
        />
      </Box>
    </Card>
  );
};

export default CartItem;
