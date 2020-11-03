import {GET_CARS_JSON} from "../types/types"
import {
    CHANGED_SUBMENU_CAR,
    GET_IMG_URL
} from "../types/tableDataTypes"


const initionalState = {
    models: null,

    loader: true,

    tableData: {
        changedSubMenuCar : null,
        urls: null,
    }

}

export const appReducer = (state=initionalState, action)=>{
    switch (action.type) {
        case GET_CARS_JSON:
            return { ...state, models: action.payload }

        case CHANGED_SUBMENU_CAR:
            return {
                ...state,
                tableData: {
                    ...state.tableData,
                    changedSubMenuCar: action.payload}
            }

        case GET_IMG_URL:
            return {
                ...state,
                tableData: {
                    ...state.tableData,
                    urls: action.payload
                },
                loader: action.loader /* after download img I off loader*/
            }

        default:
            return {
                ...state,
                tableData: {
                    changedSubMenuCar: null,
                    urls: null
                },
                loader: true
            }
    }
}