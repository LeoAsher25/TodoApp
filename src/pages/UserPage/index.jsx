import { Button, Dropdown, Menu, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import userRequest from "src/services/user/userRequest";
import { getAccessLevelText } from "src/utils/userHelper";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (_, record) => (
      <Link to={`/user/${record.id}`}>{record.username}</Link>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Full name",
    dataIndex: "first_name",
    key: "first_name",
    render: (_, record) => (
      <span>
        {`${record.first_name || "---"} ${record.last_name || "---"}`}
      </span>
    ),
  },
  {
    title: "Phone number",
    dataIndex: "phone_number",
    key: "phone_number",
    render: (value) => value || "---",
  },
  {
    title: "Level",
    dataIndex: "access_level",
    key: "access_level",
    render: (value) => getAccessLevelText(value),
  },
  {
    title: "Status",
    dataIndex: "user_status",
    key: "user_status",
  },
  {
    title: "Action",
    key: "email",
    render: (_, record) => (
      <Dropdown
        trigger={["click"]}
        overlay={
          <Menu
            items={[
              {
                key: "1",
                label: "Edit",
              },
              {
                key: "2",
                label: "Delete",
                disabled: true,
              },
            ]}
          />
        }
      >
        <EllipsisOutlined style={{ fontSize: 24 }} />
      </Dropdown>
    ),
  },
];

const UserPage = () => {
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allUsers.length === 0) {
      userRequest.getAllUsers(dispatch);
    }
  }, []);
  return (
    <div className="user-page">
      <div className="page-header-wrap">
        <Button type="primary" icon={<PlusOutlined />}>
          Add User
        </Button>
      </div>

      <Table dataSource={allUsers} columns={columns}></Table>
    </div>
  );
};

export default UserPage;
