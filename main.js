const resetButton = document.querySelector(".reset-btn");
const container = document.querySelector(".gameContainer");
const playerResult = document.querySelector(".player-result");
const tieResult = document.querySelector(".tie-result");
const computerResult = document.querySelector(".computer-result");
const winOptions = [
  [1, 2, 3],
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];
let Xcontainer = [];
let Ocontainer = [];

class Game {
  constructor() {
    this.startGame();
    container.addEventListener("click", this.checkAnswers.bind(this));
  }

  startGame() {
    let player = new Player();
    let computer = new Computer();
  }
  wonPopup(winner) {
    switch (winner) {
      case "player":
        this.addPoints(playerResult);
        console.log(`${winner} won`);
        break;
      case "computer":
        this.addPoints(computerResult);
        console.log(`${winner} won`);
        break;
      default:
        break;
    }
  }
  //   if (winner === "player") {
  //     return this.addPoints(playerResult);
  //   } else if (winner === "computer") {
  //     return this.addPoints(computerResult);
  //   } else if (winner === "draw") {
  //     return this.addPoints(tieResult);
  //   } else if (winner === "player" && winner === "computer") {
  //     return this.addPoints(playerResult);
  //   }
  // }

  addPoints(win) {
    return win.innerHTML++;
  }
  checkAnswers() {
    console.log("yeah");
    let listOfContainers = document.querySelectorAll(".container");
    let filteredList = [...listOfContainers].filter((cont) => !cont.innerText);
    let result = 0;
    winOptions.forEach((elem) => {
      if (elem.every((a) => Xcontainer.includes(a))) {
        this.wonPopup("player");
        return result++;
      }
    });
    if (result === 0) {
      winOptions.forEach((elem) => {
        if (elem.every((v) => Ocontainer.includes(v))) {
          this.wonPopup("computer");
        }
      });
    }
  }
}
class Player {
  constructor() {
    container.addEventListener("click", this.playerDecision);
  }
  playerDecision(e) {
    if (
      e.target.classList.contains("container") &&
      e.target.innerText === "" &&
      !e.target.classList.contains("checked")
    ) {
      e.target.innerText = "X";
      Xcontainer.push(Number(e.target.id));
    }
  }
}

class Computer {
  constructor() {
    container.addEventListener("click", this.computerDecision);
  }
  computerDecision(e) {
    console.log(e.target);
    if (
      !e.target.classList.contains("checked") &&
      e.target.classList.contains("container") &&
      e.target.innerHTML === "X"
    ) {
      // console.log(e.target.innerHTML);
      let listOfContainers = document.querySelectorAll(".container");

      let filteredList = [...listOfContainers].filter(
        (cont) => !cont.innerText && cont.id !== e.target.id
      );

      let selected =
        filteredList[Math.floor(Math.random() * filteredList.length)];
      if (selected) selected.innerText = "O";
      Ocontainer.push(Number(selected.id));
      e.target.classList.add("checked");
    }
  }
}

const game = new Game();
