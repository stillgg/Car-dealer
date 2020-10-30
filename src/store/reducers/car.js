import {CHANGE_COLOR} from "../types/types"

const initionalState = {
    carsArr: [
        {
            id:1,
            title:"Maserati",
            color:"biancoAudace",
        }
    ]
}


export const carReducer = (state=initionalState,action)=>{
    switch (action.type) {

        case CHANGE_COLOR:
            return {...state, carsArr: [
                    {
                        id:1,
                        title:"Maserati",
                        color: action.payload,
                    }
                ] }

        default:
            return {...state}
    }
}