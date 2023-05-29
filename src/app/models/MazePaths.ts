export class MazePaths {

    constructor(public row: number,
                public column: number,
                public total?: number,
                public isInsertAxisY?: boolean,
                public insertAt?: number,
                public orientations?: number,
                public isTopOrLeft?: boolean) {}

}