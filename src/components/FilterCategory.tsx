import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";

interface Props {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null;
}

/* This was a first iteration category filter I originally implemented. I initially had a "filters" 
category on the left side of the screen, and was going to provide support through this component to 
allow for different types of filters (which you could easily add by just passing some new hook through
the props, instead of useCategories always). I quickly realized the API provided no other filtering options,
and although I could realisitically provide support for filtering by things like rating or price, that would 
involve iterating through the product list each time you requested a new list, sorting that, and passing that 
to the product display. While that may not be a problem for such small product lists as this (I think total 
  there are around 100 products) with greater numbers of products iterating throguh a list directly on the 
  clients browser and not on the server would drastically reduce render time, I feel. 

  That said I've never done anything with servers / client side filtering, so maybe I'm wrong! */
const FilterCategory = ({ onSelectCategory, selectedCategory }: Props) => {
  const { data, error, load } = useCategories();
  if (error) return null;
  return (
    <>
      <Menu preventOverflow={false}>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button}>
              {selectedCategory ? selectedCategory : "Categories"}
            </MenuButton>
            <MenuList overflow="auto" height="50vh">
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
