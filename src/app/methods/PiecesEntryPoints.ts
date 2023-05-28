import { Misc } from "./Misc";

export class PiecesEntryPoints extends Misc {

    //Direction Clockwise: North, East, South, West
    private _piece001: number[][] = [[1, 0, 1, 0],
                                     [0, 1, 0, 1],
                                     [1, 0, 1, 0],
                                     [0, 1, 0, 1]];

    private _piece002: number[][] = [[1, 1, 1, 1],
                                     [1, 1, 1, 1],
                                     [1, 1, 1, 1],
                                     [1, 1, 1, 1]];

    private _piece003: number[][] = [[1, 1, 1, 0],
                                     [0, 1, 1, 1],
                                     [1, 0, 1, 1],
                                     [1, 1, 0, 1]];

    private _piece004: number[][] = [[1, 1, 0, 0],
                                     [0, 1, 1, 0],
                                     [0, 0, 1, 1],
                                     [1, 0, 0, 1]];

    getEntries(pieceNumber: number, orientation: number) : number[] | undefined {
        switch(pieceNumber) {
            case 0:
                return this._piece001[orientation];
            case 1:
                return this._piece002[orientation];
            case 2:
                return this._piece003[orientation];
            case 3:
                return this._piece004[orientation];
        }

        return undefined;
    }

}