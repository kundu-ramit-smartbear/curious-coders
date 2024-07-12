class Board {
    private readonly grid: PlayerSymbol[][];
    private readonly n: number;
    private gameOver: boolean;
    private winner: PlayerSymbol | null;

    constructor(n: number) {
        this.n = n;
        this.grid = Array.from({ length: n }, () => Array<PlayerSymbol>(n).fill(null));
        this.gameOver = false;
        this.winner = null;
    }

    public Add(p: Player, x: number, y: number): AddResponse {
        if (this.gameOver) {
            return {
                added: false,
                reason: `Game is over. Player ${this.winner} has won.`
            };
        }

        if (!(x >= 0 && x < this.n && y >= 0 && y < this.n))
            return {
                added: false,
                reason: "Out of bounds"
            };

        if (this.grid[x][y] != null) {
            return {
                added: false,
                reason: "Already filled"
            };
        }

        this.grid[x][y] = p.symbol;
        this.printBoard();

        if (this.IsGameOver(p, x, y)) {
            this.gameOver = true;
            this.winner = p.symbol;
            return {
                added: true,
                gameOver: true,
                winner: p.symbol
            };
        } else {
            return {
                added: true
            };
        }
    }

    private IsGameOver(p: Player, x: number, y: number): boolean {
        const symbol = p.symbol;

        // Check row
        if (this.grid[x].every(cell => cell === symbol)) return true;

        // Check column
        if (this.grid.every(row => row[y] === symbol)) return true;

        // Check main diagonal
        if (x === y && this.grid.every((row, idx) => row[idx] === symbol)) return true;

        // Check anti-diagonal
        if (x + y === this.n - 1 && this.grid.every((row, idx) => row[this.n - 1 - idx] === symbol)) return true;

        return false;
    }

    private printBoard() {
        for (let row of this.grid) {
            console.log(row.map(cell => (cell ? cell : ".")).join(" "));
        }
        console.log("\n");
    }
}

interface AddResponse {
    added: boolean;
    reason?: string;
    gameOver?: boolean;
    winner?: PlayerSymbol;
}

class Player {
    public readonly symbol: PlayerSymbol;
    constructor(playerSymbol: PlayerSymbol) {
        this.symbol = playerSymbol;
    }
}

type PlayerSymbol = "X" | "O" | null

class Game {
    public Execute() {
        const board = new Board(3);
        const player1 = new Player("X");
        const player2 = new Player("O");

        let response;

        response = board.Add(player1, 0, 0);
        console.log(response);

        response = board.Add(player2, 0, 1);
        console.log(response);

        response = board.Add(player1, 1, 1);
        console.log(response);

        response = board.Add(player2, 0, 2);
        console.log(response);

        response = board.Add(player1, 2, 2);
        console.log(response);

        response = board.Add(player2, 1, 0); // Attempting move after game over
        console.log(response);
    }
}

const game = new Game();
game.Execute();