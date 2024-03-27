import { Box, Button } from "@chakra-ui/react";
import SearchBar from "./SearchBar";

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
    <>
      <Button onClick={onLeft}>Left</Button>
      <Box
        display="inline"
        marginLeft="10px"
        marginRight="10px"
        fontWeight={"bold"}
      >
        Page {page}
      </Box>
      <Button onClick={onRight} marginRight="10px">
        Right
      </Button>
      <SearchBar
        onSearch={(search) => {
          if (!isNaN(parseInt(search))) {
            onChangePerPage(parseInt(search));
          } else onChangePerPage(16);
        }}
        placeholder={
          perPage.toString() + ` product${perPage === 1 ? "" : "s"} per page`
        }
        width="200px"
      />
    </>
  );
};

export default PageSelector;
