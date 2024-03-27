import {
  Card,
  HStack,
  Image,
  CardBody,
  Box,
  Button,
  Heading,
  VStack,
  CardFooter,
  Text,
  Stack,
} from "@chakra-ui/react";
import { ProdObj } from "../hooks/useProducts";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { stringToNumber } from "../services/stringToNumber";

interface Props {
  prod: ProdObj;
}

const Product = ({ prod }: Props) => {
  const [cartAmount, setCartAmount] = useState(1);

  return (
    <Card direction={{ base: "row" }} overflow="hidden" borderRadius="10px">
      <Image
        src={prod.thumbnail}
        objectFit="cover"
        maxWidth={{ base: "40%" }}
        maxHeight={{ base: "100%" }}
        alt={prod.title}
      />
      <Stack width="100%">
        <CardBody>
          <Heading fontSize="1.5rem">{prod.title}</Heading>
          <HStack justify="space-between">
            <Box fontSize="0.8rem">{prod.rating}/5</Box>
            <Text fontSize="1rem">${prod.price}</Text>
          </HStack>
        </CardBody>
        <CardFooter display="flex" justify="space-between">
          <SearchBar
            onSearch={(t) => setCartAmount(stringToNumber(t, 1))}
            placeholder={cartAmount.toString()}
            width="50px"
          ></SearchBar>
          <Button wordBreak="break-word">Quick Add</Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default Product;
