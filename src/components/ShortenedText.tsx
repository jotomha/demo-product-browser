import { Text } from "@chakra-ui/react";
interface Props {
  children: string;
  limit: number;
  appendText?: string;
}

const ShortenedText = ({ children, limit, appendText = "" }: Props) => {
  return (
    <>
      <Text>
        {children.substring(0, Math.min(children.length, limit))}
        {children.length < limit ? "" : "..."}
      </Text>
      <Text color="lightblue" opacity="50%" fontStyle="italic">
        {appendText}
      </Text>
    </>
  );
};

export default ShortenedText;
