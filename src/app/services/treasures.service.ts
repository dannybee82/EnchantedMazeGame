import { Injectable } from '@angular/core';

//Models
import { MazeTreasures } from '../models/MazeTreasures';

//Methods.
import { PieceImages } from '../methods/PieceImages';
import { RandomNumbers } from '../shared_methods/RandomNumbers';
import { CommonArrayFunctions } from '../shared_methods/CommonArrayFunctions';

@Injectable({
  providedIn: 'root'
})
export class TreasuresService {

  private _mazeTreasures: MazeTreasures[] = [];

  private _pieceImages: PieceImages = new PieceImages();
  private _randomNumbers: RandomNumbers = new RandomNumbers();
  private _commonArrayFunctions: CommonArrayFunctions = new CommonArrayFunctions();

  constructor() { }

  generateTreasures(amountOfTreasures: number, amountOfPlayers: number) : void {
    let treasures: string[] = this._pieceImages.getTreasureImages();

    for(let i = 0; i < amountOfTreasures; i++) {
        let randomIndex: number = this._randomNumbers.generateRandomNumber(0, treasures.length);
        treasures = this._commonArrayFunctions.swap(treasures, i, randomIndex);
    }

    for(let i = 0; i < amountOfTreasures; i++) {
        if(i < amountOfPlayers) {
          //Add treasure for player.
          this._mazeTreasures.push( new MazeTreasures(i, treasures[i], i, false) );
        } else {
          this._mazeTreasures.push( new MazeTreasures(i, treasures[i], -1, false) );
        }  
    }
  }

  getMazeTreasures() : MazeTreasures[] {
    return this._mazeTreasures;
  }

  clearMazeTreasures() : void {
    this._mazeTreasures = [];
  }

  setTreasureFound(index: number) : void {
    this._mazeTreasures[index].isFound = true;
    this._mazeTreasures[index].targetPlayer = -1;
  } 

  amountOfTreasuresNotFound() : number {
    return this._mazeTreasures.filter(item => item.isFound == false && item.targetPlayer == -1).length;
  }

  getNextTreasure(player: number) : MazeTreasures | undefined {
    let notFound: MazeTreasures[] = this._mazeTreasures.filter(item => item.isFound == false && item.targetPlayer == -1);

    if(notFound.length > 0) {
      notFound[0].targetPlayer = player;
    }

    return (notFound.length > 0) ? notFound[0] : undefined;
  }

  getPlayersTreasures() : MazeTreasures[] {
    let arr: MazeTreasures[] = this._mazeTreasures.filter(item => item.targetPlayer > -1);
    return arr;
  }

}