import { Content } from "antd/lib/layout/layout";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Videos from "../videoTutorials/Videos";
import Playlists from "./Playlists";

function VideoTutorials() {
  let { path } = useRouteMatch();

  return (
    <Content className="playlists">
      <Switch>
        <Route exact path={`${path}`} component={Playlists} />
        <Route path={`${path}/:playlist`} component={Videos} />
      </Switch>
    </Content>
  );
}

export default VideoTutorials;
