import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
const EditUsers = () => {
    const history = useHistory()
    let { id } = useParams();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    getUserById()
  }, []);

  const getUserById = async() => {
    const result = await axios.get("http://localhost:3001/api/users/"+id);
    console.log(result.data);
    setState(result.data);
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const validateForm = (value) => {
    if (value.password) {
      var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (!regularExpression.test(value.password)) {
        toast(
          "password should be 6 to 16 length and must contains special char"
        );
        return false;
      }
    }
    if (value.lastName === "") {
      toast("lastName is required");
      return false;
    } else {
      return true;
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const valid = validateForm(state);
      if (valid) {
        const result = axios({
          method: "put",
          url: "http://localhost:3001/api/users/"+id,
          data: state,
        });
        if (result) {
         
          toast("User Update Success");
          history.push('/')
        }
      }
    } catch (err) {
      alert(toString(err));
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <div>
            <TextField
              required
              id="outlined-error"
              name="firstName"
              value={state.firstName}
              label="firstName"
              onChange={onChange}
            />
            <TextField
              id="outlined-error"
              name="lastName"
              value={state.lastName}
              label="lastName"
              onChange={onChange}
              type="text"
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-error"
              name="email"
              value={state.email}
              label="email"
              type="email"
              onChange={onChange}
            />
            <TextField
              required
              type="password"
              id="outlined-error"
              password="password"
              label="Password"
              name="password"
              value={state.password}
              onChange={onChange}
            />
          </div>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditUsers;
