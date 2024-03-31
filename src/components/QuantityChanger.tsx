import { Box, Button } from "@chakra-ui/react";
import React from "react";

interface Props {
  quantity: number;
  onUpdateQuantity: (n: number) => void;
}

const QuantityChanger = ({ quantity, onUpdateQuantity }: Props) => {
  return (
    <Box display="flex" flexDir="row" alignItems="center">
      <Button
        height="20px"
        width="20px"
        margin="0px"
        padding="0px"
        paddingBottom="3px"
        onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
      >
        &lt;
      </Button>
      <Box margin="0px 5px 0px 5px">{quantity}</Box>
      <Button
        height="20px"
        width="20px"
        margin="0px"
        padding="0px"
        paddingBottom="3px"
        onClick={() => onUpdateQuantity(quantity + 1)}
      >
        &gt;
      </Button>
    </Box>
  );
};

export default QuantityChanger;
