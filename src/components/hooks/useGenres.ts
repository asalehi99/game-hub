import { useEffect, useState } from "react";
import useGames from "./useGames";
import Adress from "../../services/MyAdress";
import { CanceledError } from "axios";

interface Genre{
    id: number;
    name: string;

}

interface FetchGenresResponse {
    count: number;
    results: Genre[];

}

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading ] = useState(false);

  
    useEffect(() => {

      setLoading(true);
      const conroller = new AbortController();
      const api_Key = Adress.apiKey;
      const url = Adress.endpoint;
  
      // apiClient
      //   .get<FetchGamesResponse>("/games")
      //   .then((res) => setGames(res.data.result))
      //   .catch((err) => setError(err.message));
  
      fetch(`${url}genres${api_Key}`/*, {signal: conroller.signal}*/)
        .then((res) => res.json())
        .then((data) => {
          setGenres(data.results);
          setLoading(false);
        })
        .catch((err) => {
            if(err instanceof CanceledError) return;
            setError(err.message)
            setLoading(false);
          });

      return () => conroller.abort();
    }, []);

    return {genres, error, isLoading };
};

export default useGenres