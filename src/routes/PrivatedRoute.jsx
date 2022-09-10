import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "src/store/rootReducer";

const PrivatedRoute = () => {
  const { access_token } = useSelector((state) => state.auth);

  return (
    <>{!access_token ? <Navigate to="/login" replace={true} /> : <Outlet />}</>
  );
};

export default PrivatedRoute;
