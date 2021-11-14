import { Button, Form, Input } from "antd";
import { useState } from "react";
import { IPlaylist } from "../../types";
import slugify from "../../utils/slugify";
import ImageUpload from "./ImageUpload";

interface IPlaylistForm {
  addPlaylist?: (args: { name: string; image: string }, resetForm: () => void) => void;
  toEdit?: IPlaylist;
  savePlaylist?: (
    data: { name: string; image: string },
    toEdit: IPlaylist,
    resetForm: () => void
  ) => void;
}

function PlaylistForm(props: IPlaylistForm) {
  const { addPlaylist, toEdit, savePlaylist } = props;

  const [name, setName] = useState(toEdit?.name || "");
  const [image, setImage] = useState(toEdit?.image || "default.jpg");

  const resetForm = () => {
    setName("");
    setImage("");
  };

  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 15 } };
  const tailLayout = { wrapperCol: { offset: 8, span: 15 } };

  return (
    <Form {...layout}>
      <Form.Item label="Başlık">
        <Input name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
      </Form.Item>
      <Form.Item label="Adres">
        <Input name="slug" value={slugify(name)} disabled />
      </Form.Item>
      <ImageUpload setImage={setImage} currentImage={image} />
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          onClick={() => {
            if (addPlaylist) {
              addPlaylist({ name, image }, resetForm);
            } else if (savePlaylist) {
              savePlaylist({ name, image }, toEdit as IPlaylist, resetForm);
            }
          }}
        >
          Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PlaylistForm;
