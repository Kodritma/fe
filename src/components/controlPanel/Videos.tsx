import { VideoCameraOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { IVideo } from "../../types";
import axiosWithAuth from "../../utils/axiosWithAuth";
import InnerHeader from "./InnerHeader";
import VideoForm from "./VideoForm";

const getThumb = (url: string) =>
  "https://img.youtube.com/vi/" + url.split("?v=").pop() + "/mqdefault.jpg";

function Videos() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [showForm, setShowForm] = useState(false);

  const addVideo = (args: IVideo, resetForm: () => void) => {
    axiosWithAuth()
      .post("/videos", args)
      .then((res) => {
        setShowForm(false);
        resetForm();
        setVideos([...videos, res.data]);
      });
  };

  console.log({ videos });
  useEffect(() => {
    axiosWithAuth()
      .get("/videos")
      .then((res) => {
        setVideos(res.data);
      });
  }, []);

  return (
    <>
      <InnerHeader
        icon={<VideoCameraOutlined />}
        title="Videolar"
        subTitle="Videoları yönetin"
        extra={[
          <Button
            key="add"
            type="primary"
            onClick={() => setShowForm(!showForm)}
            style={{ marginBottom: 20 }}
          >
            {showForm ? "İptal" : "Video Ekle"}
          </Button>,
        ]}
      />
      {showForm && <VideoForm addVideo={addVideo} />}
      <div style={{ padding: "0 50px" }}>
        <Table dataSource={videos.map((v, i) => ({ ...v, key: i }))}>
          <Table.Column<IVideo>
            title="Öngörüntü"
            dataIndex="image"
            width={110}
            render={(_, video) => <img alt={video.title} src={getThumb(video.url)} width="100" />}
          />
          <Table.Column<IVideo> title="Başlık" dataIndex="title" className="vertical-center" />
          <Table.Column<IVideo>
            title="Çalma Listesi"
            dataIndex="playlist_name"
            className="vertical-center"
          />
          <Table.Column<IVideo>
            title=""
            key="actions"
            className="vertical-center"
            width={100}
            //   render={(p: IVideo) => {
            //     return (
            //       <div style={{ display: "flex" }}>
            //         <PlaylistItemEditButton setID={setToEditID} playlist={p} ID={toEditID} />
            //       </div>
            //     );
            //   }}
          />
        </Table>
      </div>
    </>
  );
}

export default Videos;
