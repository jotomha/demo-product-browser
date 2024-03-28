import { Button, Card, Text } from "@chakra-ui/react";
import { CartProduct } from "./CartDisplay";
import SearchBar from "./SearchBar";
import { stringToNumber } from "../services/stringToNumber";

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
      justifyContent="space-evenly"
      width="100%"
    >
      <Button backgroundColor="#f1807e" onClick={onDelete}>
        X
      </Button>
      <Text>{product.title}</Text>
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
      <SearchBar
        onSearch={(t: string) =>
          onUpdateQuantity(Math.max(1, stringToNumber(t, product.quantity)))
        }
        placeholder={product.quantity.toString()}
        width="20px"
      ></SearchBar>
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
      <Text>${product.total}</Text>
    </Card>
  );
};

export default CartItem;
