export class TestRunner {
    static describe = (specDescribtion:string,suiteFn:()=> any) => {
        console.log(specDescribtion + '\n');
        try {
            suiteFn();
        } catch {
           console.error(`test aborted`);
           throw('');
        }
    }

    static test = (testDescribtion:string,testFn:()=> any) => {
        console.log(testDescribtion + '\n');
        try {
            testFn();
        } catch(e) {
           throw(e);
        }
    }
}



export class Expect {
   private value:any;
   constructor(value){
    this.value = value;
   }
   toBe = (expectedValue):void => {
       if (this.value !== expectedValue)  {
           throw(`expected value:${expectedValue},got:${this.value}`);
       }
   }
   toEval = (evaluate:string) => {
       if (!evaluate.includes(`{X}`)) {
         throw(`invalid function`);
       }
       evaluate = evaluate.replace(`{X}`,this.value);
       const isExpected = eval(`if(${evaluate}return true;return false`);
       if(!isExpected ) {
          throw(`${this.value} does not match the contition of X ${evaluate}`);
       }
   }
}
export const Iexpect = (value:any) => {
     return new Expect(value);
}
