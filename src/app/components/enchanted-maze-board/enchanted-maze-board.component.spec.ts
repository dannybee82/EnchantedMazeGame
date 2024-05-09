import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantedMazeBoardComponent } from './enchanted-maze-board.component';

describe('EnchantedMazeBoard', () => {
  let component: EnchantedMazeBoardComponent;
  let fixture: ComponentFixture<EnchantedMazeBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchantedMazeBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchantedMazeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});