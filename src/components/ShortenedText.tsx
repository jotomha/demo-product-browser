import { Text } from "@chakra-ui/react";
interface Props {
  txt: string;
  limit: number;
  appendText?: string;
}

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
