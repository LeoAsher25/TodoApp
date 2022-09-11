import { Button, Card, Col, Menu, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { todoRequest } from "src/services/todo/todoRequest";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./TodoPage.scss";
import TodoList from "src/components/TodoList";
import GroupFromModal from "src/components/GroupFromModal";
import TodoFromModal from "src/components/TodoFromModal";

const TodoPage = () => {
  const { allGroups } = useSelector((state) => state.todo);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const [openAddGroup, setOpenAddGroup] = useState(false);

  const handleOkAddGroup = (group) => {
    setOpenAddGroup(false);
  };

  const handleCloseAddGroup = () => {
    setOpenAddGroup(false);
  };

  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  const handleOkAddTodo = (Todo) => {
    setOpenAddTodo(false);
  };

  const handleCloseAddTodo = () => {
    setOpenAddTodo(false);
  };

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setIsEditTodo(true);
    setOpenAddTodo(true);
  };

  useEffect(() => {
    if (selectedGroup && selectedGroup.id) {
      const fetchTodo = async () => {
        try {
          setLoading(true);
          const response = await todoRequest.getAllTodos(
            dispatch,
            selectedGroup.id
          );
          setTodoList(response);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log("err: ", err);
        }
      };

      fetchTodo();
    }
  }, [selectedGroup]);

  return (
    <div className="todo-page">
      <GroupFromModal
        open={openAddGroup}
        onOk={handleOkAddGroup}
        onCancel={handleCloseAddGroup}
      />

      <TodoFromModal
        open={openAddTodo}
        onOk={handleOkAddTodo}
        onCancel={handleCloseAddTodo}
        isEdit={isEditTodo}
        data={selectedTodo}
      />
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <div className="groups-list-header">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setOpenAddGroup(true)}
              >
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
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenAddTodo(true)}
                >
                  Add Task
                </Button>
              </div>
            </div>

            <div className="todo-list-wrap">
              <TodoList
                todoList={todoList}
                handleEditClick={handleEditClick}
                loading={loading}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TodoPage;
