import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { RouterPaths } from "src/types/commonType";

const NotFound: React.FC = () => {
  console.log("not found");
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to={RouterPaths.HOME}> Back Home</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
