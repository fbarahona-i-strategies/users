import { Button, Space, Form, Input, InputNumber, Select } from "antd";
import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Option } = Select;

const FormRegister = ({ setData, dataSelect }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setData(values);
    form.resetFields();
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item
        label="Names"
        name="names"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lastnames"
        name="lastNames"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* TypeDocuments */}
      <Form.List name="documents">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "typeDocument"]}
                  rules={[
                    {
                      required: true,
                      message: "Choose a type",
                    },
                  ]}
                >
                  <Select
                    initialvalue={null}
                    placeholder="Type"
                    style={{
                      width: 120,
                    }}
                  >
                    {dataSelect &&
                      dataSelect.map((select) => {
                        return (
                          <Option key={select.id} value={select.id}>
                            {select.typeDocument}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "document"]}
                  rules={[
                    {
                      required: true,
                      message: "Write a document",
                    },
                  ]}
                >
                  <InputNumber placeholder="Document" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add type document
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* direcciones */}
      <Form.List name="address">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: "flex",
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "address"]}
                  rules={[
                    {
                      required: true,
                      message: "write an address",
                    },
                  ]}
                >
                  <Input placeholder="address" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add address
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* submit */}
      <Form.Item
      >
        <Link href="/admin">
          <Button >
            Admin
          </Button>
        </Link>

        <Button type="primary" htmlType="submit" style={{marginLeft:"20px"}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormRegister;
