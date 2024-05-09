import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantedMazePieceComponent } from './enchanted-maze-piece.component';

describe('EnchantedMazePieceComponent', () => {
  let component: EnchantedMazePieceComponent;
  let fixture: ComponentFixture<EnchantedMazePieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchantedMazePieceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchantedMazePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
