import { useParams, useRouteMatch } from "react-router";

function Videos() {
  const routeMatch = useRouteMatch();
  const { playlist } = useParams<{ playlist: string }>();

  console.log({ routeMatch, playlist });
  return <div>Videos videos</div>;
}

export default Videos;
