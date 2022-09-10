import { Button, Card, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { routerPaths } from "src/constant";
import { authRequest } from "src/services/auth/authRequest";

import { loginSchema } from "src/utils/yup";
import "./LoginPage.scss";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const onFinish = async (data) => {
    const isValid = await loginSchema.isValid(data);
    if (isValid) {
      authRequest.login(data, dispatch);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="login-page">
      {access_token && <Navigate to={routerPaths.HOME} />}
      <Card className="login-card">
        <h2 className="login-page-title">Login</h2>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            email: "phongw@aibb.vn",
            password: "AIBB1234z@",
          }}
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
