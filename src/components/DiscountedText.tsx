import { Stack, Text } from "@chakra-ui/react";
import SavingBadge from "./SavingBadge";
interface Props {
  normalPrice: number;
  discountPerc?: number;
  discountPrice?: number;
  showDiscount: boolean;
  appendText?: string;
}

/* Renders a "discounted price" textbox. When showDiscount is true, also renders a crossed out original price along 
with a red badge showing percentage savings. Can also prepend text via the appendText parameter, if provided */
const DiscountedText = ({
  normalPrice,
  showDiscount,
  discountPerc,
  discountPrice,
  appendText,
}: Props) => {
  return (
    <Stack
      flexDir={{ base: "column-reverse", md: "row" }}
      spacing="5%"
      alignItems="center"
    >
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
          ).toString()} /* Since discount percentage & discount price are optional, must check which one we were provided. This badge 
          shows the percent off, so if we only have discount price, we must calculate the percentage. This is necessary because the products 
          in GET request [products] only have a discount percentage, but the cart returned by POST request only has discount price. */
          postText=" off!"
        />
      )}
      <Stack flexDir="row" spacing="0.45rem">
        <Text as="b">
          $
          {
            discountPrice
              ? discountPrice
              : Math.round(
                  normalPrice -
                    normalPrice * ((discountPerc ? discountPerc : 0) / 100)
                ) /* inverse of above.*/
          }
        </Text>
        {showDiscount && (
          <Text as="s" fontWeight="normal" color="rgba(255, 255, 255, 0.7)">
            ${normalPrice}
          </Text>
        )}
      </Stack>
    </Stack>
  );
};

export default DiscountedText;
