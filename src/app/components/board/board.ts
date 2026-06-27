import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Minimax } from '../../services/minimax';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.scss'
})
export class Board {
  constructor(private minimax: Minimax) {}
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];


 play(row: number, col: number) {

  if (this.board[row][col] !== '') return;

  // Player
  this.board[row][col] = 'X';
this.board = [...this.board.map(r => [...r])];

  if (this.minimax.gameWon(this.board, 'X')) {
    alert('🎉 You Win!');
    this.restart();
    return;
  }

  if (this.minimax.boardIsFull(this.board)) {
    alert('Draw!');
    this.restart();
    return;
  }

  setTimeout(() => {

    const [r, c] = this.minimax.bestMove(this.board);

    if (r !== -1) {
      this.board[r][c] = 'O';
this.board = [...this.board.map(r => [...r])];
    }

    if (this.minimax.gameWon(this.board, 'O')) {
      alert('🤖 AI Wins!');
      this.restart();
    }

  }, 300);
}

  restart() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }
}