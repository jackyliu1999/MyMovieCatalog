import React from 'react';
import User from "./User"
import { Nav, Button, Navbar, Form, FormControl } from 'react-bootstrap';
import { observer } from "mobx-react";
import { ButtonGroup, Card, CardHeader, CardBody, CardTitle, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Label, FormGroup, Input, Table, Row, Col, UncontrolledTooltip } from "reactstrap";
import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut";

var moviesArray = [];

class DisplayOtherUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: User.username,
            password: "",
            buttonDisabled: false,
            searchResults: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMoviesLoggedIn = this.showMoviesLoggedIn.bind(this);
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

    async componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const term = query.get("name");
        document.getElementById("demo").append(term + "'s Profile");
        try {
            let res = await fetch("./isLoggedIn", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            let result = await res.json();
            if (result && result.success) {
                User.loading = false;
                User.isLoggedIn = true;
                User.username = result.username;
            }
            else {
                User.loading = false;
                User.isLoggedIn = false;
            }
        }
        catch (e) {
            User.loading = false;
            User.isLoggedIn = false;
        }
        try {
            let res = await fetch("/searchUser", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    term: term
                })
            });
            let result = await res.json();
            moviesArray = result.array1
            this.setState({ searchResults: result.array1 });
        }
        catch (e) {
            console.log(e)
        }
    }

    showMovies(object, index) {
        return (
            <tr key={index}>
                <td><img src={object.imageURL} width="100" height="150" /></td>
                <td style={{ textAlign: "center" }}>{object.movie}</td>
                
            </tr>
        )
    }

    showMoviesLoggedIn(object, index) {
        return (
            <tr key={index}>
                <td><img src={object.imageURL} width="100" height="150" /></td>
                <td>{object.movie}</td>
            </tr>
        )
    }


    async doLogout() {
        try {
            let res = await fetch("./logout", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            let result = await res.json();
            if (result && result.success) {
                User.isLoggedIn = false;
                User.username = "";
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        if (User.loading) {
            return (
                <div className="app">
                    <div className="container">
                        Loading..
                  </div>
                </div>
            );
        }
        else {
            if (User.isLoggedIn) {
                return (
                    <div className="loggedInUserDisplay">
                        <NavbarLoggedIn/>
                        <br />
                        <Row className="justify-content-md-center">
                            <Col lg="6" md="12">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4" style={{ textAlign: "center" }}><p id="demo" style={{ color: "black", textAlign: "center" }}></p></CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table className="tablesorter">
                                            <thead className="text-primary">
                                                <tr>
                                                    <th></th>
                                                    <th>Movie Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.searchResults.map(this.showMoviesLoggedIn)}
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                );
            }
            return (
                <div className="loggedInUserDisplay">
                    <NavbarLoggedOut/>
                    <Row className="justify-content-md-center">
                        <Col lg="6" md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4" style={{ textAlign: "center" }}><p id="demo" style={{ color: "black", textAlign: "center" }}></p></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table className="tablesorter">
                                        <thead className="text-primary">
                                            <tr>
                                                <th></th>
                                                <th style={{ textAlign: "center" }}>Movie Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.searchResults.map(this.showMovies)}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default DisplayOtherUsers