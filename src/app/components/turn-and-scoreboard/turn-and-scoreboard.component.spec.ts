import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnAndScoreboardComponent } from './turn-and-scoreboard.component';

describe('TurnAndScoreboardComponent', () => {
  let component: TurnAndScoreboardComponent;
  let fixture: ComponentFixture<TurnAndScoreboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnAndScoreboardComponent]
    });
    fixture = TestBed.createComponent(TurnAndScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
