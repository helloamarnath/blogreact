import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./About";
import AddUser from "./AddUser";
import Home from "./Home";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditUsers from "./EditUser";
export default function App() {
  const [token, settoken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    settoken(token);
  }, []);
  return (
    <Router>
      <div>
        {token ? (
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/add">Add User</Link>
              </li>
              <li>
                <Link to="/users">Dashboard</Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Login</Link>
              </li>
            </ul>
          </nav>
        )}
       

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/add">
            <AddUser />
          </Route>
          <Route exact path="/edit/:id">
            <EditUsers />
          </Route>
        </Switch>
      </div>
      <ToastContainer />
    </Router>
  );
}
