import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { IPlaylist } from "../../types";
import axiosWithAuth from "../../utils/axiosWithAuth";

function Playlists() {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  let { url } = useRouteMatch();

  const fetchPlaylists = () => {
    axiosWithAuth()
      .get<IPlaylist[]>("/playlists")
      .then((res) => {
        setPlaylists(res.data.filter((p) => !p.is_archived));
      });
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <Row gutter={[24, 24]}>
      {playlists.map(({ ID, name, slug, image }) => {
        return (
          <Col xs={24} sm={12} md={8} lg={6} xxl={4} key={ID}>
            <Link to={`${url}/${slug}`}>
              <Card
                hoverable
                bordered={false}
                cover={<img alt={name} src={process.env.REACT_APP_BACKEND + "/uploads/" + image} />}
              >
                <Meta title={name} />
              </Card>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}

export default Playlists;
