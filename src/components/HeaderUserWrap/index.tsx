import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { authSliceActions } from "src/services/auth/authSlice";
import userThunkActions from "src/services/user/userThunkActions";
import { RootState } from "src/store/rootReducer";
import { RouterPaths } from "src/types/commonType";
import {
  useAppDispatch,
  useAppSelector,
} from "src/utils/hooks/customReduxHook";
import "./HeaderUserWrap.scss";

const HeaderUserWrap = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authSliceActions.logoutMethod());
  };

  const { currentUser } = useAppSelector((state: RootState) => state.user);
  const { access_token } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!currentUser && access_token) {
      console.log("accesstoken:", access_token);
      dispatch(userThunkActions.getProfile());
    }
  }, []);
  return (
    <div>
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        overlay={
          <div className="dropdown-wrap">
            <div className="name-wrap">
              <h3 className="username">{currentUser?.username}</h3>
            </div>
            <ul>
              {[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: <Link to={RouterPaths.PROFILE}>Profile</Link>,
                },
                {
                  key: "2",
                  icon: <LogoutOutlined />,
                  label: <div onClick={handleLogout}>Log out</div>,
                },
              ].map((item) => (
                <li key={item.key}>
                  {item.icon}
                  <span className="item-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="avatar-wrap" style={{ cursor: "pointer" }}>
          {currentUser && currentUser.details.face ? (
            <Avatar size={42} src={currentUser.details.face} />
          ) : (
            <Avatar size={42} icon={<UserOutlined />} />
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderUserWrap;
