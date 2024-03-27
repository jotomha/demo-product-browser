import useApi from "./useApi";

// requests all categories from API
const useCategories = () => {
  return useApi<string>(`/products/categories`);
};

export default useCategories;
