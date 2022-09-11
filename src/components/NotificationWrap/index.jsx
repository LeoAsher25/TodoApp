import { Badge, Dropdown } from "antd";
import React, { useEffect } from "react";
import { BellOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import userRequest from "src/services/user/userRequest";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import "./NotificationWrap.scss";

const NotificationWrap = () => {
  const { allNoti } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { access_token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser && access_token) {
      userRequest.getAllNoti(dispatch);
    }
  }, [currentUser, access_token]);

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      overlay={
        <div className="noti-wrap">
          <h3 className="title">Notifications</h3>

          <ul className="noti-list">
            {allNoti.map((noti) => (
              <li className="noti-item" key={noti.id}>
                <Link to={noti.link}>
                  <div className="noti-content-wrap">
                    <span className="content">{noti.content}</span>
                    <span className="created-at">
                      {moment(noti.created_at).fromNow()}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <div className="bell-wrap">
        <Badge count={allNoti.length}>
          <BellOutlined style={{ fontSize: 24 }} />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationWrap;
