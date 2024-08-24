import { Injectable } from '@angular/core';
import { ShowHint } from '../models/show-hint.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowHintService {

  private _defaultShowHint: ShowHint = { side: -1, index: -1 };

  showHint$: BehaviorSubject<ShowHint> = new BehaviorSubject<ShowHint>({...this._defaultShowHint});

  update(hint: ShowHint): void {
    this.showHint$.next(hint);
  }

  resetDefaults(): void {
    this.showHint$.next({...this._defaultShowHint});
  }

}