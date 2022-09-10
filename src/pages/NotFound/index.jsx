import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { routerPaths } from "src/constant";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to={routerPaths.HOME}> Back Home</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
