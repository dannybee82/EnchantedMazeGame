import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LastInsertedPosition } from '../models/last-inserted-position.interface';

@Injectable({
  providedIn: 'root'
})
export class LastInsertedPositionService {

  private _defaultLastInserted: LastInsertedPosition = { 
    row: -1, 
    column: -1 
  };

  lastInsertedPosition$: BehaviorSubject<LastInsertedPosition> = new BehaviorSubject<LastInsertedPosition>({...this._defaultLastInserted});

  update(position: LastInsertedPosition): void {
    this.lastInsertedPosition$.next(position);
  }

  resetDefaults(): void {
    this.lastInsertedPosition$.next({...this._defaultLastInserted});
  }

}