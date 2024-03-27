import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";
import { ProductRequest } from "../App";

interface ProdObj {
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

interface ProductResponse {
  products: ProdObj[];
  total: number;
  skip: number;
  limit: number;
}

//
const useProducts = (request: ProductRequest) => {
  const endpoint = `/products${
    request.category ? "/category/" + request.category : ""
  }${request.search ? "/search?q=" + request.search : ""}?limit=${
    request.prodPerPage
  }&skip=${(request.page - 1) * request.prodPerPage}`;

  const [load, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ProdObj[]>([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://dummyjson.com",
    });
    const controller = new AbortController();
    setLoading(true);
    //Req data
    api
      .get<ProductResponse>(endpoint, {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [request]);

  return { data, error, load };
};

export default useProducts;
