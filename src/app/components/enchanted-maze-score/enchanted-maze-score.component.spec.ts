import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantedMazeScoreComponent } from './enchanted-maze-score.component';

describe('EnchantedMazeScore', () => {
  let component: EnchantedMazeScoreComponent;
  let fixture: ComponentFixture<EnchantedMazeScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchantedMazeScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchantedMazeScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});