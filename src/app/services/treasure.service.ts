import { Injectable } from '@angular/core';
import { PieceImages } from '../methods/PieceImages';
import { GameSettings } from '../models/game-settings.interface';
import { Treasure } from '../models/treasure.interface';
import { RandomNumbers } from '../methods/RandomNumbers';
import { TreasureData } from '../models/treasure-data.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreasureService {

  private _pieceImages: PieceImages = new PieceImages();
  private _randomNumbers: RandomNumbers = new RandomNumbers();

  private _defaultTreasureData: TreasureData = {
    index: 0,
    treasures: []
  };

  treasureData$: BehaviorSubject<TreasureData> = new BehaviorSubject<TreasureData>({...this._defaultTreasureData});  

  generateRandomTreasures(gameSettings: GameSettings): void {
    const treasureData: TreasureData = this.treasureData$.getValue();

    let treasureImages: string[] = this._pieceImages.getTreasureImages();
    let randomNumbers: number[] = this._randomNumbers.generateUniqueRandomNumbers(gameSettings.amountOfTreasures, treasureImages.length);

    let arr: Treasure[] = [];

    for(let i = 0; i < randomNumbers.length; i++) {
      let randomNumber: number = randomNumbers[i];

      let treasure: Treasure = {
        treasureImage: treasureImages[randomNumber],
      }

      arr.push(treasure);
    }

    treasureData.treasures = arr;
    this.update(treasureData);
  }

  update(data: TreasureData): void {
    this.treasureData$.next(data);
  }

  resetDefaults(): void {
    this.treasureData$.next({...this._defaultTreasureData});
  }

}