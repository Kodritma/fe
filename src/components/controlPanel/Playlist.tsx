import { OrderedListOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { IPlaylist } from "../../types";
import axiosWithAuth from "../../utils/axiosWithAuth";
import notify from "../componentUtils/notify";
import InnerHeader from "./InnerHeader";
import PlaylistForm from "./PlaylistForm";
import PlaylistItemArchiveButton from "./PlaylistItemArchiveButton";
import PlaylistItemEditButton from "./PlaylistItemEditButton";

function Playlist() {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [toEditID, setToEditID] = useState<string>("");

  console.log({ toEditID });
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

  const addPlaylist = ({ name, image }: { name: string; image: string }, resetForm: () => void) => {
    axiosWithAuth()
      .post("/playlists", { name, image })
      .then((res) => {
        setPlaylists((playlists) => [...playlists, res.data]);
        setShowForm(false);
        resetForm();
        notify({
          type: "success",
          message: "Başarılı!",
          description: "Yeni çalma listesi eklendi!",
        });
      })
      .catch((err) => {
        err.response.status === 409 &&
          notify({
            type: "error",
            message: "Başarısız!",
            description: "Bu isimle (slug) bir çalma listesi zaten mevcut!",
          });
      });
  };

  const savePlaylist = (
    data: { name: string; image: string },
    toEdit: IPlaylist,
    resetForm: () => void
  ) => {
    axiosWithAuth()
      .put("/playlists/" + toEdit.ID, data)
      .then((response) => {
        setToEditID("");
        resetForm();
        setPlaylists((playlists) => {
          return playlists.map((p) => {
            return p.ID === response.data.ID ? response.data : p;
          });
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
      {toEditID && (
        <PlaylistForm
          savePlaylist={savePlaylist}
          toEdit={playlists.filter((p) => p.ID === toEditID)[0]}
        />
      )}
      <div style={{ padding: "0 50px" }}>
        <Table dataSource={playlists.map((p, i) => ({ ...p, key: i }))}>
          <Table.Column<IPlaylist>
            title="Öngörüntü"
            dataIndex="image"
            width={110}
            render={(text: string) => (
              <img
                alt={text}
                src={process.env.REACT_APP_BACKEND + "/uploads/" + text}
                width="100"
              />
            )}
          />
          <Table.Column<IPlaylist> title="Başlık" dataIndex="name" className="vertical-center" />
          <Table.Column<IPlaylist>
            title=""
            key="actions"
            className="vertical-center"
            width={100}
            render={(p: IPlaylist) => {
              return (
                <div style={{ display: "flex" }}>
                  <PlaylistItemEditButton setID={setToEditID} playlist={p} ID={toEditID} />
                  <PlaylistItemArchiveButton playlist={p} archive={archivePlaylist} />
                </div>
              );
            }}
          />
        </Table>
      </div>
    </>
  );
}

export default Playlist;
