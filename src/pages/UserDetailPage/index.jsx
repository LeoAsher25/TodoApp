import { Button, Card, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserDetailWrap from "src/components/UserDetailWrap";
import userRequest from "src/services/user/userRequest";

const UserDetailPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.getUserDetail(userId, dispatch);
      setUser(res);
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="user-detail-page">
      <UserDetailWrap user={user} />
    </div>
  );
};

export default UserDetailPage;
