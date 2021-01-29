import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../authContext";
import axiosWithAuth from "../../utils/axiosWithAuth";
import notify from "../notify";
import InnerHeader from "./InnerHeader";

function Profile() {
  const userDetails = useContext(AuthContext);
  const { display_name, first_name, last_name, slug } = userDetails;
  const [newSlug, setNewSlug] = useState(slug);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 15 },
  };

  const onFinish = (values: any) => {
    axiosWithAuth(userDetails)
      .post("/user/update-profile", { ...values })
      .then(() => {
        notify(
          "success",
          "Başarılı!",
          "Profilinizde yaptığınız değişiklikler başarıyla kaydedilmiştir!"
        );
      })
      .catch(() => {
        notify(
          "error",
          "Başarısız!",
          "Bir hata oluştu ve profilinizdeki değişiklikler kaydedilmedi!"
        );
      });
  };

  const onFinishFailed = (errorInfo: any) => {};

  const onSlugChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewSlug(e.currentTarget.value);
  };

  const checkSlug = () => {
    if (!newSlug) {
      return Promise.reject();
    } else if (slug !== newSlug) {
      return axiosWithAuth(userDetails).post("/user/check-slug", {
        newSlug,
      });
    }
  };

  const initialValues = {
    display_name,
    first_name,
    last_name,
    slug,
  };

  return (
    <Form
      {...layout}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateTrigger="onBlur"
    >
      <InnerHeader
        icon={<UserOutlined />}
        title="Profil"
        subTitle="Profil detaylarınızı güncelleyin"
      />
      <Form.Item
        label="Görünen İsim"
        name="display_name"
        rules={[
          { required: true, message: "Görünen isim alanı boş bırakılamaz!" },
        ]}
      >
        <Input name="display_name" />
      </Form.Item>

      <Form.Item
        label="İsim"
        name="first_name"
        rules={[{ required: true, message: "İsim alanı boş bırakılamaz!" }]}
      >
        <Input name="first_name" />
      </Form.Item>

      <Form.Item
        label="Soyisim"
        name="last_name"
        rules={[{ required: true, message: "Soyisim alanı boş bırakılamaz!" }]}
      >
        <Input name="last_name" />
      </Form.Item>

      <Form.Item
        label="Profil Linki"
        name="slug"
        rules={[
          {
            required: true,
            message: "Profil linki boş bırakılamaz!",
          },
          {
            message: "Profil linki başkası tarafından kullanılmaktadır!",
            validator: checkSlug,
          },
        ]}
      >
        <Input name="slug" onChange={onSlugChange} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Profile;
