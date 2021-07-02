import { getDataFromTree } from "@apollo/client/react/ssr";
import Image from "next/image";
import withApollo from "../lib/withApollo";
import { useCharactersQuery } from "../generated";

const Home = () => {
  const { data, loading } = useCharactersQuery();

  if (loading) return <div>loading...</div>;

  return (
    <div>
      {data.characters.results.map((character) => (
        <div key={character.id}>
          <Image
            src={character.image}
            alt={character.name}
            width="100px"
            height="100px"
          />{" "}
          {character.name}
        </div>
      ))}
    </div>
  );
};

export default withApollo(Home, { getDataFromTree });
