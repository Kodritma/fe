// Global imports
import { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";

// Local imports
import { AuthContext } from "../../authContext";
import axiosWithAuth from "../../utils/axiosWithAuth";
import notify from "../componentUtils/notify";

// Components
import InnerHeader from "./InnerHeader";

interface FormValues {
  display_name: string;
  first_name: string;
  last_name: string;
  slug: string;
}

function Profile() {
  const userDetails = useContext(AuthContext);
  const { display_name, first_name, last_name, slug, check } = userDetails;
  const defaultForm = { display_name, first_name, last_name, slug };

  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormValues>(defaultForm);
  const [changed, setChanged] = useState<boolean>(false);

  const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setForm({ ...form, [name]: value });

    // Check all values first
    let isChanged: boolean = false;

    Object.entries(form).forEach(([key, activeValue]) => {
      const checkValue = key === name ? value : activeValue;
      const stateValue = userDetails[key as keyof FormValues];

      if (key !== name && stateValue !== checkValue) {
        isChanged = true;
      }
    });

    setChanged(isChanged);

    // Check the most recently changed value
    if (userDetails[name as keyof FormValues] !== value) {
      setChanged(true);
    }
  };

  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 15 } };
  const tailLayout = { wrapperCol: { offset: 8, span: 15 } };

  const onFinish = async (values: any) => {
    if (changed) {
      setLoading(true);
      try {
        await axiosWithAuth().post("/user/update-profile", { ...values });
        check();
        notify({
          type: "success",
          message: "Başarılı!",
          description: "Profilinizde yaptığınız değişiklikler başarıyla kaydedilmiştir!",
        });
        setChanged(false);
      } catch {
        notify({
          type: "error",
          message: "Başarısız!",
          description: "Bir hata oluştu ve profilinizdeki değişiklikler kaydedilmedi!",
        });
      }
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setLoading(false);
    console.log(errorInfo);
  };

  const checkSlug = () => {
    setLoading(true);
    if (!form.slug) {
      return Promise.reject();
    } else if (slug !== form.slug) {
      return axiosWithAuth().post("/user/check-slug", { newSlug: form.slug });
    }
    return Promise.resolve();
  };

  const initialValues = { display_name, first_name, last_name, slug };

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
        rules={[{ required: true, message: "Görünen isim alanı boş bırakılamaz!" }]}
      >
        <Input name="display_name" onChange={onFormChange} />
      </Form.Item>

      <Form.Item
        label="İsim"
        name="first_name"
        rules={[{ required: true, message: "İsim alanı boş bırakılamaz!" }]}
      >
        <Input name="first_name" onChange={onFormChange} />
      </Form.Item>

      <Form.Item
        label="Soyisim"
        name="last_name"
        rules={[{ required: true, message: "Soyisim alanı boş bırakılamaz!" }]}
      >
        <Input name="last_name" onChange={onFormChange} />
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
            validator: async () => checkSlug().finally(() => setLoading(false)),
          },
        ]}
      >
        <Input name="slug" onChange={onFormChange} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type={changed ? "primary" : "default"} htmlType="submit" disabled={!changed}>
          Kaydet
        </Button>
        {loading && <LoadingOutlined style={{ marginLeft: 10 }} />}
      </Form.Item>
    </Form>
  );
}

export default Profile;
