import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";

interface Playlist {
  ID: string;
  name: string;
  slug: string;
  image: string;
}
function VideoTutorials() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylists = () => {
    axiosWithAuth()
      .get<Playlist[]>("/playlists")
      .then((res) => {
        setPlaylists(res.data);
      });
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <Content className="playlists">
      <Row gutter={[16, 16]}>
        {playlists.map(({ ID, name, slug, image }) => {
          return (
            <Col xs={24} md={8} lg={6} key={ID}>
              <Card
                hoverable
                bordered={false}
                cover={<img src={process.env.REACT_APP_BACKEND + "/uploads/" + image} />}
              >
                <Meta title={<Link to={`/videolu-dersler/${slug}`}>{name}</Link>} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </Content>
  );
}

export default VideoTutorials;
