import { FileDoneOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoRequest } from "src/services/todo/todoRequest";
import userRequest from "src/services/user/userRequest";
import "./HomePage.scss";

const Homepage = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const { allGroups } = useSelector((state) => state.todo);

  useEffect(() => {
    if (allUsers.length === 0) {
      userRequest.getAllUsers(dispatch);
    }
  }, []);

  useEffect(() => {
    if (allGroups.length === 0) {
      todoRequest.getAllGroups(dispatch);
    }
  }, []);
  return (
    <div className="home-page">
      <h2 className="heading">Dashboard</h2>
      <div className="analytical-list">
        <div className="analytical-card">
          <div className="card-wrap">
            <div className="card-icon">
              <UserOutlined />
            </div>
            <div className="card-content">
              <div className="number">{allUsers.length}</div>
              <div className="label">Total users</div>
            </div>
          </div>
        </div>

        <div className="analytical-card">
          <div className="card-wrap">
            <div className="card-icon">
              <FileDoneOutlined />
            </div>
            <div className="card-content">
              <div className="number">{allGroups.length}</div>
              <div className="label">Total Group</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
