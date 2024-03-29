import { Badge } from "@chakra-ui/react";

interface Props {
  preText: string;
  number: string;
  postText: string;
}

const SavingBadge = ({ preText, number, postText }: Props) => {
  return (
    <Badge color="white" bgColor="#F88379" borderRadius="5px">
      {preText}
      {number}
      {postText}
    </Badge>
  );
};

export default SavingBadge;
