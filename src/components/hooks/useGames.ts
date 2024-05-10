import { useEffect, useState } from "react";
import Adress from "../../services/MyAdress";
import { CanceledError } from "axios";

export interface Game {
    id: number;
    name: string;
    background_image: string;
  }
  
  interface FetchGamesResponse {
    count: number;
    result: Game[];
  }

const useGames = () => {
    
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
  
    useEffect(() => {

      const conroller = new AbortController();
      const api_Key = Adress.apiKey;
      const url = Adress.endpoint;
  
      // apiClient
      //   .get<FetchGamesResponse>("/games")
      //   .then((res) => setGames(res.data.result))
      //   .catch((err) => setError(err.message));
  
      fetch(`${url}games${api_Key}`/*, {signal: conroller.signal}*/)
        .then((res) => res.json())
        .then((data) => setGames(data.results))
        .catch((err) => {
            if(err instanceof CanceledError) return;
            setError(err.message)});

      return () => conroller.abort();
    }, []);

    return {games, error};

}

export default useGames;