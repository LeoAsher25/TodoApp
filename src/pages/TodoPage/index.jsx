import { Button, Card, Col, Menu, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { todoRequest } from "src/services/todo/todoRequest";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./TodoPage.scss";

const TodoPage = () => {
  const { allGroups } = useSelector((state) => state.todo);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [todoList, setTodoList] = useState([]);

  const dispatch = useDispatch();
  const handleSelectGroup = ({ key }) => {
    setSelectedGroup(allGroups[key]);
  };

  useEffect(() => {
    if (allGroups.length === 0) {
      todoRequest.getAllGroups(dispatch);
    }
  }, []);

  useEffect(() => {
    if (allGroups.length) {
      setSelectedGroup(allGroups[0]);
    }
  }, [allGroups]);

  return (
    <div className="todo-page">
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <div className="groups-list-header">
              <Button type="primary" icon={<PlusOutlined />}>
                Add Group
              </Button>
            </div>

            <Menu
              defaultSelectedKeys={["0"]}
              onSelect={handleSelectGroup}
              items={allGroups.map((item, index) => ({
                key: index,
                label: item.title,
              }))}
            ></Menu>
          </Card>
        </Col>
        <Col span={18}>
          <Card>
            <div className="page-header-wrap">
              <div className="heading">Group: {selectedGroup?.title}</div>
              <div className="action-wrap">
                <Button type="primary" danger icon={<DeleteOutlined />}>
                  Delete group
                </Button>
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Task
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TodoPage;
