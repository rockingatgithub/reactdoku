import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
let solution = [
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

class SudokuTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myGrid: solution,
    };
  }

  handleChange = (e) => {
    let row = parseInt(e.target.id.substring(10, 11));
    let col = parseInt(e.target.id.substring(12, 13));
    let val = parseInt(e.target.value);
    console.log(`the value of id ${e.target.id} is ${e.target.value}`);
    solution[row][col] = val;
    this.setState({
      myGrid: solution,
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

  render() {
    return (
      <React.Fragment>
        <tbody>
          {this.props.questionGrid.map((row, index, arr) => (
            <tr>
              {row.map((val, ind, array) => (
                <td>
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
        <Button onClick={this.checkGrid}> Finish</Button>
      </React.Fragment>
    );
  }
}

export default SudokuTable;
