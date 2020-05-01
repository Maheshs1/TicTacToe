import React from "react";
import SquareBox from "./SquareBox/SquareBox";
import "./Game.css";

class Game extends React.Component {
  state = {
    gameState: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    isYourTurn: true,
    isWon: null,
  };

  isWon = () => {
    setTimeout(() => {
      this.setState({
        gameState: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        isYourTurn: true,
        isWon: null,
      });
    }, 3000);
    // let time = 5;
    // const interval = setInterval(() => {
    //   if (time === 1) setInterval(interval);
    //   const isWon = `${this.state.isWon}'s Won. New Game Will Start in ${time}`;
    //   time--;
    //   this.setState({
    //     isWon: isWon,
    //   });
    // }, 1000);
  };

  checkWinner = () => {
    let isWin = true;
    const newGameState = [...this.state.gameState];
    for (let i = 0; i < newGameState.length; i++) {
      isWin = true;
      for (let j = 0; j < newGameState.length; j++) {
        // console.log(newGameState[i][j]);

        if (
          newGameState[i][j] === null ||
          newGameState[i][0] !== newGameState[i][j]
        ) {
          isWin = false;
          break;
        }
      }
      if (isWin) {
        this.setState({
          isWon: newGameState[i][0],
        });
        this.isWon();
        return;
      }
      //   } console.log("WON", newGameState[i][0]);
    }
    // isWin = true;
    for (let i = 0; i < newGameState.length; i++) {
      isWin = true;
      for (let j = 0; j < newGameState.length; j++) {
        if (
          newGameState[j][i] === null ||
          newGameState[0][i] !== newGameState[j][i]
        ) {
          isWin = false;
          break;
        }
      }
      if (isWin) {
        this.setState({
          isWon: newGameState[0][i],
        });
        this.isWon();

        return;
      }
    }

    if (
      newGameState[0][0] !== null &&
      newGameState[0][0] === newGameState[1][1] &&
      newGameState[1][1] === newGameState[2][2]
    ) {
      this.setState({
        isWon: newGameState[0][0],
      });
      this.isWon();

      return;
    }

    if (
      newGameState[0][2] !== null &&
      newGameState[0][2] === newGameState[1][1] &&
      newGameState[1][1] === newGameState[2][0]
    ) {
      this.setState({
        isWon: newGameState[0][2],
      });
      this.isWon();

      return;
    }
  };

  handleSquareClick = (boxRowNumber, boxColNumber) => {
    if (this.state.isWon) return;
    const newGameState = [...this.state.gameState];
    if (newGameState[boxRowNumber][boxColNumber] !== null) return;

    const turn = this.state.isYourTurn ? "X" : "O";
    newGameState[boxRowNumber][boxColNumber] = turn;
    this.setState((prevState) => {
      return {
        isYourTurn: !prevState.isYourTurn,
        gameState: newGameState,
      };
    });
  };

  addSquare = (boxRowNumber, boxColNumber) => {
    return (
      <SquareBox
        boxState={this.state.gameState[boxRowNumber][boxColNumber]}
        onClick={() => {
          this.handleSquareClick(boxRowNumber, boxColNumber);
          this.checkWinner();
        }}
      />
    );
  };

  render() {
    return (
      <div>
        {this.state.isWon ? (
          <span>{this.state.isWon}'s Won</span>
        ) : (
          <p>{this.state.isYourTurn ? "X" : "O"}'s turn</p>
        )}

        <div className="row">
          {this.addSquare(0, 0)}
          {this.addSquare(0, 1)}
          {this.addSquare(0, 2)}
        </div>
        <div className="row">
          {this.addSquare(1, 0)}
          {this.addSquare(1, 1)}
          {this.addSquare(1, 2)}
        </div>
        <div className="row">
          {this.addSquare(2, 0)}
          {this.addSquare(2, 1)}
          {this.addSquare(2, 2)}
        </div>
      </div>
    );
  }
}

export default Game;
