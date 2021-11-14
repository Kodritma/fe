import { CarryOutOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import InnerHeader from "./InnerHeader";

function Progress() {
  return (
    <Content>
      <InnerHeader
        icon={<CarryOutOutlined />}
        title="Seviye Detayları"
        subTitle="Çözdüğünüz Algoritma Alıştırmaları ve izlediğiniz Videolu Dersler'in detaylarını inceleyin"
      />
    </Content>
  );
}

export default Progress;
