import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import "./SearchBar.css";

interface Props {
  onSearch: (searchText: string) => void;
  placeholder: string;
  width?: string;
}

const SearchBar = ({ onSearch, placeholder, width = "100px" }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup display="inline">
        <Input
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
