/* eslint-disable @typescript-eslint/no-unused-vars */

class CountService {
    counter: number | undefined;

    increase() {
        if (this.counter !== undefined){
            this.counter += 1;
            this.printCounter();
        }
    }
    private  printCounter(){
        //console.log(this.counter!.toLocaleString());
        
        if (this.counter !== undefined) {
            console.log(this.counter.toLocaleString());
        }    
    }
}