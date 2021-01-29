import { PageHeader } from "antd";
import React from "react";

interface InnerHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subTitle?: string;
}

function InnerHeader({ icon, title, subTitle }: InnerHeaderProps) {
  return (
    <PageHeader
      avatar={{ icon, style: { backgroundColor: "#001529" } }}
      title={title}
      subTitle={subTitle}
      ghost={false}
      style={{
        marginBottom: 50,
        borderBottom: "1px solid #ccc",
      }}
    />
  );
}

export default InnerHeader;
