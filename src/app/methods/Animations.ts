import { trigger, style, state, transition, animate, keyframes } from '@angular/animations'

export const PieceInserted = trigger('PieceInserted', [
    state("inserted", style({})),
    state("void", style({
        'opacity': 1
    })),
    transition("* => inserted", animate("750ms ease-in", keyframes([
        style({ opacity: 0.5 }),
        style({ opacity: 1 })
    ]))),      
]);

export class Animations {
   
    

}