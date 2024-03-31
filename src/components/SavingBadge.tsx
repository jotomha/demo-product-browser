import { Badge } from "@chakra-ui/react";

interface Props {
  preText: string;
  number: string;
  postText: string;
}

// Renders a chakra badge (which automatically capitalizes everything, and has a pretty perfect size).
// Can provide additional text parameters alongside the number to render.
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
