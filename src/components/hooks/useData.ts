import { useEffect, useState } from "react";
import useGames from "./useGames";
import Adress from "../../services/MyAdress";
import { AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../../services/api-client";

 

interface FetchResponse<T> {
    count: number;
    results: T[];

}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading ] = useState(false);

  
    useEffect(() => {

      setLoading(true);
      const conroller = new AbortController();
      const api_Key = Adress.apiKey;
      const url = Adress.endpoint;
  
      apiClient
        .get<FetchResponse<T>>(endpoint, {signal: conroller.signal, ...requestConfig})
        .then((res) => {setData(res.data.results)
          setLoading(false);
        })
        .catch((err) =>{ 
          if (err instanceof CanceledError) return;
          setError(err.message)
          setLoading(false);
        });
  
      // fetch(`${url}${endpoint}${api_Key}`/*, {signal: conroller.signal}*/)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setData(data.results);
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //       if(err instanceof CanceledError) return;
      //       setError(err.message)
      //       setLoading(false);
      //     });

      return () => conroller.abort();
    }, deps?[...deps]:[]);

    return {data, error, isLoading };
};

export default useData