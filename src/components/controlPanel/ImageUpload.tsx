import { InboxOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Dragger, { DraggerProps } from "antd/lib/upload/Dragger";
import axiosWithAuth from "../../utils/axiosWithAuth";
import notify from "../componentUtils/notify";

interface IImageUpload {
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

function ImageUpload(props: IImageUpload) {
  const { setImage } = props;

  const draggerProps: DraggerProps = {
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

  return (
    <Form.Item label="Öngörüntü">
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Resim seçin ya da sürükleyip bırakın</p>
        <p className="ant-upload-hint">Genişlik 276 px, yükseklik 155 px olmalıdır.</p>
      </Dragger>
    </Form.Item>
  );
}

export default ImageUpload;
