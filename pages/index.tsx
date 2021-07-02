import { getDataFromTree } from "@apollo/client/react/ssr";
import Image from "next/image";
import withApollo from "../lib/withApollo";
import { CharactersQuery, useCharactersQuery } from "../generated";
import { get } from "lodash";
import Link from "next/link";
const Home = () => {
  const { data, loading } = useCharactersQuery();

  const characters = get(
    data,
    "characters.results",
    []
  ) as CharactersQuery["characters"]["results"];

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
          <Link href="/characters/[id]" as={`/characters/${character.id}`}>
            {character.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default withApollo(Home, { getDataFromTree });
