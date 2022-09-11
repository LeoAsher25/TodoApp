import { Dropdown, Menu, Table } from "antd";
import moment from "moment";
import React from "react";
import { getTodoStatus } from "src/utils/helper";
import { EllipsisOutlined } from "@ant-design/icons";

const TodoList = ({ todoList, handleEditClick, loading }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (value) => value || "---",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (value) => {
        return value ? moment(value).format("DD-MM-YYYY") : "---";
      },
    },
    {
      title: "Worker",
      dataIndex: "worker_username",
      key: "worker_username",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => getTodoStatus(value),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          overlay={
            <Menu
              items={[
                {
                  key: "1",
                  label: (
                    <div onClick={() => handleEditClick(record)}> Edit </div>
                  ),
                },
                {
                  key: "2",
                  label: "Delete",
                },
              ]}
            />
          }
        >
          <EllipsisOutlined style={{ fontSize: 24 }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={todoList}
        columns={columns}
        rowKey="id"
        loading={loading}
      ></Table>
    </div>
  );
};

export default TodoList;
