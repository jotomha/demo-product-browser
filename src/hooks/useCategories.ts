import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";

// requests all categories from API
const useCategories = () => {
  const [load, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://dummyjson.com",
    });
    const controller = new AbortController();
    setLoading(true);
    //Req data
    api
      .get<string[]>("/products/categories", {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, error, load };
};

export default useCategories;
