import useApi from "./useApi";

export interface ProdObj {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

//
const useProducts = (pageNumber: number, perPage: number, search?: string) => {
  return useApi<ProdObj>(
    `/products
    ${search ? "/search?q=" + search : ""}
    ?limit=${perPage}
    &skip=${(pageNumber - 1) * perPage}
  `,
    [perPage, pageNumber]
  );
};

export default useProducts;
