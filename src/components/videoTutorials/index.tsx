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
  is_archived: boolean;
}
function VideoTutorials() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylists = () => {
    axiosWithAuth()
      .get<Playlist[]>("/playlists")
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
              <Card
                hoverable
                bordered={false}
                cover={<img alt={name} src={process.env.REACT_APP_BACKEND + "/uploads/" + image} />}
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
