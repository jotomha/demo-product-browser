import { Box, Button } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import { stringToNumber } from "../services/stringToNumber";

interface Props {
  onLeft: () => void;
  onRight: () => void;
  onChangePerPage: (inp: number) => void;
  page: number;
  perPage: number;
}

const PageSelector = ({
  onLeft,
  onRight,
  onChangePerPage,
  page,
  perPage,
}: Props) => {
  return (
    <Box>
      <Box display="inline-flex" alignItems="center">
        <Button onClick={onLeft}>Left</Button>
        <Box
          display="inline"
          marginLeft="5px"
          marginRight="5px"
          fontWeight="bold"
          textAlign="center"
        >
          {page}
        </Box>
        <Button onClick={onRight} marginRight="10px">
          Right
        </Button>
      </Box>
      <Box display={{ base: "none", md: "inline" }}>
        <SearchBar
          onSearch={(search) => onChangePerPage(stringToNumber(search, 16))}
          placeholder={
            perPage.toString() + ` product${perPage === 1 ? "" : "s"} per page`
          }
          width="200px"
        />
      </Box>
    </Box>
  );
};

export default PageSelector;
