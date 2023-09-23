/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

interface LoggingService {
    log(msg: string): void;
}

class CounterComponent {
    count = 0;

    constructor(private loggingService: LoggingService){}

    increment(by: number){
        this.loggingService.log(`Incermenting by ${by}`);
        this.count = this.count + by;
    }
}