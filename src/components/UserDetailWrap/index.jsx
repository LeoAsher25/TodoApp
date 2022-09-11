import {
  Avatar,
  Button,
  Card,
  Collapse,
  DatePicker,
  Form,
  Input,
  Radio,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import userRequest from "src/services/user/userRequest";
import "./UserDetailWrap.scss";

const { Panel } = Collapse;

const UserDetailWrap = ({ user }) => {
  const [editAuth, setEditAuth] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [activeKeys, setActiveKeys] = useState(["1", "2"]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleEditAuthClick = (e) => {
    e.stopPropagation();
    if (editAuth) {
      userRequest.updateEmployeeAuthInfo(
        {
          ...authFormRef.current?.getFieldsValue(),
          id: user?.id,
        },
        dispatch,
        setEditAuth(!editAuth)
      );
    } else {
      setActiveKeys([...activeKeys, "1"]);
      setEditAuth(!editAuth);
    }
  };

  const handleEditUserClick = (e) => {
    e.stopPropagation();

    if (editUser) {
      userRequest.updateEmployeeInfo(
        {
          ...userFormRef.current?.getFieldsValue(),
          id: user?.id,
        },
        dispatch,
        setEditUser(!editUser)
      );
    } else {
      setActiveKeys([...activeKeys, "2"]);
      setEditUser(!editUser);
    }
  };

  const onChangeDate = () => {};

  const handleChangeActive = (keys) => {
    setActiveKeys([...keys]);
  };

  const [avaPath, setAvaPath] = useState("");

  const handleUploadAva = async (event) => {
    try {
      const formData = new FormData();
      formData.append("file_data", event.target.value);
      formData.append("type", "image/jpeg");
      const response = await userRequest.uploadData(formData, dispatch);
      setAvaPath(response.file_location);
    } catch (err) {
      console.log(err);
    }
  };

  const authFormRef = React.createRef();
  const userFormRef = React.createRef();

  useEffect(() => {
    authFormRef.current?.setFieldsValue({
      email: user?.email,
      username: user?.username,
      password: user?.password,
    });

    userFormRef.current?.setFieldsValue({
      user_status: user?.user_status,
      access_level: user?.access_level,
      first_name: user?.details?.first_name,
      last_name: user?.details?.last_name,
      phone_number: user?.details?.phone_number,
      national_id: user?.details?.national_id,
      birthday: moment(user?.details?.birthday),
      notes: user?.details?.notes,
      face: user?.details?.face,
      passport_1: user?.details?.passport_1,
      passport_2: user?.details?.passport_2,
    });

    setAvaPath(user?.details?.face);
  }, [user]);

  return (
    <Card className="card-detail-wrap">
      <div className="avatar-wrap">
        <Avatar
          src={"https://cms.aibb.vn/backend/public" + avaPath}
          size={150}
        />

        <Button className="upload-ava">
          <label htmlFor="upload-ava">Change avatar</label>
        </Button>

        <input type="file" hidden id="upload-ava" onChange={handleUploadAva} />
      </div>

      <Collapse
        expandIconPosition="end"
        activeKey={activeKeys}
        onChange={handleChangeActive}
      >
        <Panel
          header="Auth information"
          key="1"
          extra={
            <Button
              onClick={handleEditAuthClick}
              type="primary"
              disabled={currentUser.access_level !== 1}
            >
              {editAuth ? "Save information" : "Edit auth information"}
            </Button>
          }
        >
          <div className="form-wrap">
            <Form
              ref={authFormRef}
              name="authForm"
              labelCol={{ span: 8 }}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please enter username!" }]}
              >
                <Input disabled={!editAuth} placeholder="Enter username" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter email!" }]}
              >
                <Input disabled={!editAuth} placeholder="Enter email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter password!" }]}
              >
                <Input.Password
                  disabled={!editAuth}
                  placeholder="Enter password"
                />
              </Form.Item>
            </Form>
          </div>
        </Panel>

        <Panel
          header="User information"
          key="2"
          extra={
            <Button
              onClick={handleEditUserClick}
              type="primary"
              disabled={currentUser.access_level !== 1}
            >
              {editUser ? "Save user information" : " Edit user information"}
            </Button>
          }
        >
          <div className="form-wrap">
            <Form
              ref={userFormRef}
              name="userForm"
              labelCol={{ span: 8 }}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item label="First name" name="first_name">
                <Input disabled={!editUser} placeholder="Enter first name" />
              </Form.Item>

              <Form.Item label="Last name" name="last_name">
                <Input disabled={!editUser} placeholder="Enter last name" />
              </Form.Item>

              <Form.Item label="Phone" name="phone_number">
                <Input disabled={!editUser} placeholder="Enter phone number" />
              </Form.Item>

              <Form.Item label="Birthday" name="birthday">
                <DatePicker disabled={!editUser} onChange={onChangeDate} />
              </Form.Item>

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
                <Radio.Group disabled={!editUser}>
                  <Radio.Button value={1}>Director</Radio.Button>
                  <Radio.Button value={2}>Manager</Radio.Button>
                  <Radio.Button value={3}>Member</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Status"
                name="user_status"
                rules={[
                  {
                    required: true,
                    message: "Please select status",
                  },
                ]}
              >
                <Radio.Group disabled={!editUser}>
                  <Radio.Button value={0}>Working</Radio.Button>
                  <Radio.Button value={1}>Suspend</Radio.Button>
                  <Radio.Button value={2}>Quit</Radio.Button>
                  <Radio.Button value={3}>Deleted</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Notes" name="notes">
                <Input.TextArea
                  rows={4}
                  disabled={!editUser}
                  placeholder="Enter note"
                />
              </Form.Item>
            </Form>
          </div>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default UserDetailWrap;
