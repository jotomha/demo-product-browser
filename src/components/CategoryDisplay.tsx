import { Box, HStack, List, ListItem, StackDivider } from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";
import "./CategoryDisplay.css";
import { stripText } from "../services/stripText";

interface Props {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null;
}

const CategoryDisplay = ({ onSelectCategory, selectedCategory }: Props) => {
  const { data, error, load } = useCategories();
  if (error) return null;
  return (
    <List padding="10px">
      <HStack
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing="10px"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <ListItem
          key="def"
          onClick={() => onSelectCategory("")}
          fontWeight={selectedCategory ? "" : "bold"}
          className="category"
        >
          All
        </ListItem>
        {load && (
          <ListItem key="load" fontStyle="italic">
            Loading categories...
          </ListItem>
        )}
        {!data && !load && (
          <ListItem key="err" color="red.50">
            Error loading categories.
          </ListItem>
        )}
        {data &&
          data.map((iter, ind) => (
            <ListItem
              key={ind}
              onClick={() => onSelectCategory(iter)}
              fontWeight={iter === selectedCategory ? "bold" : ""}
              display="inline"
              className="category"
            >
              {stripText(iter)}
            </ListItem>
          ))}
      </HStack>
    </List>
  );
};

export default CategoryDisplay;
