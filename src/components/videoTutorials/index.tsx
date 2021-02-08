import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IPlaylist } from "../../types";
import axiosWithAuth from "../../utils/axiosWithAuth";

function VideoTutorials() {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

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
    <Content className="playlists">
      <Row gutter={[24, 24]}>
        {playlists.map(({ ID, name, slug, image }) => {
          return (
            <Col xs={24} sm={12} md={8} lg={6} xxl={4} key={ID}>
              <Link to={`/videolu-dersler/${slug}`}>
                <Card
                  hoverable
                  bordered={false}
                  cover={
                    <img alt={name} src={process.env.REACT_APP_BACKEND + "/uploads/" + image} />
                  }
                >
                  <Meta title={name} />
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Content>
  );
}

export default VideoTutorials;
