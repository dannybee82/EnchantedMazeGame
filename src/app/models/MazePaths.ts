export class MazePaths {

    constructor(public row: number,
                public column: number,
                public total?: number,
                public isRow?: boolean,
                public insertAt?: number,
                public orientations?: number,
                public isTopOrLeft?: boolean) {}

}