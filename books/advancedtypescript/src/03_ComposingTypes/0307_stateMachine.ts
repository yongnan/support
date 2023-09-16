export {}

type State = 
| { type: "empty"}
| { type: "loading"}
| { type: "error", errorMessage: string}
| { type: "withData"; data: string[]};

type Action = 
| { type: "dataRequested"}
| { type: "dataFetchingSucceeded", data: string[]}
| { type: "dataFetchingFailed", errorMessage: string}
| { type: "dataFetchingCancelled"};

function reducer (prevState: State, action: Action) {
    switch (prevState.type) {
        case "loading":
            switch (action.type){
                case "dataFetchingSucceeded":
                    return {type: "withData", data: action.data};
                case "dataFetchingCancelled":
                    return {type: "empty"}
                case "dataFetchingFailed":
                    return {type: "error", data: action.errorMessage};
                case "dataRequested":
                    return prevState;    
            }
            break;
        case "empty":
        case "error":    
        case "withData":
            switch (action.type) {
                case "dataRequested":
                    return {type: "loading"}
                case "dataFetchingCancelled":
                case "dataFetchingFailed":
                case "dataFetchingSucceeded":
                    return prevState;        
            }
    }
}