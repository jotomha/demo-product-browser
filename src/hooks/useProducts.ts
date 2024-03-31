import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import { ProductRequest } from "../App";
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
  discountPercentage: number;
}

interface ProductResponse {
  products: ProdObj[];
  total: number;
  skip: number;
  limit: number;
}

//uses generic api
const useProducts = (request: ProductRequest) => {
  const endpoint = `/products${
    request.category ? "/category/" + request.category : ""
  }${request.search ? "/search?q=" + request.search : ""}${
    request.search ? "&" : "?"
  }limit=${request.prodPerPage}&skip=${
    (request.page - 1) * request.prodPerPage
  }`;

  const { data, error, load } = useApi<ProductResponse>(endpoint, [request]);
  const products = data ? data.products : undefined;

  return { products, error, load };
};

export default useProducts;
