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
import { useEffect, useState } from "react";
import { stringToNumber } from "../services/stringToNumber";
import ShortenedText from "./ShortenedText";
import "../styles/ProductCard.css";
import FullProductModal from "./FullProductModal";
import StarRating from "./StarRating";
import DiscountedText from "./DiscountedText";

interface Props {
  prod: ProdObj;
  onClickAdd: (quantity: number) => void;
  setModalOpen: (v: boolean) => void;
}

// Renders a product card. Nothing real fancy going on here. Returned as a fragment because
//each product card has a modal associated with it, which is a separate componenet from the card.
const ProductCard = ({ prod, onClickAdd, setModalOpen }: Props) => {
  const [cartAddAmount, setCartAddAmount] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure(); // hook implemented in Chakra that works with the chakra modal component.

  useEffect(() => {
    setModalOpen(isOpen); //Runs every time component re-renders
  })
  
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
        <Stack width="60%" className="see_more">
          <CardBody padding={{ base: "13px", lg: "20px" }} onClick={() => {onOpen(); setModalOpen(true)}}>
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
              <Box display="flex" flexDir="row" justifyContent="left">
                <DiscountedText
                  normalPrice={prod.price}
                  discountPerc={prod.discountPercentage}
                  showDiscount={false}
                />
              </Box>
            </Stack>
            <ShortenedText
              txt={prod.description}
              limit={25}
              appendText="(see more)"
            />
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
        onClose={() => {onClose(); setModalOpen(false);}}
        onAdd={onClickAdd}
      />
    </>
  );
};

export default ProductCard;
