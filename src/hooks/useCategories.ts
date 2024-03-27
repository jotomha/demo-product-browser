import useApi from "./useApi";
import { ProdObj } from "./useProducts";

// When not supplied a "category" string, requests all categories
// When supplied a string, returns a list of products under that category
const useCategories = (category?: string) => {
  if (category) {
    return useApi<ProdObj>(`/products/category/${category}`);
  }
  return useApi<string>(`/products/categories`);
};

export default useCategories;
