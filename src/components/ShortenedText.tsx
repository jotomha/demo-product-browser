import { Text } from "@chakra-ui/react";
interface Props {
  tex: string;
  limit: number;
  appendText?: string;
}

const ShortenedText = ({ tex, limit, appendText = "" }: Props) => {
  return (
    <>
      <Text>
        {tex.substring(0, Math.min(tex.length, limit))}
        {tex.length < limit ? "" : "..."}
      </Text>
      <Text color="lightblue" opacity="50%" fontStyle="italic">
        {appendText}
      </Text>
    </>
  );
};

export default ShortenedText;
