import { Box } from "@chakra-ui/react";
import "./StarRating.css";
interface Props {
  rating: number;
}

const StarRating = ({ rating }: Props) => {
  return (
    <Box width="auto" flexDir="row" alignItems="center">
      {Array.from({ length: rating }, (_item, index) => (
        <Box className="star" key={index} />
      ))}
      <Box display="inline-block" marginLeft="5px">
        {rating}
      </Box>
    </Box>
  );
};

export default StarRating;
