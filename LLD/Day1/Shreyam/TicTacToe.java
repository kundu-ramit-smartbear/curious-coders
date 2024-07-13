import java.util.Deque;
import java.util.LinkedList;
import java.util.Scanner;

public class TicTacToe {
    public static void main(String[] args) {
      Game game = new Game();
      String result = game.startGame();
      if(result == "Tie")
        System.out.println("Game is " +  result);
      else
          System.out.println("Winner is " + result);
    }

    //----------------------------- CELL ----------------------------
    public class Cell {
      CellType cell;
      Cell(CellType cell) {
        this.cell = cell;
      }        
    }
    
    public enum CellType {X, O}

    //----------------------------- PLAYER ----------------------------
    public class Player{
      String name;
      Cell cell;
      
      Player(String name, Cell cell) {
        this.name = name;
        this.cell = cell;
      }
      public String getName() {
        return name;
      }

      public void setName(String name) {
        this.name = name;
      }

      public void setCell(Cell cell) {
        this.cell = cell;
      }

      public Cell getCell() {
        return cell;
      }
    }

    //----------------------------- BOARD ----------------------------
    public class Board{
      public int size;
      public Cell[][] board;
      
      Board(int size) {
        this.size = size;
        board = new Cell[size][size];
      }

      boolean cellsAvailable() {
        for(int i=0 ; i<size ; i++) {
          for(int j=0 ; j<size ; j++) {
            if(board[i][j] == null) {
              return true;
            }
          }
        }
        return false;
      }

      boolean refreshBoard(int x, int y, Cell cell) {
        if(board[x][y] != null)
          return false;
        board[x][y] = cell;
        return true;
      }

      public void printBoard() {
        for(int i=0 ; i<size ; i++) {
          for(int j=0 ; j<size ; j++) {
            if(board[i][j] != null)
              System.out.println(board[i][j].cell.name() + " ");
            else
              System.out.println(" ");
            System.out.println(" | ");
          }
          System.out.println();
        }
      }

    }

    //----------------------------- GAME ----------------------------
    public class Game {
      Deque<Player> player;
      Board board;
      Game() {
        player = new LinkedList<Player>();
        
        Cell cellX = new Cell(CellType.X); 
        player.add(new Player("Player1", cellX));
        Cell cellO = new Cell(CellType.O); 
        player.add(new Player("Player2", cellO));

        board = new Board(3);
      }

      public String startGame() {
        boolean isWinnable = true;
        while(isWinnable) {
          Player activePlayer = player.removeFirst();
          board.printBoard();
          if(!board.cellsAvailable()) {
            isWinnable = false;
            continue;
          }

          System.out.println("Player " + activePlayer.getName() + "Enter cell");
          Scanner input = new Scanner(System.in);
          String s = input.nextLine();
          String[] values = s.split(",");
          input.close();          
          int row = Integer.valueOf(values[0]);
          int col = Integer.valueOf(values[1]);

          if(!board.refreshBoard(row, col, activePlayer.cell)) {
            System.out.println("Please enter a valid cell");
            player.addFirst(activePlayer);
            continue;
          }
          player.addLast(activePlayer);

          if(playerWon(row, col, activePlayer.getCell())) {
            return activePlayer.name;
          }
        }
        return "Match Tie";
      }

      private boolean playerWon(int row, int col, Cell cell) {
        boolean rowStrike = false;
        boolean colStrike = false;
        boolean diagonalStrike = false;
        boolean revDiagonalStrike = false;

        for(int i = 0;i<board.size;i++)
          if(board.board[row][i] == null || board.board[row][i] != cell)
              rowStrike = false;


        for(int i = 0;i<board.size;i++)
            if(board.board[i][col] == null || board.board[i][col] != cell)
                colStrike = false;


        for(int i = 0,j=0;i<board.size;i++,j++)
            if(board.board[i][j] == null || board.board[i][j] != cell)
                diagonalStrike = false;


        for(int i = 0,j= board.size-1;i< board.size;i++,j--)
            if(board.board[i][j] == null || board.board[i][j] != cell)
                revDiagonalStrike = false;
        
        return rowStrike || colStrike || diagonalStrike || revDiagonalStrike;
      }
    }
  }