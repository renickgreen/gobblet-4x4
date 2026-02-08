export const BOARD_SIZE = 4;
export const MAX_STACKS = 3;
export const SIZES = [1, 2, 3] as const;

export type PlayerId = "P1" | "P2";

export type Piece = {
  playerId: PlayerId;
  size: number;
};

export type Cell = Piece[];
export type Board = Cell[][];

export type Stack = Piece[];

export type PlayerState = {
  id: PlayerId;
  stacks: Stack[];
};

export type GameState = {
  board: Board;
  players: Record<PlayerId, PlayerState>;
  currentPlayer: PlayerId;
  winner: PlayerId | null;
  moveCount: number;
};

export type PlaceMove = {
  type: "PLACE";
  fromStack: number;
  to: { row: number; col: number };
};

export type MoveBoardPiece = {
  type: "MOVE";
  from: { row: number; col: number };
  to: { row: number; col: number };
};

export type Move = PlaceMove | MoveBoardPiece;
