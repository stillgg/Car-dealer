import {combineReducers} from "redux"
import {carReducer} from "./car"


export const rootReducer = combineReducers(
    {
        cars : carReducer
    }
)

