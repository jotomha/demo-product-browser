import useProducts from "../hooks/useProducts";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { ProductRequest } from "../App";
import Product from "./ProductCard";

interface Props {
  prodReq: ProductRequest;
  onAddItem: (itemId: number, itemQuantity: number) => void;
}

const ProductDisplay = ({ prodReq, onAddItem }: Props) => {
  const { data, load } = useProducts(prodReq);

  if (load) return <Spinner />;
  return (
    <SimpleGrid
      columns={{ md: 1, lg: 1, xl: 2 }}
      spacing={5}
      padding="10px"
      height="100%"
      overflowY="scroll"
    >
      {data?.map((prod) => (
        <Product
          prod={prod}
          key={prod.id}
          onClickAdd={(quantity: number) => {
            console.log(`Adding ${quantity} to ${prod.title}`);
            onAddItem(prod.id, quantity);
          }}
        />
      ))}
    </SimpleGrid>
  );
};

export default ProductDisplay;
