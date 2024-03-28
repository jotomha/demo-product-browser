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

interface Props {
  prod: ProdObj;
  onClose: () => void;
  onAdd: (amount: number) => void;
  isOpen: boolean;
}

const FullProductModal = ({ prod, onClose, onAdd, isOpen }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
    <ModalContent width="40vw">
      <ModalHeader>{prod.title}</ModalHeader>
      <ModalCloseButton />
      <Box>
        <Image src={prod.images[0]} alt={"Image not found."} />
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
      <ModalFooter>
        <Text></Text>
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

export default FullProductModal;
