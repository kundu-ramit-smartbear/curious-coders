const promptSync = require("prompt-sync")();

class Player {
  playername: string;
  playercode: string;
  constructor(playername: string, playercode: string) {
    this.playername = playername;
    this.playercode = playercode;
  }
}

class Board {
  grid: string[][];
  size: number;
  players: Player[];
  currentPlayerIndex: number;

  constructor(size: number, players: Player[]) {
    this.size = size;
    this.grid = this.createGrid(size);
    this.players = players;
    this.currentPlayerIndex = 0;
  }

  createGrid(size: number): string[][] {
    const grid: string[][] = [];
    for (let i = 0; i < size; i++) {
      const row: string[] = [];
      for (let j = 0; j < size; j++) {
        row.push(" ");
      }
      grid.push(row);
    }
    return grid;
  }

  makeMove(row: number, col: number): boolean {
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (this.grid[row][col] === " ") {
      this.grid[row][col] = currentPlayer.playercode;
      return true;
    }
    return false;
  }

  switchTurn(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  isFull(): boolean {
    for (let row of this.grid) {
      for (let cell of row) {
        if (cell === " ") {
          return false;
        }
      }
    }
    return true;
  }

  checkWinner(mark: string): boolean {
    for (let i = 0; i < this.size; i++) {
      if (this.grid[i].every((cell) => cell === mark)) {
        return true;
      }
      if (this.grid.every((row) => row[i] === mark)) {
        return true;
      }
    }
    let diagonal1 = true;
    let diagonal2 = true;
    for (let i = 0; i < this.size; i++) {
      if (this.grid[i][i] !== mark) {
        diagonal1 = false;
      }
      if (this.grid[i][this.size - 1 - i] !== mark) {
        diagonal2 = false;
      }
    }
    return diagonal1 || diagonal2;
  }

  gamestart(): void {
    while (true) {
      const currentPlayer = this.players[this.currentPlayerIndex];
      const move = promptSync(`${currentPlayer.playername}, enter your move: `);
      if (move) {
        const [row, col] = move.split(" ").map(Number);
        if (this.makeMove(row, col)) {
          if (this.checkWinner(currentPlayer.playercode)) {
            console.log(`${currentPlayer.playername}, you win!`);
            break;
          }
          if (this.isFull()) {
            console.log("draw!");
            break;
          }
          this.switchTurn();
        } else {
          console.log("Invalid move.");
        }
      }
    }
  }
}

function createPlayers(names: string[]): Player[] {
  const uniqueNames = new Set(names);
  if (uniqueNames.size !== names.length) {
    throw new Error("Player names must be unique.");
  }

  return names.map((name) => new Player(name, name));
}

try {
  const boardsize = parseInt(promptSync("Enter the size of the grid: "));
  const numPlayers = parseInt(promptSync("Enter the number of players: "));
  const playerNames: string[] = [];
  for (let i = 1; i <= numPlayers; i++) {
    const playerName = promptSync(`Enter player${i} name: `);
    playerNames.push(playerName);
  }
  const players = createPlayers(playerNames);
  const board = new Board(boardsize, players);
  board.gamestart();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("An error occurred");
  }
}
