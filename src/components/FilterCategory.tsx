import {
  Button,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";

interface Props {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null;
}

const FilterCategory = ({ onSelectCategory, selectedCategory }: Props) => {
  const { data, error, load } = useCategories();
  if (error) return null;
  return (
    <>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button}>
              {selectedCategory ? selectedCategory : "Categories"}
            </MenuButton>
            <MenuList>
              {selectedCategory && (
                <MenuItem key="def" onClick={() => onSelectCategory("")}>
                  All
                </MenuItem>
              )}
              {load && (
                <MenuItem key="load" fontStyle="italic">
                  Loading categories.
                </MenuItem>
              )}
              {!data && !load && (
                <MenuItem key="err" color="red.50">
                  Error loading categories.
                </MenuItem>
              )}
              {data &&
                data.map((iter, ind) => (
                  <MenuItem
                    key={ind}
                    onClick={() => onSelectCategory(iter)}
                    fontWeight={iter === selectedCategory ? "bold" : ""}
                  >
                    {iter}
                  </MenuItem>
                ))}
            </MenuList>
          </>
        )}
      </Menu>
    </>
  );
};

export default FilterCategory;
