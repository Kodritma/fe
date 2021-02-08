import { OrderedListOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { IPlaylist } from "../../types";
import axiosWithAuth from "../../utils/axiosWithAuth";
import notify from "../componentUtils/notify";
import InnerHeader from "./InnerHeader";
import PlaylistForm from "./PlaylistForm";

function Playlist() {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [showForm, setShowForm] = useState(false);

  const archivePlaylist = (bool: boolean, id: string) => {
    axiosWithAuth()
      .put("/playlists/archive/" + id, { bool })
      .then((res) => {
        const { ID } = res.data;
        setPlaylists((playlists) =>
          playlists.map((p) => {
            if (p.ID === ID) return res.data;
            return p;
          })
        );
        notify({
          type: "success",
          message: "Başarılı!",
          description: "Çalma listesi başarıyla arşive eklendi.",
        });
      })
      .catch(() => {
        notify({
          type: "error",
          message: "Başarısız!",
          description: "Çalma listesi arşive eklenirken hata oluştu.",
        });
      });
  };

  const columns = [
    {
      title: "Öngörüntü",
      dataIndex: "image",
      width: 110,
      render: (text: string) => (
        <img alt={text} src={process.env.REACT_APP_BACKEND + "/uploads/" + text} width="100" />
      ),
    },
    {
      title: "Başlık",
      dataIndex: "name",
      className: "vertical-center",
    },
    {
      title: "",
      key: "actions",
      className: "vertical-center",
      width: 100,
      render: (p: IPlaylist) => {
        return (
          <div style={{ display: "flex" }}>
            <Button type="primary" ghost style={{ marginRight: 10 }}>
              Düzenle
            </Button>
            <Popconfirm
              placement="top"
              title={p.is_archived ? "Arşivden Çıkar?" : "Arşivle?"}
              onConfirm={() => archivePlaylist(!p.is_archived, p.ID)}
              okText="Evet"
              cancelText="Hayır"
            >
              <Button>{p.is_archived ? "Arşivden Çıkar" : "Arşivle"}</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const addPlaylist = ({ name, image }: { name: string; image: string }) => {
    axiosWithAuth()
      .post("/playlists", { name, image })
      .then((res) => {
        setPlaylists((playlists) => [...playlists, res.data]);
        setShowForm(false);
        notify({
          type: "success",
          message: "Başarılı!",
          description: "Yeni çalma listesi eklendi!",
        });
      })
      .catch((err) => {
        console.log({ err });
        err.response.status === 409 &&
          notify({
            type: "error",
            message: "Başarısız!",
            description: "Bu isimle (slug) bir çalma listesi zaten mevcut!",
          });
      });
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/playlists")
      .then((res) => {
        setPlaylists(res.data);
      });
  }, []);

  return (
    <>
      <InnerHeader
        icon={<OrderedListOutlined />}
        title="Çalma Listeleri"
        subTitle="Çalma listelerini yönetin"
        extra={[
          <Button
            key="add"
            type="primary"
            onClick={() => setShowForm(!showForm)}
            style={{ marginBottom: 20 }}
          >
            {showForm ? "İptal" : "Çalma Listesi Ekle"}
          </Button>,
        ]}
      />
      {showForm && <PlaylistForm addPlaylist={addPlaylist} />}
      <div style={{ padding: "0 50px" }}>
        <Table columns={columns} dataSource={playlists.map((p, i) => ({ ...p, key: i }))} />
      </div>
    </>
  );
}

export default Playlist;
