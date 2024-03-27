import useProducts from "../hooks/useProducts";
import { List, ListItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import { ProductRequest } from "../App";
import Product from "./Product";

interface Props {
  prodReq: ProductRequest;
}

const ProductDisplay = ({ prodReq }: Props) => {
  const { data, load } = useProducts(prodReq);

  if (load) return <Spinner />;
  return (
    <SimpleGrid columns={{ md: 1, lg: 2, xl: 3 }} spacing={5} padding="10px">
      {data?.map((prod) => (
        <Product prod={prod} key={prod.id} />
      ))}
    </SimpleGrid>
  );
};

export default ProductDisplay;
