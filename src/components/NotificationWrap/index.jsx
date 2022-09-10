import { Badge, Dropdown } from "antd";
import React from "react";
import { BellOutlined } from "@ant-design/icons";

const NotificationWrap = () => {
  // const notification =
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      overlay={<div>Notification</div>}
    >
      <div
        className="bell-wrap"
        style={{
          marginRight: 16,
          cursor: "pointer",
        }}
      >
        <Badge count={5}>
          <BellOutlined style={{ fontSize: 24 }} />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationWrap;
