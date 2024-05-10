import { Text } from "@chakra-ui/react";
import useGames from "./hooks/useGames";

const GameGrid = () => {
  //   .then((data) => console.log(data.results[0].name));
  const { games, error } = useGames();

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
