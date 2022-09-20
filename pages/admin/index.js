import React, { useState, useEffect } from "react";
import axios from "axios";
import TableCollapsible from "../component/admin/TableCollapsible";

const Admin = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    getDataUsers();
  }, []);

//obtiene los datos del usuario para la tabla
  const getDataUsers = async ()=>{
    await axios.get(`http://localhost:8080/users/all`).then((response)=>{
      const dataFormat  = response.data?.map((user)=>{
        return {
          ...user,
          key:user.idUser
        } 
      });
    setDataUsers(dataFormat);
    })
  }

  const style = {
    position: "absolute",
    width: "6 0%",
    display: "flex",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style}>
      <TableCollapsible data={dataUsers} refreshDataUser={getDataUsers}></TableCollapsible>
    </div>
  );
};

export default Admin;
