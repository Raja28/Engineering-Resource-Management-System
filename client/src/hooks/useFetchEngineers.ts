import { useCallback, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function useFetchEngineers() {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setData(null);

      const resp = await axios.get(`${BASE_URL}/api/manager/engineersList`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (resp?.data?.success) {
        setData(resp.data.engineers);
      } else {
        setError(resp.data.message || "Unknown error");
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, fetchData };
}
