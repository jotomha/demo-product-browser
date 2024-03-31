import { Box } from "@chakra-ui/react";
import "../styles/StarRating.css";
interface Props {
  rating: number;
}

//Renders number of stars given by rating, to the nearest whole number. Uses css polygon
//and gradient. I really wanted to provide a variable to the css to change the total fill
//percentage on the gradient but no matter how much I searched I couldn't find a way to do
//it correctly (i tried some things I found online but nothing worked.)
const StarRating = ({ rating }: Props) => {
  return (
    <Box width="auto" flexDir="row" alignItems="center">
      {Array.from({ length: Math.round(rating) }, (_item, index) => (
        <Box className="star" key={index} />
      ))}
      <Box display="inline-block" marginLeft="5px">
        {rating}
      </Box>
    </Box>
  );
};

export default StarRating;
