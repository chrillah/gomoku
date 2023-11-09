export type GameState = {
    id: string;
    minInRow: number;
    cols: number;
    rows: number;
    tiles: number[][];
    currentPlayer: number;
    gomokuWinner?: number | null;
};
