import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantedMazeTurnComponent } from './enchanted-maze-turn.component';

describe('EnchantedMazeTurn', () => {
  let component: EnchantedMazeTurnComponent;
  let fixture: ComponentFixture<EnchantedMazeTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchantedMazeTurnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchantedMazeTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});