import React from 'react';
import InputField from "./InputField"
import User from "./User"
import { Nav, Button, Navbar, Form, FormControl } from 'react-bootstrap'
import Catalog from "./Catalog"

class NavbarLoggedOut extends React.Component {
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
        <Navbar variant="dark" style={{backgroundColor: "#7D7577"}}>
          <Navbar.Brand>MyMovieCatalog</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Button variant="light" style={{ marginRight: 5 }} onClick={(e) => { e.preventDefault(); window.location.href = '/Login'; }}>Login</Button>{' '}
          <Button variant="light" onClick={(e) => { e.preventDefault(); window.location.href = '/Register'; }}>Register</Button>{' '}
        </Navbar>
        <Navbar style={{backgroundColor: "#7D7577"}} variant="dark">
        <Nav className="ml-auto">
          <form onSubmit={this.handleSubmit2}>
            <label style={{color: "black"}}>
              Profile of:&nbsp;
          <input type="text" value={this.state.value2} onChange={this.handleChange2} class="form-container" inline style={{ marginRight: 5 }} />
            </label>
            <input type="submit" value="Search" class="btn" style={{ backgroundColor: "white", color: "black", marginRight: 5 }} />
          </form>{' '}

          <form onSubmit={this.handleSubmit}>
            <label style={{color: "black"}}>
              Movie:&nbsp;
          <input type="text" value={this.state.value} onChange={this.handleChange} class="form-container" inline style={{ marginRight: 5 }} />
            </label>
            <input type="submit" value="Search" class="btn" style={{ backgroundColor: "white", color: "black", marginRight: 5 }} />
          </form>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavbarLoggedOut;
