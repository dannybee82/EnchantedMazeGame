export class CommonArrayFunctions {

    public swap(array: any[], targetIndex01: number, targetIndex02: number) : any[] {
        let item01: any = array[targetIndex01];
        let item02: any = array[targetIndex02];

        array[targetIndex02] = item01;
        array[targetIndex01] = item02;

        return array;
    }

    fillNumberArray(size: number, value: number, isAccumulative: boolean) : number[] {
      let arr: number[] = [];

      for(let i = 0; i < size; i++) {
        arr.push(value);

        if(isAccumulative) {
          value++;
        }
      }

      return arr;
    }

}