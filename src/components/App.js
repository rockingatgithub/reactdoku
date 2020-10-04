import React, { Component } from "react";
import ms from "pretty-ms";
import {
  Col,
  Container,
  Row,
  Navbar,
  Table,
  Dropdown,
  DropdownButton,
  Card,
  Button,
} from "react-bootstrap";
import SudokuTable from "./SudokuTable";

class App extends Component {
  constructor(props) {
    super(props);
    const easy = [
      [3, 1, 6, 5, 7, 8, 4, 9, 2],
      [5, 2, 9, 1, 3, 4, 7, 6, 8],
      [4, 8, 7, 6, 2, 9, 5, 3, 1],
      [2, 6, 3, 4, 1, 5, 9, 8, 7],
      [9, 7, 4, 8, 6, 3, 1, 2, 5],
      [8, 5, 1, 7, 9, 2, 6, 4, 3],
      [1, 3, 8, 9, 4, 7, 2, 5, 6],
      [6, 9, 2, 3, 5, 1, 8, 7, 4],
      [7, 4, 5, 2, 8, 6, 3, 1, 9],
    ];
    let question = [
      [3, 0, 6, 5, 0, 8, 4, 0, 0],
      [5, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 7, 0, 0, 0, 0, 3, 1],
      [0, 0, 3, 0, 1, 0, 0, 8, 0],
      [9, 0, 0, 8, 6, 3, 0, 0, 5],
      [0, 5, 0, 0, 9, 0, 6, 0, 0],
      [1, 3, 0, 0, 0, 0, 2, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 4],
      [0, 0, 5, 2, 0, 6, 3, 0, 0],
    ];
    this.state = {
      answerGrid: easy,
      questionGrid: question,
      time: 0,
      start: 0,
    };
  }

  handleEasy = () => {
    const { easy } = this.state;
    this.setState({
      answerGrid: easy,
      time: 0,
      start: 0,
    });
  };

  startGame = () => {
    this.setState({
      time: this.state.time,
      start: Date.now(),
    });
    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.state.start,
      });
    }, 1);
  };

  stopGame = () => {
    this.setState({
      time: 0,
      start: 0,
    });
    clearInterval(this.timer);

    return;
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Sudoku</Navbar.Brand>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col>
              <DropdownButton id="dropdown-basic-button" title="Select Level">
                <Dropdown.Item href="#" onClick={this.handleEasy}>
                  Easy
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={this.handleMedium}>
                  Medium
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={this.handleHard}>
                  Hard
                </Dropdown.Item>
              </DropdownButton>
              <Card>
                <Card.Body>Timer: {ms(this.state.time)}</Card.Body>
              </Card>
              <Button onClick={this.startGame}>Start</Button>
              <Table striped bordered hover responsive>
                <SudokuTable
                  questionGrid={this.state.questionGrid}
                  answerGrid={this.state.answerGrid}
                  stopTimer={this.stopGame}
                />
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
