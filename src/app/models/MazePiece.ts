export class MazePiece {

    constructor(public row: number,
                public column: number,
                public pieceImage: string,
                public pieceNumber: number,
                public orientation: number,
                public isFixed: boolean,
                public player: number,
                public hasTreasure: boolean,
                public treasureForPlayer: number,
                public treasureIndex: number,
                public treasureImage?: string) {}

}