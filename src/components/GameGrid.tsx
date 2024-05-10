import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Text } from "@chakra-ui/react";
import Adress from "../services/MyAdress";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  result: Game[];
}
const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const api_Key = Adress.apiKey;
    const url = Adress.endpoint;

    // apiClient
    //   .get<FetchGamesResponse>("/games")
    //   .then((res) => setGames(res.data.result))
    //   .catch((err) => setError(err.message));

    fetch(`${url}games${api_Key}`)
      .then((res) => res.json())
      .then((data) => setGames(data.results))
      .catch((err) => setError(err.message));
  });

  //   .then((data) => console.log(data.results[0].name));

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
