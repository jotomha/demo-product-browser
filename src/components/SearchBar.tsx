import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import "../styles/SearchBar.css";

interface Props {
  onSearch: (searchText: string) => void;
  placeholder: string;
  width?: string;
}

//Search bar, used for quick add on product browser, searching for products, and changing number of products per page.
//My one regret here is that I really would have liked to pass a boolean parameter that when true, the form submits as you
//unfocus the search bar. It's not good design, in my opinion, to have to press enter every time you want to change the
//number of products you are quick adding.
const SearchBar = ({ onSearch, placeholder, width = "auto" }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup display="inline">
        <Input // Built in chakra input group
          ref={ref}
          placeholder={placeholder}
          display="inline"
          width={width}
          borderColor="black"
          padding="5px"
        />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
