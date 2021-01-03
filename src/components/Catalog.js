import React from 'react';
import User from "./User"
import { Nav, Button, Navbar, Form, FormControl, Card, Container, Row, Col } from 'react-bootstrap'

class Catalog extends React.Component {

  render() {
    return (
      <div className="loginForm" style={{ alignItems: "center" }}>
        <br/>
        <h3 style={{ textAlign: "center" }}>Popular Movies</h3>
        <br/>
        <Container>
          <Row>
            <Col>        <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Dark_Phoenix_%28film%29.png/220px-Dark_Phoenix_%28film%29.png" height="350"/>
              <Card.Body>
                <Card.Title>X-Men: Dark Phoenix</Card.Title>
                <Card.Text>
                After a mishap, Jean Grey is struck by a powerful ray of energy which she absorbs into her body, turning her into an uncontrollable liability for the X-Men.
    </Card.Text>
              </Card.Body>
            </Card></Col>
            <Col>        <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://www.movienewsletters.net/photos/184127R1.jpg" height="350"/>
              <Card.Body>
                <Card.Title>Logan</Card.Title>
                <Card.Text>
                Logan comes out of retirement to escort a young mutant named Laura to a safe place. He meets with other mutants, who run from an evil corporation that has been experimenting with them, along the way.
    </Card.Text>
              </Card.Body>
            </Card></Col>
            <Col>        <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQkBgGCS74dHRSe3i0fkEsdaC1jJPU4px6Pyv9-TOipm13gOprI" height="350"/>
              <Card.Body>
                <Card.Title>Spider-Man: Homecoming</Card.Title>
                <Card.Text>
                Peter Parker tries to stop the Vulture from selling weapons made with advanced Chitauri technology while trying to balance his life as an ordinary high school student.
    </Card.Text>
              </Card.Body>
            </Card></Col>
          </Row>
          {/* <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row> */}
        </Container>
      </div>
    );
  }
}

export default Catalog;
