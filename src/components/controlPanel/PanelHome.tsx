import { FileTextOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import { useContext } from "react";
import { AuthContext } from "../../authContext";
import InnerHeader from "./InnerHeader";

function PanelHome() {
  const details = useContext(AuthContext);

  return (
    <Content className="profile-default">
      <InnerHeader
        icon={<FileTextOutlined />}
        title={`Merhaba, ${details.display_name}!`}
        subTitle="Hesabınızı yönetin."
      />
    </Content>
  );
}

export default PanelHome;
