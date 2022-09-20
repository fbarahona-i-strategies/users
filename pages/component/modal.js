import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { Form, Input, Space, Select, InputNumber, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const ModalEdit = ({
  data,
  showModalEdit,
  modalType,
  setShowModalEdit,
  refreshDataUser,
  refreshDataAddress,
  refreshDataDocument
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // se encarga de guradar el usuario 
  const onFinishUser = (values) => {
    const dataFormat = {
      ...values,
      idUser: data.key,
    };
    update("users", dataFormat);
  };

  // se encarga de guardar la direccion
  const onFinishAddress = (values) => {
    const dataFormat = {
      ...values,
      id: data.key,
    };
     update("address", dataFormat);
  };

  // se encarga de guardar el documento
  const onFinishDocument = (values) => {
    const dataFormat = {
      ...values,
      idDocument: data.key,
    };
    console.log(data)
    update("documents", dataFormat);
  };

  //esta funcion se encarga de administrar las actualizaciones 
  const update = (path, dataToUpdate) => {
    setIsLoading(true);
    axios.put(`http://localhost:8080/${path}/update`, dataToUpdate).then((response) => {
      setTimeout(() => {
        setIsLoading(false);
        if (response.status === 200) {
          Modal.success({
            title: "Operation successfully completed",
            onOk() {
              setShowModalEdit(false);
               path === "users" && refreshDataUser();
               path === "address" && refreshDataAddress(data.idUser);
               path === "documents" && refreshDataDocument(data.idUser);
            },
          });
        } 
      }, 3000);
    }).catch((error)=>{
        setIsLoading(false);
        Modal.error({
            title: "Unexpected error occurred",
            content: "Try again later",
          });
    });
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 16,
        color: "white",
      }}
      spin
    />
  );

  // se encarga de retornar el mdaol segun el tipo
  switch (modalType) {
    case "users":
      return (
        <>
          <Modal
            title="Edit Users "
            open={showModalEdit}
            closable={false}
            footer={false}
          >
            <>
              <Form
                onFinish={onFinishUser}
                form={form}
                style={{ marginLeft: "20%" }}
              >
                <Form.Item
                  label="Names"
                  name="names"
                  initialValue={data.names || ""}
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input style={{ width: "calc(100% - 100px)" }} />
                </Form.Item>

                <Form.Item
                  label="Lastnames"
                  name="lastNames"
                  initialValue={data.lastNames || ""}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input style={{ width: "calc(100% - 100px)" }} />
                </Form.Item>

                {/* submit */}
                <Form.Item>
                  <div>
                    <Button
                      type="secondary"
                      onClick={() => setShowModalEdit(false)}
                    >
                      Back
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: "10px" }}
                    >
                      {isLoading ? <Spin indicator={antIcon} /> : "Edit"}
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </>
          </Modal>
        </>
      );
    case "document":
      return (
        <>
          <Modal
            title="Edit Document"
            open={showModalEdit}
            closable={false}
            footer={false}
          >
            <>
              <Form onFinish={onFinishDocument} form={form}  style={{ marginLeft: "20%" }}>

                <Form.Item
                  label="Document"
                  name="document"
                  initialValue={data.document || ""}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input style={{ width: "calc(100% - 100px)" }} />
                </Form.Item>

                {/* submit */}
                <Form.Item>
                  <div>
                  <Button
                      type="secondary"
                      onClick={() => setShowModalEdit(false)}
                    >
                      Back
                    </Button>
                    <Button type="primary" htmlType="submit" style={{marginLeft:"10px"}}>
                    {isLoading ? <Spin indicator={antIcon} /> : "Edit"}
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </>
          </Modal>
        </>
      );
    case "address":
      return (
        <>
          <Modal
            title="Edit Address"
            open={showModalEdit}
            closable={false}
            footer={false}
          >
            <>
              <Form onFinish={onFinishAddress} form={form} style={{ marginLeft: "20%" }}>
                <Form.Item
                  label="Address"
                  name="address"
                  initialValue={data.address || ""}
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input style={{ width: "calc(100% - 100px)"}} />
                </Form.Item>

                {/* submit */}
                <Form.Item>
                  <Button
                    type="secondary"
                    onClick={() => setShowModalEdit(false)}
                  >
                    Back
                  </Button>
                  <Button type="primary" htmlType="submit" style={{marginLeft:"10px"}}>
                    {isLoading ? <Spin indicator={antIcon} /> : "Edit"}
                  </Button>
                </Form.Item>
              </Form>
            </>
          </Modal>
        </>
      );
    default:
      break;
  }
};

export default ModalEdit;
