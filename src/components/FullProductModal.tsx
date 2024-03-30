import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
  Text,
  Stack,
  Button,
} from "@chakra-ui/react";
import { ProdObj } from "../hooks/useProducts";
import { clamp } from "../services/clamp.ts";
import { useState } from "react";
import StarRating from "./StarRating.tsx";
import DiscountedText from "./DiscountedText.tsx";

interface Props {
  prod: ProdObj;
  onClose: () => void;
  onAdd: (amount: number) => void;
  isOpen: boolean;
}

const FullProductModal = ({ prod, onClose, onAdd, isOpen }: Props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const onLeft = () => {
    setImageIndex(clamp(0, prod.images.length - 1, imageIndex - 1));
  };
  const onRight = () => {
    setImageIndex(clamp(0, prod.images.length - 1, imageIndex + 1));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
      <ModalContent
        width={{ base: "90vw", sm: "75vw", md: "60vw", lg: "40vw" }}
      >
        <ModalHeader
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          padding={{ base: "10px", sm: "15px", md: "20px" }}
          paddingRight={{ base: "15%", sm: "15%", md: "15%" }} //Have to have overrides at each media rule for padding-right
        >
          <Text marginRight="5%">{prod.title}</Text>
          <DiscountedText
            normalPrice={prod.price}
            discountPerc={prod.discountPercentage}
            showDiscount={true}
          />
        </ModalHeader>
        <ModalCloseButton />
        <Box position="relative">
          <Button
            position="absolute"
            top="50%"
            left="5px"
            backgroundColor="rgba(0,0,0,0.7)"
            color="white"
            onClick={onLeft}
          >
            &lt;
          </Button>
          <Image src={prod.images[imageIndex]} alt={"Image not found."} />
          <Button
            position="absolute"
            top="50%"
            right="5px"
            backgroundColor="rgba(0,0,0,0.7)"
            color="white"
            onClick={onRight}
          >
            &gt;
          </Button>
        </Box>
        <ModalBody>
          <Stack
            flexDir="column"
            justifyContent="space-between"
            alignItems="flex-start"
            height="100%"
          >
            <Text fontSize="1.2rem">
              <Text as="b">Description:</Text>
              <br />
              {prod.description}
            </Text>
            <Box>
              <Text fontSize="1rem">
                Distributed by <Text as="b">{prod.brand}</Text>
              </Text>
              <Text fontSize="1rem">
                Listed under <Text as="b">{prod.category}</Text>
              </Text>
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <StarRating rating={prod.rating} />
          <Button
            onClick={() => {
              onAdd(1);
              onClose();
            }}
          >
            Add to cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FullProductModal;
