enum PlayerSign {
    X = "X",
    O = "O",
    A = "A",
    B = "B",
    C = "C",
    Nan = " "
}

class Cell {
    value: PlayerSign;

    constructor() {
        this.value = PlayerSign.Nan;
    }
}

class Board {
    board: Cell[][];
    isGameOver: boolean;
    n: number;
    moveCount: number;

    constructor(n: number) {
        this.n = n;
        this.board = [];
        this.isGameOver = false;
        this.moveCount = 0;

        for (let i = 0; i < n; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < n; j++) {
                row.push(new Cell());
            }
            this.board.push(row);
        }
    }

    move(player: Player, x: number, y: number): void {
        if (this.isGameOver) {
            console.log("Game is already over.");
            return;
        }
        if (this.board[x][y].value !== PlayerSign.Nan) {
            console.log("Can't move outside the board");
            return;
        }

        this.board[x][y].value = player.psign;
        console.log(`Player ${player.psign} moved on ${x}, ${y}`);
        this.moveCount++;

        if (this.isGameOverCheck(x, y, player.psign)) {
            console.log(`Player ${player.psign} wins`);
            this.isGameOver = true;
            return;
        }

        if (this.isDraw()) {
            console.log("Game is a draw.");
            this.isGameOver = true;
            return;
        }
    }

    isGameOverCheck(x: number, y: number, psign: PlayerSign): boolean {
        let rowWin = true;
        let colWin = true;
        let diagWin1 = true;
        let diagWin2 = true;

        for (let i = 0; i < this.n; i++) {
            if (this.board[x][i].value !== psign) {
                rowWin = false;
            }
            if (this.board[i][y].value !== psign) {
                colWin = false;
            }
            if (this.board[i][i].value !== psign) {
                diagWin1 = false;
            }
            if (this.board[i][this.n - i - 1].value !== psign) {
                diagWin2 = false;
            }
        }

        return rowWin || colWin || diagWin1 || diagWin2;
    }

    isDraw(): boolean {
        return this.moveCount === this.n * this.n;
    }

}

class Player {
    psign: PlayerSign;

    constructor(psign: PlayerSign) {
        this.psign = psign;
    }
}

function main() {
    const n = 5; // Board size
    const board = new Board(n);

    const players = [
        new Player(PlayerSign.X),
        new Player(PlayerSign.O),
        new Player(PlayerSign.A),
        new Player(PlayerSign.B),
        new Player(PlayerSign.C)
    ];

    board.move(players[0], 0, 0);
    board.move(players[1], 0, 1);
    board.move(players[2], 1, 1);
    board.move(players[0], 1, 0);
    board.move(players[1], 2, 0);
    board.move(players[2], 3, 0);
}
