import {
  Card,
  HStack,
  Image,
  CardBody,
  Box,
  Button,
  Heading,
  CardFooter,
  Text,
  Stack,
} from "@chakra-ui/react";
import { ProdObj } from "../hooks/useProducts";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { stringToNumber } from "../services/stringToNumber";
import ShortenedText from "./ShortenedText";
import "./ProductCard.css";

interface Props {
  prod: ProdObj;
  onClickAdd: (quantity: number) => void;
}

const ProductCard = ({ prod, onClickAdd }: Props) => {
  const [cartAddAmount, setCartAddAmount] = useState(1);

  return (
    <Card
      direction={{ base: "row" }}
      overflow="hidden"
      borderRadius="10px"
      className="product-card"
      minHeight="200px"
      minWidth="300px"
    >
      <Image
        src={prod.thumbnail}
        objectFit="cover"
        maxWidth={{ base: "40%" }}
        maxHeight={{ base: "100%" }}
        alt={prod.title}
      />
      <Stack width="100%">
        <CardBody paddingBottom="0px">
          <Heading fontSize="1.5rem">{prod.title}</Heading>
          <HStack justify="space-between">
            <Box fontSize="0.8rem">{prod.rating}/5</Box>
            <Text fontSize="1rem">${prod.price}</Text>
          </HStack>
          <ShortenedText
            children={prod.description}
            limit={25}
            appendText="(see more)"
          ></ShortenedText>
        </CardBody>
        <CardFooter display="flex" justify="space-between" paddingTop="0px">
          <SearchBar
            onSearch={(t) => setCartAddAmount(stringToNumber(t, 1))}
            placeholder={cartAddAmount.toString()}
            width="50px"
          ></SearchBar>
          <Button
            wordBreak="break-word"
            onClick={() => {
              console.log(`Clicked quick add for ${prod.title}`);
              onClickAdd(cartAddAmount);
            }}
          >
            Quick Add
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ProductCard;
