import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { IPlaylist, IVideo } from "../../types";
import axiosWithAuth from "../../utils/axiosWithAuth";
import slugify from "../../utils/slugify";

interface IVideoForm {
  addVideo?: (args: IVideo, resetForm: () => void) => void;
  toEdit?: IVideo;
  saveVideo?: (
    data: { name: string; image: string },
    toEdit: IVideo,
    resetForm: () => void
  ) => void;
}

const defaultVideo: IVideo = {
  ID: "",
  description: "",
  playlistID: "",
  playlist_order: 0,
  slug: "",
  title: "",
  url: "",
};

function VideoForm(props: IVideoForm) {
  const { addVideo, toEdit, saveVideo } = props;

  const [form, setForm] = useState<IVideo>(defaultVideo);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  console.log(form);

  const handleVideoForm = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });

  const resetForm = () => {
    setForm(defaultVideo);
  };

  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 15 } };
  const tailLayout = { wrapperCol: { offset: 8, span: 15 } };

  useEffect(() => {
    axiosWithAuth()
      .get("/playlists")
      .then((res) => {
        setPlaylists(res.data);
      });
  }, []);

  return (
    <Form {...layout}>
      <Form.Item label="Video URL">
        <Input name="url" value={form.url} onChange={handleVideoForm} />
      </Form.Item>
      <Form.Item label="Başlık">
        <Input name="title" value={form.title} onChange={handleVideoForm} />
      </Form.Item>
      <Form.Item label="Adres">
        <Input name="slug" value={slugify(form.title)} disabled />
      </Form.Item>
      <Form.Item label="Açıklama">
        <TextArea name="description" value={form.description} onChange={handleVideoForm} />
      </Form.Item>
      <Form.Item label="Çalma Listesi">
        <Select
          placeholder="Çalma listesi seçin"
          onChange={(playlistID: string) => setForm({ ...form, playlistID })}
        >
          {playlists.map((p) => {
            return (
              <Select.Option key={p.ID} value={p.ID}>
                {p.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Video Sırası">
        <Input
          type="number"
          name="playlist_order"
          value={form.playlist_order}
          onChange={handleVideoForm}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          onClick={() => {
            if (addVideo) {
              addVideo(form, resetForm);
            } else if (saveVideo) {
              //   saveVideo({ name, image }, toEdit as IVideo, resetForm);
            }
          }}
        >
          Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
}

export default VideoForm;
