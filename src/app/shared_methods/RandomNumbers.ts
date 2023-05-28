export class RandomNumbers {

    generateRandomNumber(min: number, max: number) : number {
        return Math.floor(Math.random() * max) + min;
    }

}