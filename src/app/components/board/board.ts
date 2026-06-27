import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.scss'
})
export class Board {

  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  currentPlayer = 'X';

  play(row: number, col: number) {
  if (this.board[row][col] !== '') return;

  this.board[row][col] = this.currentPlayer;

  this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
}

  restart() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }
}