import { useEffect, useState } from "react";
import axios, { CanceledError } from "axios";

// requests a generic object from api with endpoint
const useApi = <T>(endpoint: string, dependencies: any[]) => {
  const [load, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T>();

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://dummyjson.com",
    });
    const controller = new AbortController();
    setLoading(true);
    //Req data
    api
      .get<T>(endpoint, {
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
  }, [...dependencies]);

  return { data, error, load };
};

export default useApi;
