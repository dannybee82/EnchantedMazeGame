import { PiecesEntryPoints } from "./PiecesEntryPoints";

describe('class PiecesEntryPoints', () => {

    let testClass: PiecesEntryPoints = new PiecesEntryPoints();

    function swapToRight(arr: number[]) : number[] {
        let swapped: number[] = new Array(arr.length);

        for(let i = 0; i < arr.length; i++) {
            if(i + 1 < arr.length) {
                swapped[i + 1] = arr[i];
            } else {
                swapped[0] = arr[i];
            }
        }

        return swapped;
    }

    let testPiecesStartEntries: number[][] = [[1, 0, 1, 0],
                                              [1, 1, 1, 1],
                                              [1, 1, 1, 0],
                                              [1, 1, 0, 0]];

    it('test method: getEntries()', () => {
        for(let i = 0; i < testPiecesStartEntries.length; i++) {
            let testData: number[] = testPiecesStartEntries[i];

            for(let j = 0; j < testPiecesStartEntries[i].length; j++) {
                expect(testClass.getEntries(i, j)).toEqual(testData);
                testData = swapToRight(testData);
            }
        }
    });

});