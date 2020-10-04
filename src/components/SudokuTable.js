import React, { Component } from "react";
import {
  Button,
  Table,
  Dropdown,
  DropdownButton,
  Col,
  Row,
} from "react-bootstrap";

class SudokuTable extends Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
    this.solution = [
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
      myGrid: this.solution,
      questionGrid: this.props.questionGrid,
      theme: "",
    };
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.questionGrid !== prevProps.questionGrid) {
      this.setState({
        myGrid: this.solution,
        questionGrid: this.props.questionGrid,
      });
    }
  };

  handleChange = (e) => {
    let row = parseInt(e.target.id.substring(10, 11));
    let col = parseInt(e.target.id.substring(12, 13));
    let val = parseInt(e.target.value);
    console.log(`the value of id ${e.target.id} is ${e.target.value}`);
    this.solution[row][col] = val;
    let self = this;
    this.setState({
      myGrid: self.solution,
    });
  };

  checkGrid = () => {
    const { answerGrid } = this.props;
    const { myGrid } = this.state;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (myGrid[i][j] !== answerGrid[i][j]) {
          alert("Wrong answer");
          this.props.stopTimer();
          return;
        }
      }
    }
    alert("Correct answer");
    this.props.stopTimer();
    return;
  };

  changeTheme1 = () => {
    this.setState({
      theme: "linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)",
    });
  };

  changeTheme2 = () => {
    this.setState({
      theme: "linear-gradient(to right, #2c3e50, #fd746c)",
    });
  };

  changeTheme3 = () => {
    this.setState({
      theme: "linear-gradient(to right, #215f00, #e4e4d9)",
    });
  };

  render() {
    return (
      <React.Fragment>
        <Row style={{ marginTop: "10px" }}>
          <Col lg={2}>
            <DropdownButton id="dropdown-basic-button" title="Choose Theme">
              <Dropdown.Item href="#" onClick={this.changeTheme1}>
                Red Sunset
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={this.changeTheme2}>
                Dusk
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={this.changeTheme3}>
                Misty Meadow
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col lg={1}>
            <Button onClick={this.checkGrid}> Finish</Button>
          </Col>
          <Col lg={9}></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Table
              striped
              bordered
              hover
              responsive
              style={{ background: this.state.theme }}
            >
              <tbody>
                {this.state.questionGrid.map((row, index, arr) => (
                  <tr key={index}>
                    {row.map((val, ind, array) => (
                      <td key={ind}>
                        {val === 0 ? (
                          <input
                            type="number"
                            id={`cellcount-${index}-${ind}`}
                            style={{ border: "1px solid #df9bde" }}
                            onChange={this.handleChange}
                            min={1}
                            max={9}
                          />
                        ) : (
                          <input
                            type="number"
                            value={val}
                            id={`cellcount-${index}-${ind}`}
                            style={{ border: "1px solid bisque" }}
                            readOnly
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col></Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default SudokuTable;
