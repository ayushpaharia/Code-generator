import { get } from "lodash";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo from "../../lib/withApollo";
import { useCharacterQuery } from "../../generated";
import Image from "next/image";

function SingleCharacterPage({ query }) {
  const characterId = get(query, "id");

  const { data, loading } = useCharacterQuery({
    variables: {
      id: characterId,
    },
  });
  if (loading) return <div>loading...</div>;
  const {
    name,
    species,
    image,
    origin: { dimension },
  } = data.character;
  console.log(data.character);

  return (
    <div>
      <Image alt={name} src={image} width="100px" height="100px" />
      <h3>
        {species} {name} from {dimension != null ? dimension : "Unknown"}
      </h3>
    </div>
  );
}

export default withApollo(SingleCharacterPage, { getDataFromTree });
