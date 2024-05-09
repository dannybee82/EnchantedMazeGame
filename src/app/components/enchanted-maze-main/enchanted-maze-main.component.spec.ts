import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchantedMazeMainComponent } from './enchanted-maze-main.component';

describe('EnchantedMazeMainComponent', () => {
  let component: EnchantedMazeMainComponent;
  let fixture: ComponentFixture<EnchantedMazeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchantedMazeMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchantedMazeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
