
enum PlayerSign {
    X, O, NAN
}

class Cell {
    PlayerSign val;

    Cell() {
        this.val = PlayerSign.NAN;
    }

    @Override
    public String toString() {
        return val == PlayerSign.NAN ? "-" : val.toString();
    }
}

class Board {
    private Cell[][] board;
    private boolean isGameOver;
    private int size;

    Board(int n) {
        this.size = n;
        this.board = new Cell[n][n];
        this.isGameOver = false;
        initializeBoard();
    }

    private void initializeBoard() {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                board[i][j] = new Cell();
            }
        }
    }

    void move(Player p, int x, int y) {
        if (isGameOver) {
            System.out.println("The game is over. No more moves allowed.");
            return;
        }

        if (x < 0 || x >= size || y < 0 || y >= size || board[x][y].val != PlayerSign.NAN) {
            System.out.println("Move not permitted");
            return;
        }

        board[x][y].val = p.psign;
        printBoard();

        if (isGameOver(x, y)) {
            isGameOver = true;
            System.out.println("Player " + p.psign + " wins!");
        } else if (isBoardFull()) {
            isGameOver = true;
            System.out.println("The game is a draw!");
        }
    }

    private boolean isGameOver(int x, int y) {
        PlayerSign sign = board[x][y].val;

        // Row
        boolean win = true;
        for (int i = 0; i < size; i++) {
            if (board[x][i].val != sign) {
                win = false;
                break;
            }
        }
        if (win) return true;

        // Column
        win = true;
        for (int i = 0; i < size; i++) {
            if (board[i][y].val != sign) {
                win = false;
                break;
            }
        }
        if (win) return true;

        // Diagonal
        if (x == y) {
            win = true;
            for (int i = 0; i < size; i++) {
                if (board[i][i].val != sign) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        if (x + y == size - 1) {
            win = true;
            for (int i = 0; i < size; i++) {
                if (board[i][size - 1 - i].val != sign) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        return false;
    }

    private boolean isBoardFull() {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (board[i][j].val == PlayerSign.NAN) {
                    return false;
                }
            }
        }
        return true;
    }

    private void printBoard() {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
    }
}

class Player {
    PlayerSign psign;

    Player(PlayerSign psign) {
        this.psign = psign;
    }

    void move(Board b, int x, int y) {
        b.move(this, x, y);
    }
}

public class TicTacToe {
    public static void main(String[] args) {
        int n = 3; 
        Board board = new Board(n);

        Player p1 = new Player(PlayerSign.X);
        Player p2 = new Player(PlayerSign.O);

        p1.move(board, 0, 0);
        p2.move(board, 0, 1);
        p1.move(board, 1, 0);
        p2.move(board, 1, 1);
        p1.move(board, 2, 0);
        p2.move(board, 2, 2);
    }
}

