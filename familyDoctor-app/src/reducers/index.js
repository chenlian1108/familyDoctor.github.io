const defaultState = {
    kePus:[], 
    myUser:[], 
    banner:[],
    heathnewlist:[],    
}
// console.log(heathnewlist);

export const reducers = (state=defaultState,action)=>{
    console.log(action)
    
    switch(action.type){

        case "getkepu":
        return {...state,kePus:action.kePus}
        break;

        // case "upMobileDis":
        // return {...state,mobileDis:action.mobileDis}
        // break;

        case "postCode":
        return {...state,myUser:action.myUser}
        break;

        case "getBanner":
        return {...state,banner:action.banner} 
        break;

        case "heathnewlist":
        return {...state,heathnewlist:action.heathnewlist} 
        break;

        default:
        return state;
        break;
    }
}