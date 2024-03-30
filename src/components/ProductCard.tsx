import {
  Card,
  Image,
  CardBody,
  Button,
  Heading,
  CardFooter,
  Stack,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { ProdObj } from "../hooks/useProducts";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { stringToNumber } from "../services/stringToNumber";
import ShortenedText from "./ShortenedText";
import "./ProductCard.css";
import FullProductModal from "./FullProductModal";
import StarRating from "./StarRating";
import DiscountedText from "./DiscountedText";

interface Props {
  prod: ProdObj;
  onClickAdd: (quantity: number) => void;
}

const ProductCard = ({ prod, onClickAdd }: Props) => {
  const [cartAddAmount, setCartAddAmount] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        direction={{ base: "row" }}
        overflow="hidden"
        borderRadius="10px"
        className="product-card"
        minHeight={{ base: "300px", lg: "250px" }}
        minWidth={{ base: "100%", lg: "300px" }}
        height="fit"
      >
        <Image
          src={prod.thumbnail}
          objectFit="cover"
          maxWidth={{ base: "40%" }}
          maxHeight={{ base: "100%" }}
          alt={prod.title}
        />
        <Stack width="60%">
          <CardBody padding={{ base: "13px", lg: "20px" }} onClick={onOpen}>
            <Heading
              fontSize={{ base: "1.2rem", md: "1.5rem" }}
              overflowWrap="break-word"
              maxWidth={"100%"}
            >
              {prod.title}
            </Heading>
            <Stack
              justify={{ base: "space-evenly", lg: "space-between" }}
              flexDirection={{ base: "column", lg: "row" }}
              marginBottom={{ base: "5%", sm: "0px" }}
            >
              <StarRating rating={prod.rating}></StarRating>
              <DiscountedText
                normalPrice={prod.price}
                discountPerc={prod.discountPercentage}
                showDiscount={false}
              ></DiscountedText>
            </Stack>
            <ShortenedText
              txt={prod.description}
              limit={25}
              appendText="(see more)"
            ></ShortenedText>
          </CardBody>
          <CardFooter
            display="flex"
            justify={{ base: "center", sm: "right" }}
            paddingTop="0px"
          >
            <Box display={{ base: "none", sm: "inline" }} marginRight="5%">
              <SearchBar
                onSearch={(t) => setCartAddAmount(stringToNumber(t, 1))}
                placeholder={cartAddAmount.toString()}
                width="50px"
              />
            </Box>
            <Button
              wordBreak="break-word"
              onClick={() => {
                onClickAdd(cartAddAmount);
              }}
            >
              Quick Add
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      <FullProductModal
        prod={prod}
        isOpen={isOpen}
        onClose={onClose}
        onAdd={onClickAdd}
      />
    </>
  );
};

export default ProductCard;
