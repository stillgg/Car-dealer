import {
    CHANGED_SUBMENU_CAR,
    GET_IMG_URL
} from "../types/tableDataTypes"

import {firebaseStorage} from "../../index"

import {handleLoader} from "./actions"


export function changeSubMenuCar(pos) {
    return {
        type: CHANGED_SUBMENU_CAR,
        payload: pos
    }
}

export function getCarList(model) {
    return async dispatch =>{
        const response = await firebaseStorage.ref().child(`/cars/image/cards/${model}`)
        const list = await response.listAll()

        const urls = []

        dispatch(
            {
                type: GET_IMG_URL,
                loader: true
            }
        )

        for (const item of list.items) {
            const url = await item.getDownloadURL()
            urls.push(url)
        }


        dispatch(
            {
                type: GET_IMG_URL,
                payload: urls,
                loader: false
            }
        )
    }
}