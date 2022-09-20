import { react, useEffect, useState } from "react";
import FormRegister from "../component/register/FormRegister";
import axios from "axios";
import {Modal} from "antd";

const Register = () => {
    const [dataSelect, setDataSelect] = useState([]);

    useEffect(()=>{
        getDataSelect();
    },[])

  const postData = async (data) => {
    await axios.post(`http://localhost:8080/users/saveUser`,data).then((response) => {
      if (response.status === 200) {
        Modal.success({
          title: "Operation successfully completed",
          onOk() {
         
          },
        });
      } 
    }).catch((err)=>{
      Modal.error({
        title: "Unexpected error occurred",
        content: "Try again later",
      });
    });
  };

  // se encarga de obtener la data del select
  const getDataSelect= async ()=>{
   await axios.get(`http://localhost:8080/typedocument/all`,{}).then((response)=>{
        setDataSelect(response.data);
    })
  }
  const style = {
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "#FAFAFA",
    borderRadius: '25px',
    padding: '70px',
    justifyContent:'center'
  }

  return (
    <div style={style}>
        <h2>Register Client</h2>
        <FormRegister setData={postData} dataSelect={dataSelect} />
    </div>
  );
};

export default Register;
