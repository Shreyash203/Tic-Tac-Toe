import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Minimax {

  readonly WIN = 1000;
  readonly LOSS = -1000;
  readonly DRAW = 0;

  readonly AI = 'O';
  readonly PLAYER = 'X';
  readonly EMPTY = '';

  winningStates = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],

    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],

    [[0,0],[1,1],[2,2]],
    [[2,0],[1,1],[0,2]]
  ];

  // ---------------------------
  // Helpers
  // ---------------------------

  getLegalMoves(board: string[][]): number[][] {
    const moves: number[][] = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === this.EMPTY) {
          moves.push([i, j]);
        }
      }
    }

    return moves;
  }

  boardIsFull(board: string[][]): boolean {
    return this.getLegalMoves(board).length === 0;
  }

  gameWon(board: string[][], marker: string): boolean {

    for (const line of this.winningStates) {
      if (
        board[line[0][0]][line[0][1]] === marker &&
        board[line[1][0]][line[1][1]] === marker &&
        board[line[2][0]][line[2][1]] === marker
      ) {
        return true;
      }
    }

    return false;
  }

  evaluate(board: string[][]): number {

    if (this.gameWon(board, this.AI)) return this.WIN;
    if (this.gameWon(board, this.PLAYER)) return this.LOSS;

    return 0;
  }

  // ---------------------------
  // PURE MINIMAX (NO MUTATION)
  // ---------------------------

  minimax(
    board: string[][],
    depth: number,
    isMax: boolean,
    alpha: number,
    beta: number
  ): number {

    const score = this.evaluate(board);

    if (score === this.WIN) return score - depth;
    if (score === this.LOSS) return score + depth;

    if (this.boardIsFull(board)) return 0;

    if (isMax) {

      let best = -Infinity;

      for (const [i, j] of this.getLegalMoves(board)) {

        const newBoard = board.map(r => [...r]);
        newBoard[i][j] = this.AI;

        const value = this.minimax(newBoard, depth + 1, false, alpha, beta);

        best = Math.max(best, value);
        alpha = Math.max(alpha, best);

        if (beta <= alpha) break;
      }

      return best;

    } else {

      let best = Infinity;

      for (const [i, j] of this.getLegalMoves(board)) {

        const newBoard = board.map(r => [...r]);
        newBoard[i][j] = this.PLAYER;

        const value = this.minimax(newBoard, depth + 1, true, alpha, beta);

        best = Math.min(best, value);
        beta = Math.min(beta, best);

        if (beta <= alpha) break;
      }

      return best;
    }
  }

  // ---------------------------
  // BEST MOVE (SAFE)
  // ---------------------------

  bestMove(board: string[][]): number[] {

    let bestScore = -Infinity;
    let move: number[] = [-1, -1];

    for (const [i, j] of this.getLegalMoves(board)) {

      const newBoard = board.map(r => [...r]);
      newBoard[i][j] = this.AI;

      const score = this.minimax(
        newBoard,
        0,
        false,
        -Infinity,
        Infinity
      );

      if (score > bestScore) {
        bestScore = score;
        move = [i, j];
      }
    }

    return move;
  }
}