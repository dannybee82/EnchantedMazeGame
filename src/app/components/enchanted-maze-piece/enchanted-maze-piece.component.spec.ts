import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnchantedMazePieceComponent } from './enchanted-maze-piece.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('EnchantedMazePieceComponent', () => {
  let component: EnchantedMazePieceComponent;
  let fixture: ComponentFixture<EnchantedMazePieceComponent>;

  //Note the deprecated animations should not be imported in tests.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchantedMazePieceComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchantedMazePieceComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); //When working with InputSignals, this line must be disabled.
  });

  it('should create', () => {
    //Below: test the InputSignal.
    const mockMazePiece = {
      row: 0,
      column: 0,
      pieceImage: '',
      pieceNumber: 0,
      orientation: 0,
      isFixed: true,
      player: -1,
      hasTreasure: false,
      treasureForPlayer: -1,
      treasureImage: ''
    };

    fixture.componentRef.setInput('mazePiece', mockMazePiece);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});