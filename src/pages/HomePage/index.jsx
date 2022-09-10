import { FileDoneOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoRequest } from "src/services/todo/todoRequest";
import userRequest from "src/services/user/userRequest";
import "./HomePage.scss";

const Homepage = () => {
  const dispatch = useDispatch();
  const { allUser } = useSelector((state) => state.user);
  const { allGroup } = useSelector((state) => state.todo);

  useEffect(() => {
    if (allUser.length === 0) {
      userRequest.getAllUser(dispatch);
    }
  }, []);

  useEffect(() => {
    if (allGroup.length === 0) {
      todoRequest.getAllGroup(dispatch);
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
              <div className="number">{allUser.length}</div>
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
              <div className="number">{allGroup.length}</div>
              <div className="label">Total Group</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
