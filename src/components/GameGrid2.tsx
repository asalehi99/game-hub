import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Game } from "./hooks/useGames";

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  const [game, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(err.message));
  });

  return (
    <ul>
      {game.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  );
};

export default GameGrid;
