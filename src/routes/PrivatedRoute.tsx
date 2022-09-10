import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "src/store/rootReducer";
import {
  useAppSelector
} from "src/utils/hooks/customReduxHook";

const PrivatedRoute = () => {
  const { access_token } = useAppSelector((state: RootState) => state.auth);

  return <>{!access_token ? <Navigate to="/login" replace={true} /> : <Outlet />}</>;
};

export default PrivatedRoute;
