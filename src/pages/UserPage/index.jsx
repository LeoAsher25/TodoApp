import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Menu, Modal, Radio, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { routerPaths } from "src/constant";
import userRequest from "src/services/user/userRequest";
import { userSliceActions } from "src/services/user/userSlice";
import { getAccessLevelText, getUserStatus } from "src/utils/helper";

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
    render: (value) => getUserStatus(value),
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
                label: (
                  <NavLink to={`${routerPaths.USER}/${record.id}`}>
                    Detail
                  </NavLink>
                ),
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
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allUsers.length === 0) {
      userRequest.getAllUsers(dispatch);
    }
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const handleOk = () => {
    userRequest.addUser(
      formRef.current?.getFieldsValue(),
      dispatch,
      handleAddUserSuccessfully
    );
  };

  const handleAddUserSuccessfully = (newUser) => {
    dispatch(
      userSliceActions.getAllUsers({ allUsers: [{ ...newUser }, ...allUsers] })
    );
    handleCancel();
  };

  const handleCancel = () => {
    formRef.current?.resetFields();
    setOpenModal(false);
  };

  const formRef = React.createRef();
  console.log("currentUser: ", currentUser);

  return (
    <div className="user-page">
      <div className="page-header-wrap">
        <div className="action-wrap">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenModal(true);
            }}
            disabled={currentUser?.access_level === 3}
          >
            Add User
          </Button>
        </div>
      </div>

      <Table dataSource={allUsers} columns={columns} rowKey="id"></Table>

      <Modal
        title="Add User"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form ref={formRef} layout="vertical" autoComplete="off">
          <Form.Item
            label="Level"
            name="access_level"
            rules={[
              {
                required: true,
                message: "Please select level",
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value={1}>Director</Radio.Button>
              <Radio.Button value={2}>Manager</Radio.Button>
              <Radio.Button value={3}>Member</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please select username",
              },
            ]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please select email",
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please select password",
              },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPage;
