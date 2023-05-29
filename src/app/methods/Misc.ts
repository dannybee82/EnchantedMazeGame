import { RandomNumbers } from "../shared_methods/RandomNumbers";
import { CommonArrayFunctions } from "../shared_methods/CommonArrayFunctions";

export class Misc {

    /**
     * Classes
     * 
     */

    public randomNumbers: RandomNumbers = new RandomNumbers();
    public commonArrayFunctions: CommonArrayFunctions = new CommonArrayFunctions();    

    /**
     * Variables.
     * 
     */

    public orientationNames: string[] = ["North", "East", "South", "West"];

    public minimumAmountOfPlayers: number = 1;
    public maximumAmountOfPlayers: number = 4;

    public minimumAmountOfTreasures: number = 1;

    public rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    public columns: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    public fixedRowAndColumnIndexes: number[] = [1, 3, 5, 7];

    //Difficulties: 1 = Easy, 2 = Normal, 3 = Hard.
    public minimumDifficulty: number = 1;
    public maximumDifficulty: number = 3;


}