import { Badge, Box, HStack, Text } from "@chakra-ui/react";
interface Props {
  normalPrice: number;
  discountPerc: number;
  showDiscount: boolean;
}
const DiscountedText = ({ normalPrice, discountPerc, showDiscount }: Props) => {
  const discountPrice = Math.round(
    normalPrice - normalPrice * (discountPerc / 100)
  );
  return (
    <HStack spacing="5%" alignItems="center">
      {showDiscount && (
        <Badge color="white" bgColor="#F88379" borderRadius="5px">
          %{Math.round(discountPerc)} off!
        </Badge>
      )}
      <Text as="b">${discountPrice}</Text>
      {showDiscount && (
        <Text as="s" fontWeight="normal" color="rgba(255, 255, 255, 0.7)">
          ${normalPrice}
        </Text>
      )}
    </HStack>
  );
};

export default DiscountedText;
