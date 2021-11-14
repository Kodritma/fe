import { PageHeader } from "antd";
import React, { ReactNode } from "react";

interface InnerHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subTitle?: string;
  extra?: ReactNode;
}

function InnerHeader({ icon, title, subTitle, extra }: InnerHeaderProps) {
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
      extra={extra}
    />
  );
}

export default InnerHeader;
