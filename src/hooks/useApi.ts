import { useEffect, useState } from "react";
import axios from "axios";

// requests a generic object from api with endpoint
const useApi = <T>(endpoint: string, dependencies: any[]) => {
  const [load, setLoading] = useState(false); // these are states so that anytime something changes (like loading) the component using the data will re-render
  const [error, setError] = useState("");
  const [data, setData] = useState<T>();

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://dummyjson.com",
    });
    const controller = new AbortController();
    setLoading(true);
    //Req data with axios
    api
      .get<T>(endpoint, {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); //cleanup
  }, [...dependencies]); // refresh data anytime dependencies change

  return { data, error, load };
};

export default useApi;
