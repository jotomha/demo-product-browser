import { HStack, Text } from "@chakra-ui/react";
import SavingBadge from "./SavingBadge";
interface Props {
  normalPrice: number;
  discountPerc?: number;
  discountPrice?: number;
  showDiscount: boolean;
  appendText?: string;
}
const DiscountedText = ({
  normalPrice,
  showDiscount,
  discountPerc,
  discountPrice,
  appendText,
}: Props) => {
  return (
    <HStack spacing="5%" alignItems="center">
      {appendText && <Text>{appendText}</Text>}
      {showDiscount && (
        <SavingBadge
          preText="%"
          number={(discountPerc
            ? Math.round(discountPerc)
            : Math.round(
                100 -
                  (discountPrice ? discountPrice : normalPrice) / normalPrice
              )
          ).toString()}
          postText=" off!"
        />
      )}
      <Text as="b">
        $
        {discountPrice
          ? discountPrice
          : Math.round(
              normalPrice -
                normalPrice * ((discountPerc ? discountPerc : 0) / 100)
            )}
      </Text>
      {showDiscount && (
        <Text as="s" fontWeight="normal" color="rgba(255, 255, 255, 0.7)">
          ${normalPrice}
        </Text>
      )}
    </HStack>
  );
};

export default DiscountedText;
