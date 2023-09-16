export {}

type State = 
| { type: "empty"}
| { type: "loading"}
| { type: "dataPartiallyLoaded"; data: string[]}
| { type: "withData"; data: string[]}
| { type: "error", errorMessage: string};

type Action = 
| { type: "dataRequested"}
| { type: "dataFetchingInProgress", data: string[]}
| { type: "dataFetchingSucceeded", data: string[]}
| { type: "dataFetchingFailed", errorMessage: string}
| { type: "dataFetchingCancelled"};

function reducer (prevState: State, action: Action) {
    switch (prevState.type) {

        case "dataPartiallyLoaded":    
        case "loading":
            switch (action.type){
                case "dataFetchingInProgress":
                    return {type: "dataPartiallyLoaded", data: action.data};
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
                case "dataFetchingInProgress":
                        return prevState;        
            }
    }
}