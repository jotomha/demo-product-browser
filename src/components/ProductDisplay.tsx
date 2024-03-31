import useProducts from "../hooks/useProducts";
import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { ProductRequest } from "../App";
import ProductCard from "./ProductCard";

interface Props {
  prodReq: ProductRequest;
  onAddItem: (itemId: number, itemQuantity: number) => void;
}

//Converts a list of products to a grid of product cards. Adaptively changes the
//number of rows based on the size of the screen (as stated in App.tsx, chakra
//automatically implements @media rules when given object sizing in the form of
//{{base:, etc..}}
const ProductDisplay = ({ prodReq, onAddItem }: Props) => {
  const { data, load } = useProducts(prodReq);

  if (load) return <Spinner />;
  return (
    <SimpleGrid
      columns={{ base: 1, xl: 2, "2xl": 3 }}
      spacing={5}
      padding={{ base: "0px", lg: "10px" }}
      height="100%"
      overflowY="scroll"
    >
      {data?.map((prod) => (
        <ProductCard
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
