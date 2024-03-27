import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import "./App.css";
import ProductDisplay from "./components/ProductDisplay";
import FilterCategory from "./components/FilterCategory";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import PageSelector from "./components/PageSelector";

export interface ProductRequest {
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
    prodPerPage: 16,
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
      <GridItem area="nav">
        <SearchBar
          onSearch={(t) => setProductQuery({ ...productQuery, search: t })}
          placeholder="Search for specific products"
          width="100vw"
        />
      </GridItem>
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
      <GridItem area="products" bgColor="skyblue" w="100%" padding="20px">
        <Heading fontSize="2xl" margin="10px">
          Products
        </Heading>
        <PageSelector
          onLeft={() => {
            setProductQuery({
              ...productQuery,
              page: Math.max(productQuery.page - 1, 1),
            });
          }}
          onRight={() => {
            setProductQuery({ ...productQuery, page: productQuery.page + 1 });
          }}
          page={productQuery.page}
          perPage={productQuery.prodPerPage}
          onChangePerPage={(t: number) =>
            setProductQuery({ ...productQuery, prodPerPage: t })
          }
        />
        <ProductDisplay prodReq={productQuery}></ProductDisplay>
      </GridItem>
      <GridItem area="cart" bgColor="olive">
        this the cart
      </GridItem>
    </Grid>
  );
}

export default App;
