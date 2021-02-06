import { InboxOutlined, OrderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import Dragger, { DraggerProps } from "antd/lib/upload/Dragger";
import { useEffect, useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import slugify from "../../utils/slugify";
import notify from "../componentUtils/notify";
import InnerHeader from "./InnerHeader";

interface Playlist {
  ID: string;
  name: string;
  slug: string;
}

function Playlist() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  console.log({ playlists });
  const [name, setName] = useState("");
  const [image, setImage] = useState("default.jpg");
  const [showForm, setShowForm] = useState(false);
  console.log({ name });

  const columns = [
    {
      title: "Öngörüntü",
      dataIndex: "image",
      width: 110,
      render: (text: string) => (
        <img src={process.env.REACT_APP_BACKEND + "/uploads/" + text} width="100" />
      ),
    },
    {
      title: "İsim",
      dataIndex: "name",
      className: "vertical-center",
    },
    {
      title: "",
      key: "actions",
      className: "vertical-center",
      width: 100,
      render: () => {
        return (
          <>
            <Button type="primary">Düzenle</Button>
          </>
        );
      },
    },
  ];

  const addPlaylist = () => {
    axiosWithAuth()
      .post("/playlists", { name, image })
      .then((res) => {
        setPlaylists([...playlists, res.data]);
        setName("");
        setShowForm(false);
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

  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 15 } };
  const tailLayout = { wrapperCol: { offset: 8, span: 15 } };

  const props: DraggerProps = {
    name: "file",
    multiple: false,
    withCredentials: true,
    action: process.env.REACT_APP_BACKEND + "/upload",
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        setImage(info.file.response);
        notify({
          type: "success",
          message: "Yükleme başarılı!",
          description: "Dosya başarıyla yüklendi",
        });
      } else if (status === "error") {
        notify({
          type: "error",
          message: "Yükleme başarısız!",
          description: "Dosya yükleme başarısız oldu",
        });
      }
    },
    onRemove: (file) => {
      setImage("");
      axiosWithAuth().delete("/upload/" + file.response);
    },
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
      <Form {...layout}>
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
              Çalma Listesi Ekle
            </Button>,
          ]}
        />
        {showForm && (
          <>
            <Form.Item label="Başlık">
              <Input name="name" onChange={(e) => setName(e.currentTarget.value)} />
            </Form.Item>
            <Form.Item label="Adres">
              <Input name="slug" value={slugify(name)} disabled />
            </Form.Item>
            <Form.Item label="Öngörüntü">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Resim seçin ya da sürükleyip bırakın</p>
                <p className="ant-upload-hint">
                  Aynı anda tek bir resim yükleyebilirsiniz. Seçtiğiniz resim anlık olarak
                  yüklenecektir.
                </p>
              </Dragger>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={addPlaylist}>
                Kaydet
              </Button>
            </Form.Item>
          </>
        )}
        <div style={{ padding: "0 50px" }}>
          <Table columns={columns} dataSource={playlists.map((p, i) => ({ ...p, key: i }))} />
        </div>
      </Form>
    </>
  );
}

export default Playlist;
