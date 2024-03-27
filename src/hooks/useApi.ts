import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, CanceledError } from "axios";

interface Response<T> {
  count: number;
  results: T[];
}

const useApi = <T>(
  endpoint: string,
  deps?: any[],
  requestConfig?: AxiosRequestConfig
) => {
  const [load, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<T[]>([]);

  useEffect(
    () => {
      const api = axios.create({
        baseURL: "https://dummyjson.com",
      });
      const controller = new AbortController();
      setLoading(true);
      //Req data
      api
        .get<Response<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
          console.log(res.data);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, load };
};

export default useApi;
