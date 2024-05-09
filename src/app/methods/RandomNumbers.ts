export class RandomNumbers {

    generateUniqueRandomNumbers(amount: number, maximum: number): number[] {
      let arr: number[] = [];
    
      for (let i = 0; i < amount; i++) {
        let randomNumber: number = this.generateRandomNumber(0, maximum);
        let found: number = arr.indexOf(randomNumber);
    
        if(found > -1) {
          while(found > -1) {
            randomNumber = this.generateRandomNumber(0, maximum);
            found = arr.indexOf(randomNumber);
          }
        }
    
        arr.push(randomNumber);
      }
    
      return arr;
    }

    generateRandomNumber(min: number, max: number) : number {
        return Math.floor(Math.random() * max) + min;
    }

}