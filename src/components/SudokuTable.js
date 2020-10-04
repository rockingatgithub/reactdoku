import React, { Component } from "react";
import { Button, Table, Dropdown, DropdownButton } from "react-bootstrap";

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
                        ref={this.inputBox}
                      />
                    ) : (
                      <input
                        type="number"
                        value={val}
                        id={`cellcount-${index}-${ind}`}
                        style={{ border: "1px solid bisque" }}
                        ref={this.inputBox}
                        readOnly
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={this.checkGrid}> Finish</Button>
      </React.Fragment>
    );
  }
}

export default SudokuTable;
