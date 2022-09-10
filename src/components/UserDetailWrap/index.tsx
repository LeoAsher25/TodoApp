import {
  Button,
  Card,
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  FormInstance,
  Input,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userRequest from "src/services/user/userRequest";
import "./UserDetailWrap.scss";

const { Panel } = Collapse;

const UserDetailWrap = ({ user }: any) => {
  const [editAuth, setEditAuth] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const dispatch = useDispatch();

  const handleEditAuthClick = (e: any) => {
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
      setEditAuth(!editAuth);
    }
  };

  const handleEditUserClick = (e: any) => {
    e.stopPropagation();

    if (editUser) {
      userRequest.updateEmployeeInfo(
        {
          ...authFormRef.current?.getFieldsValue(),
          id: user?.id,
        },
        dispatch,
        setEditUser(!editUser)
      );
    } else {
      setEditUser(!editUser);
    }
  };

  const onChangeDate = () => {};

  const authFormRef = React.createRef<FormInstance>();
  const userFormRef = React.createRef<FormInstance>();

  useEffect(() => {
    authFormRef.current?.setFieldsValue({
      email: user?.email,
      username: user?.username,
      password: user?.password,
    });

    userFormRef.current?.setFieldsValue({
      level: user?.access_level,
      user_status: user?.user_status,
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
  }, [user]);

  return (
    <Card className="card-detail-wrap">
      <Collapse expandIconPosition="end" defaultActiveKey={["1", "2"]}>
        <Panel
          header="Auth information"
          key="1"
          extra={
            <Button onClick={handleEditAuthClick} type="primary">
              {editAuth ? "Save information" : "Edit auth information"}
            </Button>
          }
        >
          <div className="form-wrap">
            <Form
              ref={authFormRef}
              name="basic"
              labelCol={{ span: 8 }}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input disabled={!editAuth} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input disabled={!editAuth} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password disabled={!editAuth} />
              </Form.Item>
            </Form>
          </div>
        </Panel>

        <Panel
          header="User information"
          key="2"
          extra={
            <Button onClick={handleEditUserClick} type="primary">
              {editUser ? "Save user information" : " Edit user information"}
            </Button>
          }
        >
          <div className="form-wrap">
            <Form
              ref={userFormRef}
              name="basic"
              labelCol={{ span: 8 }}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item label="First name" name="first_name">
                <Input disabled={!editUser} />
              </Form.Item>

              <Form.Item label="Last name" name="last_name">
                <Input disabled={!editUser} />
              </Form.Item>

              <Form.Item label="Phone" name="phone_number">
                <Input disabled={!editUser} />
              </Form.Item>

              <Form.Item label="Birthday" name="birthday">
                <DatePicker disabled={!editUser} onChange={onChangeDate} />
              </Form.Item>

              <Form.Item label="Notes" name="notes">
                <Input.TextArea rows={4} disabled={!editUser} />
              </Form.Item>
            </Form>
          </div>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default UserDetailWrap;
