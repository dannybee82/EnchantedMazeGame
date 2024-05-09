import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantedMazeHintComponent } from './enchanted-maze-hint.component';

describe('EnchantedMazeHint', () => {
  let component: EnchantedMazeHintComponent;
  let fixture: ComponentFixture<EnchantedMazeHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchantedMazeHintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchantedMazeHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});