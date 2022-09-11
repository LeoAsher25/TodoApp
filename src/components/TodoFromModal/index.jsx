import { DatePicker, Form, Input, Modal, Radio } from "antd";
import moment from "moment";
import React, { useEffect } from "react";

const TodoFromModal = ({ isEdit, data, ...modalProps }) => {
  const formRef = React.createRef();

  useEffect(() => {
    if (formRef && formRef.current) {
      if (data) {
        formRef.current.setFieldsValue({
          title: data.title,
          content: data.content,
          deadline: moment(data.deadline),
          worker_username: data.worker_username,
          status: data.status,
        });
      } else {
        formRef.current.setFieldsValue({
          title: "",
          content: "",
          deadline: "",
          worker_username: "",
        });
      }
    }
  }, [data]);

  return (
    <Modal {...modalProps} title={`${isEdit ? "Edit " : "Add "} Todo`}>
      <Form ref={formRef} layout="vertical" autoComplete="off">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item label="Content" name="content">
          <Input placeholder="Enter content" />
        </Form.Item>

        <Form.Item
          label="Deadline"
          name="deadline"
          rules={[
            {
              required: true,
              message: "Please select title",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label="Worker" name="worker_username">
          <Input placeholder="Enter worker" />
        </Form.Item>

        {isEdit && (
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please select status",
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value={0}>WORKING</Radio.Button>
              <Radio.Button value={1}>PENDING</Radio.Button>
              <Radio.Button value={2}>CANCELED</Radio.Button>
              <Radio.Button value={3}>COMPLETED</Radio.Button>
              <Radio.Button value={4}>DELETED</Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default TodoFromModal;
