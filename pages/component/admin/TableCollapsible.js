import { React, useState, Fragment, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import axios from "axios";
import { Modal } from "antd";
import ModalEdit from "../modal";
import { CSVLink } from "react-csv";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Row(props) {
  const { row, refreshDataUser } = props;

  const [dataToEdit, setDataToEdit] = useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [modalType, setModalType] = useState("");

  const [openAddress, setOpenAddress] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);

  const [dataAddress, setDataAddress] = useState([]);
  const [dataEmptyAddress, setDataEmptyAddress] = useState(false);

  const [dataDocument, setDataDocument] = useState([]);
  const [dataEmptyDocument, setDataEmptyDocument] = useState(false);


  //estos metodos obtienen la informacion del usuario 
  const getDataAddress = async (id) => {
   await  axios
      .get(`http://localhost:8080/address/getAddress/${id}`)
      .then((response) => {
        if (response.data.length >= 1) {
          const dataFormat = response.data.map((address) => {
            return {
              key: address.id,
              address: address.address,
              idUser: address.idUsers.idUser,
            };
          });
          setDataAddress(dataFormat);
        } else {
          setDataEmptyAddress(true);
        }
      });
  };
  const getDataDocument = async (id) => {
   await axios
      .get(`http://localhost:8080/documents/getDocuments/${id}`)
      .then((response) => {
        if (response.data.length >= 1) {
          const dataFormat = response.data.map((document) => {
            return {
              key: document.idDocument,
              document: document.document,
              typeDocument: document.idTypeDocument.typeDocument,
              idTypeDocument: document.idTypeDocument.id,
              idUser: document.idUser.idUser,
            };
          });
          setDataDocument(dataFormat);
        } else {
          setDataEmptyDocument(true);
        }
      });
  };
  const deleteData = async (path, id) => {
   await axios
      .delete(`http://localhost:8080/${path}/delete/${id}`)
      .then((response) => {
        if (response.status === 200) {
          Modal.success({
            title: "Operation successfully completed",
            onOk() {
              path === "users" && refreshDataUser();
              path === "address" && getDataAddress(row.idUser);
              path === "documents" && getDataDocument(row.idUser);
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Modal.error({
          title: "There are records associated",
          content: "No data associated with this record can be deleted.",
          onOk() {},
        });
      });
  };

  return (
    <>
      <ModalEdit
        data={dataToEdit}
        showModalEdit={showModalEdit}
        modalType={modalType}
        setShowModalEdit={setShowModalEdit}
        refreshDataUser={refreshDataUser}
        refreshDataAddress={getDataAddress}
        refreshDataDocument={getDataDocument}
      ></ModalEdit>
      <Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <Button
              size="small"
              color="success"
              onClick={() => {
                setOpenAddress(!openAddress);
                if (!openAddress) {
                  getDataAddress(row.idUser);
                }
              }}
            >
              Address
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => {
                setOpenDocument(!openDocument);
                if (!openDocument) {
                  getDataDocument(row.idUser);
                }
              }}
            >
              Documents
            </Button>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.names}
          </TableCell>
          <TableCell align="right">{row.lastNames}</TableCell>
          <TableCell align="left">
            <div style={{ display: "flex" }}>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  deleteData("users", row.key);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setDataToEdit(row);
                  setShowModalEdit(true);
                  setModalType("users");
                }}
              >
                <EditIcon />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openAddress} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      {dataEmptyAddress ? <TableCell/> : 
                      <TableCell align="right">
                        <CSVLink data={dataAddress} filename={"Address.csv"}>
                          <IconButton>
                            <ArrowDownwardIcon />
                          </IconButton>
                        </CSVLink>
                      </TableCell>
                      }
                    </TableRow>
                  </TableHead>
                  {dataEmptyAddress ? (
                    <TableBody>
                      <TableRow>
                        <TableCell>{"No hay registros"}</TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {(dataAddress || []).map((data) => (
                        <TableRow key={data.key}>
                          <TableCell component="th" scope="row">
                            {dataAddress.indexOf(data) + 1} - {data.address}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                deleteData("address", data.key);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              aria-label="edit"
                              onClick={() => {
                                setDataToEdit(data);
                                setShowModalEdit(true);
                                setModalType("address");
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </Box>
            </Collapse>
            <Collapse in={openDocument} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type document</TableCell>
                      <TableCell>Document</TableCell>
                      {dataEmptyDocument ? <TableCell/> : 
                      <TableCell align="right">
                        <CSVLink data={dataDocument} filename={"documents.csv"}>
                          <IconButton>
                            <ArrowDownwardIcon />
                          </IconButton>
                        </CSVLink>
                      </TableCell>
                      }
                    </TableRow>
                  </TableHead>
                  {dataEmptyDocument ? (
                    <TableBody>
                      <TableRow>
                        <TableCell>{"No hay registros"}</TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {(dataDocument || []).map((data) => (
                        <TableRow key={data.key}>
                          <TableCell component="th" scope="row">
                            {data.typeDocument}
                          </TableCell>
                          <TableCell>{data.document}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                deleteData("documents", data.key);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              aria-label="edit"
                              onClick={() => {
                                setDataToEdit(data);
                                setShowModalEdit(true);
                                setModalType("document");
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    </>
  );
}

//Esta tabla sirve para mostrar el detalle principal del usuario 
export default function TableCollapsible({ data, refreshDataUser }) {
  const rows = data;
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: "#FAFAFA" }}>
            <TableRow>
              <TableCell>
                <CSVLink data={data} filename={"users.csv"}>
                  <Button>Exportar a csv</Button>
                </CSVLink>
              </TableCell>
              <TableCell>Names</TableCell>
              <TableCell align="left">Last Names</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.idUser}
                row={row}
                refreshDataUser={refreshDataUser}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
