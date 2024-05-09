export interface MazePiece {
    row: number,
    column: number,
    pieceImage: string,
    pieceNumber: number,
    orientation: number,
    isFixed: boolean,
    player: number,
    hasTreasure: boolean,
    treasureForPlayer: number,
    treasureImage: string
}