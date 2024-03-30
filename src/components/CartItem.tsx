import { Box, Button, Card, Text } from "@chakra-ui/react";
import { CartProduct } from "./CartDisplay";
import DiscountedText from "./DiscountedText";

interface Props {
  product: CartProduct;
  onDelete: () => void;
  onUpdateQuantity: (newQuantity: number) => void;
}

const CartItem = ({ product, onDelete, onUpdateQuantity }: Props) => {
  //Cart item can do 2 things:
  //  1. Update quantity of any given product.
  //  2. Fully remove item from cart.

  return (
    <Card
      flexDirection="row"
      alignItems="center"
      overflow="hidden"
      justifyContent="space-between"
      padding="10px"
      width="100%"
    >
      <Button backgroundColor="#f1807e" onClick={onDelete}>
        X
      </Button>
      <Text textAlign="center" lineHeight="1">
        {product.title}
      </Text>
      <Box display="flex" flexDir="row" alignItems="center">
        <Button
          height="20px"
          width="20px"
          margin="0px"
          padding="0px"
          paddingBottom="3px"
          onClick={() => onUpdateQuantity(Math.max(1, product.quantity - 1))}
        >
          &lt;
        </Button>
        <Text margin="0px 5px 0px 5px">{product.quantity}</Text>
        <Button
          height="20px"
          width="20px"
          margin="0px"
          padding="0px"
          paddingBottom="3px"
          onClick={() => onUpdateQuantity(product.quantity + 1)}
        >
          &gt;
        </Button>
      </Box>
      <DiscountedText
        normalPrice={product.price}
        discountPerc={product.discountPercentage}
        discountPrice={product.discountedPrice}
        showDiscount={false}
      />
    </Card>
  );
};

export default CartItem;
