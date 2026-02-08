import { BOARD_SIZE, MAX_STACKS, SIZES, GameState, PlayerId, Stack } from "./types";

function makeStacks(playerId: PlayerId): Stack[] {
  return Array.from({ length: MAX_STACKS }, () =>
    SIZES.map(size => ({ playerId, size }))
  );
}

export function createInitialState(): GameState {
  return {
    board: Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => [])
    ),
    players: {
      P1: { id: "P1", stacks: makeStacks("P1") },
      P2: { id: "P2", stacks: makeStacks("P2") }
    },
    currentPlayer: "P1",
    winner: null,
    moveCount: 0
  };
}
