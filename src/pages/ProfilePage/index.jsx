import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UserDetailWrap from "src/components/UserDetailWrap";
import userRequest from "src/services/user/userRequest";

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!currentUser) {
      userRequest.getProfile(dispatch);
    }
  }, []);
  return (
    <div className="profile-page">
      <UserDetailWrap user={currentUser} />
    </div>
  );
};

export default ProfilePage;
