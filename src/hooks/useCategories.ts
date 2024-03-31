import useApi from "./useApi";

// requests a string array of categories from the api. empty dependencies array since this is independent of category choice,
// should always request all cats.
const useCategories = () => {
  return useApi<string[]>("/products/categories", []);
};

export default useCategories;
