import { None, Some, type Option } from './option';
import { Err, Ok, type Result } from './result';

export type GameState =
  | { type: 'PlayerTurn'; player: Player; previous?: Cell }
  | { type: 'GameIsOver'; outcome: Outcome };

export type Player = 'Player1' | 'Player2';

export type Outcome =
  | { type: 'PlayerOneWon'; cells: Cell[] }
  | { type: 'PlayerTwoWon'; cells: Cell[] }
  | { type: 'Tie' };

export type Cell = { type: 'Filled'; player: Player } | { type: 'Empty' };

export type GameError = 'GameIsOver' | 'ColumnOutOfBounds' | 'ColumnIsFull';

export class Game {
  private board_: Cell[][];
  private state_: GameState;

  public get board(): Cell[][] {
    return this.board_;
  }
  public get state(): GameState {
    return this.state_;
  }

  constructor() {
    this.state_ = { type: 'PlayerTurn', player: 'Player1' };
    this.board_ = [
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ]
    ];
  }

  public restart(): void {
    this.state_ = { type: 'PlayerTurn', player: 'Player1' };
    this.board_ = [
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ],
      [
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' },
        { type: 'Empty' }
      ]
    ];
  }

  public play(colnum: number): Result<void, GameError> {
    if (this.state_.type === 'GameIsOver') {
      return Err('GameIsOver');
    }

    if (colnum < 0 || this.width <= colnum) {
      return Err('ColumnOutOfBounds');
    }

    const topmostCell = this.board_.at(0)!.at(colnum);
    if (topmostCell!.type !== 'Empty') {
      return Err('ColumnIsFull');
    }

    for (let i = this.height - 1; 0 <= i; --i) {
      const cell = this.board_.at(i)!.at(colnum)!;
      if (cell.type === 'Empty') {
        if (this.state_.player === 'Player1') {
          this.board_[i][colnum] = { type: 'Filled', player: 'Player1' };
          this.state_ = { type: 'PlayerTurn', player: 'Player2', previous: this.board_[i][colnum] };
        } else {
          this.board_[i][colnum] = { type: 'Filled', player: 'Player2' };
          this.state_ = { type: 'PlayerTurn', player: 'Player1', previous: this.board_[i][colnum] };
        }
        break;
      }
    }

    let winner = this.checkWinner;
    if (winner.is_present) {
      this.state_ = { type: 'GameIsOver', outcome: winner.value };
    }

    return Ok(void 0);
  }

  private get checkWinner(): Option<Outcome> {
    /* Horizontal lines */
    for (let row = 0; row < this.height; ++row) {
      for (let col = 0; col < this.width - 3; ++col) {
        const cell1 = this.board_[row][col + 0];
        const cell2 = this.board_[row][col + 1];
        const cell3 = this.board_[row][col + 2];
        const cell4 = this.board_[row][col + 3];

        if (
          cell1.type !== 'Empty' &&
          cell2.type !== 'Empty' &&
          cell3.type !== 'Empty' &&
          cell4.type !== 'Empty' &&
          cell1.player === cell2.player &&
          cell1.player === cell3.player &&
          cell1.player === cell4.player
        ) {
          return Some(
            cell1.player === 'Player1'
              ? { type: 'PlayerOneWon', cells: [cell1, cell2, cell3, cell4] }
              : { type: 'PlayerTwoWon', cells: [cell1, cell2, cell3, cell4] }
          );
        }
      }
    }

    /* Vertical lines */
    for (let row = 0; row < this.height - 3; ++row) {
      for (let col = 0; col < this.width; ++col) {
        const cell1 = this.board_[row + 0][col];
        const cell2 = this.board_[row + 1][col];
        const cell3 = this.board_[row + 2][col];
        const cell4 = this.board_[row + 3][col];

        if (
          cell1.type !== 'Empty' &&
          cell2.type !== 'Empty' &&
          cell3.type !== 'Empty' &&
          cell4.type !== 'Empty' &&
          cell1.player === cell2.player &&
          cell1.player === cell3.player &&
          cell1.player === cell4.player
        ) {
          return Some(
            cell1.player === 'Player1'
              ? { type: 'PlayerOneWon', cells: [cell1, cell2, cell3, cell4] }
              : { type: 'PlayerTwoWon', cells: [cell1, cell2, cell3, cell4] }
          );
        }
      }
    }

    /* Diagonals: top-left -> bottom-right */
    for (let row = 0; row < this.height - 3; ++row) {
      for (let col = 0; col < this.width - 3; ++col) {
        const cell1 = this.board_[row + 0][col + 0];
        const cell2 = this.board_[row + 1][col + 1];
        const cell3 = this.board_[row + 2][col + 2];
        const cell4 = this.board_[row + 3][col + 3];

        if (
          cell1.type !== 'Empty' &&
          cell2.type !== 'Empty' &&
          cell3.type !== 'Empty' &&
          cell4.type !== 'Empty' &&
          cell1.player === cell2.player &&
          cell1.player === cell3.player &&
          cell1.player === cell4.player
        ) {
          return Some(
            cell1.player === 'Player1'
              ? { type: 'PlayerOneWon', cells: [cell1, cell2, cell3, cell4] }
              : { type: 'PlayerTwoWon', cells: [cell1, cell2, cell3, cell4] }
          );
        }
      }
    }

    /* Diagonals: top-right -> bottom-left */
    for (let row = 0; row < this.height - 3; ++row) {
      for (let col = 3; col < this.width; ++col) {
        const cell1 = this.board_[row + 0][col - 0];
        const cell2 = this.board_[row + 1][col - 1];
        const cell3 = this.board_[row + 2][col - 2];
        const cell4 = this.board_[row + 3][col - 3];

        if (
          cell1.type !== 'Empty' &&
          cell2.type !== 'Empty' &&
          cell3.type !== 'Empty' &&
          cell4.type !== 'Empty' &&
          cell1.player === cell2.player &&
          cell1.player === cell3.player &&
          cell1.player === cell4.player
        ) {
          return Some(
            cell1.player === 'Player1'
              ? { type: 'PlayerOneWon', cells: [cell1, cell2, cell3, cell4] }
              : { type: 'PlayerTwoWon', cells: [cell1, cell2, cell3, cell4] }
          );
        }
      }
    }

    let isTie = this.board_.every((row) => row.every((cell) => cell.type !== 'Empty'));
    if (isTie) {
      return Some({ type: 'Tie' });
    }
    return None();
  }

  public get height(): number {
    return this.board_.length;
  }

  public get width(): number {
    return this.board_.at(0)!.length;
  }
}
