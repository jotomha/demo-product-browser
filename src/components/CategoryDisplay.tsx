import { HStack, List, ListItem, StackDivider } from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";
import "../styles/CategoryDisplay.css";
import { stripText } from "../services/stripText";

interface Props {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null;
}

const CategoryDisplay = ({ onSelectCategory, selectedCategory }: Props) => {
  const { data, error, load } = useCategories();
  data.sort(); // Sort alphabetically for a better display
  if (error) return <div>Failed to load categories.</div>;
  return (
    <List padding="10px" overflow="fit">
      <HStack
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        spacing="10px"
        divider={
          <StackDivider borderColor="gray.200" /> /* built in chakra list divider -- just adds a div with 
          0 width but 1 or 2 px border width as a separator between each list item */
        }
      >
        {/*Default "All" category */}
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
          </ListItem> /* Technically this should be caught in the case of error = true, but if somehow 
          error isn't true and we're still missing data after loading something went wrong. */
        )}

        {data &&
          data.map((iter, ind) => (
            <ListItem
              key={ind}
              onClick={() => onSelectCategory(iter)}
              fontWeight={
                iter === selectedCategory ? "bold" : ""
              } /* bold the selected category so that it's easy to see what you're currently looking at */
              display="inline"
              className="category"
            >
              {stripText(iter) /* see services */}
            </ListItem>
          ))}
      </HStack>
    </List>
  );
};

export default CategoryDisplay;
