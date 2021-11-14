import { SettingOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import InnerHeader from "./InnerHeader";

function Settings() {
  return (
    <Content>
      <InnerHeader
        icon={<SettingOutlined />}
        title="Ayarlar"
        subTitle="Kodritma hesabınızla ilgili diğer ayarlar"
      />
    </Content>
  );
}

export default Settings;
