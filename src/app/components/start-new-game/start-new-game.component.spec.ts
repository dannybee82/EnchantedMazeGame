import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNewGameComponent } from './start-new-game.component';

describe('StartNewGameComponent', () => {
  let component: StartNewGameComponent;
  let fixture: ComponentFixture<StartNewGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartNewGameComponent]
    });
    fixture = TestBed.createComponent(StartNewGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
