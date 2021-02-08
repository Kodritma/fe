import { Button, Form, Input } from "antd";
import { useState } from "react";
import slugify from "../../utils/slugify";
import ImageUpload from "./ImageUpload";

interface IPlaylistForm {
  addPlaylist: (args: { name: string; image: string }) => void;
}

function PlaylistForm(props: IPlaylistForm) {
  const addPlaylist = props.addPlaylist;

  const [name, setName] = useState("");
  const [image, setImage] = useState("default.jpg");

  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 15 } };
  const tailLayout = { wrapperCol: { offset: 8, span: 15 } };

  return (
    <Form {...layout}>
      <Form.Item label="Başlık">
        <Input name="name" onChange={(e) => setName(e.currentTarget.value)} />
      </Form.Item>
      <Form.Item label="Adres">
        <Input name="slug" value={slugify(name)} disabled />
      </Form.Item>
      <ImageUpload setImage={setImage} />
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          onClick={() => {
            setName("");
            addPlaylist({ name, image });
          }}
        >
          Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PlaylistForm;
