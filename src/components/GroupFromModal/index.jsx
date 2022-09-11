import { DatePicker, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";

const GroupFromModal = ({ isEdit, ...modalProps }) => {
  const formRef = React.createRef();

  useEffect(() => {
    if (formRef && formRef.current) {
      formRef.current.setFieldsValue({
        title: "",
        content: "",
        deadline: "",
      });
    }
  }, []);

  return (
    <Modal {...modalProps} title={`${isEdit ? "Edit " : "Add "} Group`}>
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
      </Form>
    </Modal>
  );
};

export default GroupFromModal;
