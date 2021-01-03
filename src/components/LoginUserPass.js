import React from 'react';
import InputField from "./InputField"
import User from "./User"
import { Nav, Button, Navbar, Form, FormControl } from 'react-bootstrap'
import logo from './images/loginFormIcon.png'
import NavbarLoggedOut from "./NavbarLoggedOut";

class LoginUserPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    var url = 'Search?term=' + this.state.value;
    window.location.href = url;
    event.preventDefault();
  }

  handleChange2(event) {
    this.setState({ value2: event.target.value });
  }

  handleSubmit2(event) {
    var url = 'User?name=' + this.state.value2;
    window.location.href = url;
    event.preventDefault();
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false
    })
  }

  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true
    })
    try {
      let res = await fetch("/login", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      let result = await res.json();
      if (result && result.success) {
        User.isLoggedIn = true;
        User.username = result.username;
      }
      else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    }
    catch (e) {
      console.log(e);
      this.resetForm();
    }
    window.location.href = "/";
  }

  async doRegister() {
    try {
      let res = await fetch("register", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      let result = await res.json();
      User.username = result.username
      User.password = result.password
      this.resetForm();
      alert(result.msg);
    }
    catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  render() {
    return (
      <div className="loginForm">
        <NavbarLoggedOut/>
        <div className="loginRegister">
          <p style={{ textAlign: "center", color: "black", fontSize: "40px", fontFamily: "Arial", fontWeight: "bold" }}> <img src={logo} style={{ width: "50px" }} class="center" />&nbsp; MyMovieCatalog Login</p>
          <div className="login" style={{ textAlign: "center" }}>
            <br />
            <br />
            <br />
            <InputField type="text" placeholder="Username" value={this.state.username ? this.state.username : ""}
              onChange={(val) => this.setInputValue("username", val)} />
            <InputField type="password" placeholder="Password" value={this.state.password ? this.state.password : ""}
              onChange={(val) => this.setInputValue("password", val)} />
          </div>
          <br />
          <div className="loginButton" style={{ textAlign: "center" }}>
            <Button variant="info" onClick={() => this.doLogin()} >Login </Button>{' '}
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginUserPass;
