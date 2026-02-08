import { Board, Cell, Piece, PlayerId, BOARD_SIZE } from "./types";

export function topPiece(cell: Cell): Piece | null {
  return cell.length ? cell[cell.length - 1] : null;
}

export function canPlace(piece: Piece, cell: Cell): boolean {
  const top = topPiece(cell);
  return !top || piece.size > top.size;
}

export function getWinner(board: Board): PlayerId | null {
  const visible = board.map(row =>
    row.map(cell => topPiece(cell)?.playerId ?? null)
  );

  const lines: (PlayerId | null)[][] = [];

  // Rows
  for (let r = 0; r < BOARD_SIZE; r++) lines.push(visible[r]);

  // Columns
  for (let c = 0; c < BOARD_SIZE; c++) {
    lines.push([
      visible[0][c],
      visible[1][c],
      visible[2][c],
      visible[3][c]
    ]);
  }

  // Diagonals
  lines.push([
    visible[0][0],
    visible[1][1],
    visible[2][2],
    visible[3][3]
  ]);

  lines.push([
    visible[0][3],
    visible[1][2],
    visible[2][1],
    visible[3][0]
  ]);

  for (const line of lines) {
    if (line.every(v => v && v === line[0])) {
      return line[0];
    }
  }

  return null;
}
