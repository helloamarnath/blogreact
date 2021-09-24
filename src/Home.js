import "./App.css";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const Home = (props) => {
  //component did mount
  const history = useHistory();
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const result = await axios.get("http://localhost:3001/api/users");
    console.log(result.data);
    setListUsers(result.data);
  };

  const onNavigation = (id) => {
    history.push("/edit/" + id);
  };

  const deleteUserById = async (id) => {
    const result = await axios({
      method: "delete",
      url: "http://localhost:3001/api/users/" + id,
    });
    if (result) {
      toast("User Delete Success");
      getUserList()
    }
  };

  return (
    <div className="Home">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>FirstName</TableCell>
              <TableCell align="right">LastName</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUsers.length > 0
              ? listUsers.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="right">{data.firstName}</TableCell>
                    <TableCell align="right">{data.lastName}</TableCell>
                    <TableCell align="right">{data.email}</TableCell>
                    <TableCell align="right">{data.password}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => onNavigation(data._id)}
                        variant="contained"
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={()=>deleteUserById(data._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
