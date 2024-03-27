import { Grid, GridItem, Heading, List, ListItem } from "@chakra-ui/react";
import "./App.css";
import ProductDisplay from "./components/ProductDisplay";
import FilterCategory from "./components/FilterCategory";
import { useState } from "react";

interface ProductRequest {
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
    prodPerPage: 30,
  });

  return (
    <Grid
      templateAreas={{
        base: '"nav nav nav" "filter products cart"',
      }}
      templateColumns={{
        base: "10vw 80vw 10vw",
      }}
      templateRows={{
        base: "10vh 90vh",
      }}
    >
      <GridItem area="nav">nav bar</GridItem>
      <GridItem area="filter" bgColor="tomato" padding="5%">
        <Heading fontSize="2xl" marginBottom={3} margin={5}>
          Filters
        </Heading>
        <List>
          <ListItem>
            <FilterCategory
              selectedCategory={productQuery.category}
              onSelectCategory={(t) =>
                setProductQuery({ ...productQuery, category: t })
              }
            />
          </ListItem>
        </List>
      </GridItem>
      <GridItem area="products" bgColor="skyblue" w="100%"></GridItem>
      <GridItem area="cart" bgColor="olive">
        this the cart
      </GridItem>
    </Grid>
  );
}

export default App;
