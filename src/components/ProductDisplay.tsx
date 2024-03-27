import useProducts from "../hooks/useProducts";
import { Heading, List, ListItem, Spinner } from "@chakra-ui/react";
import { ProductRequest } from "../App";

interface Props {
  prodReq: ProductRequest;
}

const ProductDisplay = ({ prodReq }: Props) => {
  const { data, load } = useProducts(prodReq);

  if (load) return <Spinner />;
  return (
    <>
      <List>
        {data?.map((prod) => (
          <ListItem key={prod.id} paddingY="5px">
            {prod.title}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ProductDisplay;
