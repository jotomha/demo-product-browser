import { Text } from "@chakra-ui/react";
interface Props {
  txt: string;
  limit: number;
  appendText?: string;
}

// Does what the component is called. Limits a chunk of text to the number of characters designated by limit.
// If provided, appends text on the line after the main text in a lighter color.
const ShortenedText = ({ txt, limit, appendText = "" }: Props) => {
  return (
    <>
      <Text>
        {txt.substring(0, Math.min(txt.length, limit))}
        {txt.length < limit ? "" : "..."}
      </Text>
      <Text color="lightblue" opacity="50%" fontStyle="italic">
        {appendText}
      </Text>
    </>
  );
};

export default ShortenedText;
