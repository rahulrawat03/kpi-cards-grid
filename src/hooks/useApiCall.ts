import { useEffect, useState } from "react";
import { HttpMethod } from "./types";

interface useApiCallParams {
  url: string;
  method: HttpMethod;
  body?: object;
}

export function useApiCall<T>({ url, method, body }: useApiCallParams) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(url, {
      method: method,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  return { loading, error, data };
}
