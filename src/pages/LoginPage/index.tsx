import { Button, Card, Checkbox, Form, FormInstance, Input } from "antd";
import { LoginRequestData } from "src/types/authTypes";
import {
  useAppDispatch,
  useAppSelector,
} from "src/utils/hooks/customReduxHook";
import { loginSchema } from "src/utils/yup";
import authThunkActions from "src/services/auth/authThunkActions";
import "./LoginPage.scss";
import { RootState } from "src/store/rootReducer";
import { RouterPaths } from "src/types/commonType";
import { Navigate } from "react-router-dom";
import React from "react";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { access_token } = useAppSelector((state: RootState) => state.auth);
  const onFinish = async (data: LoginRequestData) => {
    console.log("value: ", data);
    const isValid = await loginSchema.isValid(data);
    if (isValid) {
      dispatch(authThunkActions.login(data));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const formRef = React.createRef<FormInstance>();

  React.useEffect(() => {
    formRef.current?.setFieldsValue({
      email: "phongw@aibb.vn",
      password: "AIBB1234z@",
    });
  }, []);

  return (
    <div className="login-page">
      {access_token && <Navigate to={RouterPaths.HOME} />}
      <Card className="login-card">
        <h2 className="login-page-title">Login</h2>
        <Form
          ref={formRef}
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
