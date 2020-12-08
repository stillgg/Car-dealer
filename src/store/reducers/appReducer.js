import {GET_CARS_JSON, UPDATE_SLIDER} from "../types/types"
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
        urls: null
    },

    aboutCar:{
        videoUrl: null,
        imgUrls:{
            body: null,
            salon: null,
            icons: null
        }
    },

    slider: {
        imgUrls: [
            "https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Fconstructor%2FMaserati%2Fmaserati-Levante%2Fresult%2Fbody%2FBianco_AnteoBlackStaggered_Blu_1.jfif?alt=media&token=0db4761f-4474-4b8e-9564-bf8ed7f5fae7",
            "https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Fconstructor%2FMaserati%2Fmaserati-Levante%2Fresult%2Fbody%2FBianco_AnteoBlackStaggered_Blu_2.jfif?alt=media&token=cf3a3e19-2a65-4429-b063-5ace5f68a636",
            "https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Fconstructor%2FMaserati%2Fmaserati-Levante%2Fresult%2Fbody%2FBianco_AnteoBlackStaggered_Blu_3.jfif?alt=media&token=e621ea63-c336-43bd-9c0e-c78904bf094a",
            "https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Fconstructor%2FMaserati%2Fmaserati-Levante%2Fresult%2Fbody%2FBianco_AnteoBlackStaggered_Blu_4.jfif?alt=media&token=25e04697-8834-44c7-8b53-170b4e1557f7"
        ],
        pos: 0,
        prevPos: 0
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

        case UPDATE_SLIDER:

            return {
                ...state,
                slider: {
                    ...state.slider,
                    ...action.payload
                },


            }

        default:
            return {
                ...state,
                loader: false,
            }
    }
}