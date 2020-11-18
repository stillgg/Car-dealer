import {GET_CARS_JSON} from "../types/types"
import {
    CHANGE_SUBMODEL,
    CHANGE_MODEL,
    GET_IMG_URL
} from "../types/tableDataTypes"

import {GET_INFO_ABOUT_CAR} from "../types/aboutCarTypes"

const initionalState = {
    models: null,

    loader: false,

    tableData: {
        changedSubModel: null,
        changedModel: null,
        urls: null,
    },
    aboutCar:{
        videoUrl: null
    }
}

export const appReducer = (state=initionalState, action)=>{
    switch (action.type) {
        case GET_CARS_JSON:
            return {
                ...state,
                models: action.payload
            }

        case CHANGE_SUBMODEL:
            return {
                ...state,
                tableData: {...state.tableData, changedSubModel: action.payload}
            }

        case CHANGE_MODEL:
            return {
                ...state,
                tableData: {
                    ...state.tableData,
                    changedModel: action.payload
                }
            }

        case GET_IMG_URL:
            return {
                ...state,
                tableData: {
                    ...state.tableData,
                    urls: action.payload
                },
                loader: action.loader /* before and after download img, toggle loader*/
            }

        case GET_INFO_ABOUT_CAR:
            return {
                ...state,
                aboutCar:{
                    ...state.aboutCar,
                    videoUrl: action.payload
                }
            }

        default:
            return {
                ...state,
                loader: false,
            }
    }
}