import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routerPaths } from "src/constant";
import { authRequest } from "src/services/auth/authRequest";
import userThunkActions, { userRequest } from "src/services/user/userRequest";

import "./HeaderUserWrap.scss";

const HeaderUserWrap = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authRequest.logout(dispatch);
  };

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

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
                  label: "Profile",
                  action: () => {
                    navigate(routerPaths.PROFILE);
                  },
                },
                {
                  key: "2",
                  icon: <LogoutOutlined />,
                  label: "Log out",
                  action: handleLogout,
                },
              ].map((item) => (
                <li key={item.key} onClick={item.action}>
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
