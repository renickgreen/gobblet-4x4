import { GameState, Move } from "./types";
import { canPlace, getWinner } from "./rules";

export function applyMove(state: GameState, move: Move): GameState {
  if (state.winner) {
    throw new Error("Game already finished");
  }

  const player = state.players[state.currentPlayer];
  let piece;

  if (move.type === "PLACE") {
    const stack = player.stacks[move.fromStack];
    if (!stack || stack.length === 0) throw new Error("Invalid stack");

    piece = stack[stack.length - 1];
    const cell = state.board[move.to.row][move.to.col];

    if (!canPlace(piece, cell)) throw new Error("Illegal placement");

    stack.pop();
    cell.push(piece);
  }

  if (move.type === "MOVE") {
    const fromCell = state.board[move.from.row][move.from.col];
    if (!fromCell.length) throw new Error("No piece to move");

    piece = fromCell[fromCell.length - 1];
    if (piece.playerId !== state.currentPlayer) throw new Error("Not your piece");

    const toCell = state.board[move.to.row][move.to.col];
    if (!canPlace(piece, toCell)) throw new Error("Illegal move");

    fromCell.pop();
    toCell.push(piece);
  }

  const nextPlayer = state.currentPlayer === "P1" ? "P2" : "P1";

  state.currentPlayer = nextPlayer;
  state.moveCount++;
  state.winner = getWinner(state.board);

  return state;
}
