import { Text } from "@chakra-ui/react";
interface Props {
  text: string;
  limit: number;
  appendText?: string;
}

const ShortenedText = ({ text, limit, appendText = "" }: Props) => {
  if (text.length < limit)
    return (
      <>
        <Text>{text}</Text>
        <Text fontWeight="bold" fontStyle="italic">
          {appendText}
        </Text>
      </>
    );
  else {
    return (
      <>
        <Text>{text.substring(0, limit)}...</Text>
        <Text fontWeight="bold" fontStyle="italic">
          {appendText}
        </Text>
      </>
    );
  }
};

export default ShortenedText;
