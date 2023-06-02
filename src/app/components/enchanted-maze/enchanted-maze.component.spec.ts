import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantedMazeComponent } from './enchanted-maze.component';
import { TurnAndScoreboardComponent } from '../turn-and-scoreboard/turn-and-scoreboard.component';

describe('EnchantedMazeComponent', () => {
  let component: EnchantedMazeComponent;
  let fixture: ComponentFixture<EnchantedMazeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnchantedMazeComponent, TurnAndScoreboardComponent]
    });
    fixture = TestBed.createComponent(EnchantedMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
