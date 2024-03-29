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
      <ModalContent width="40vw">
        <ModalHeader>{prod.title}</ModalHeader>
        <ModalCloseButton />
        <Box>
          <Button
            position="absolute"
            top="50%"
            backgroundColor="rgba(0,0,0,0.5)"
            color="white"
            onClick={onLeft}
          >
            &lt;
          </Button>
          <Image src={prod.images[imageIndex]} alt={"Image not found."} />
          <Button
            position="absolute"
            top="50%"
            right="0%"
            backgroundColor="rgba(0,0,0,0.5)"
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
              Description: <br />
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
        <ModalFooter display="flex" justifyContent="space-between">
          <Text>{prod.rating}/5 stars</Text>
          <Button
            onClick={() => {
              onAdd(1);
              onClose();
            }}
          >
            Add to cart (${prod.price})
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FullProductModal;
