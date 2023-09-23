/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

// class HeaderComponent1 {
//     header: string;  // error

//     render(){
//         return `<h1>${this.header.toUpperCase()}</h1>`;
//     }
// }

class HeaderComponent2 {
    // Constructor initialization
    constructor(private header: string) {}
    
    render(){
        return `<h1>${this.header.toUpperCase()}</h1>`;
    }
}

class HeaderComponent3 {
    // In-place initialization
    header: string = "hello";

    render(){ 
        return `<h1>${this.header.toUpperCase()}</h1>`;
    }
}

class HeaderComponent {
    header: string | undefined;  

    render(){
        // Error! Object is possibly `undefined`
        //return `<h1>${this.header.toUpperCase()}</h1>`;
        return `<h1>${this.header?.toUpperCase()}</h1>`;
    }
}
