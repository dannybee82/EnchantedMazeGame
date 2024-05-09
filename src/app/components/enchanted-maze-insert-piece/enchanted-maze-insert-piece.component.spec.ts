import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantedMazeInsertPieceComponent } from './enchanted-maze-insert-piece.component';

describe('EnchantedMazeInsertPieceComponent', () => {
  let component: EnchantedMazeInsertPieceComponent;
  let fixture: ComponentFixture<EnchantedMazeInsertPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchantedMazeInsertPieceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchantedMazeInsertPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
