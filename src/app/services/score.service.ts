import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Score } from '../models/score.interface';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private _defaultScore: Score = {
    scores: [0],
    totalTreasuresAmount: 0,
    totalTreasuresFound: 0,
    isGameEnded: false
  };

  score$: BehaviorSubject<Score> = new BehaviorSubject<Score>({...this._defaultScore});

  updateScore(score: Score): void {
    this.score$.next(score);
  }

  resetDefaults(): void {
    this.score$.next({...this._defaultScore});
  }

}