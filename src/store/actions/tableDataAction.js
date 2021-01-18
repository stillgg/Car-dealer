import {
    CHANGE_SUBMODEL,
    CHANGE_MODEL,
    GET_IMG_URL,
    CHANGE_VIEW,
    UPDATE_SLIDER_TYPE1,
    CHANGE_TABLE_DATA
} from "../types/tableDataTypes"

import {firebaseStorage} from "../../index"

export const changeSubModel = subModel =>({
    type: CHANGE_SUBMODEL,
    payload: subModel
})

export const changeModel = pos => ({
    type: CHANGE_MODEL,
    payload: pos
})

export const getCarList = model => {
    return async dispatch =>{
        const response = await firebaseStorage.ref().child(`/cars/image/cards/${model}`)
        const list = await response.listAll()

        const urls = []

        dispatch(
            {
                type: GET_IMG_URL,
                loader: true /* before */
            }
        )

        for (const item of list.items) {
            const url = await item.getDownloadURL()
            urls.push(url)
        }

        setTimeout(() => dispatch(
            {
                type: GET_IMG_URL,
                payload: urls,
                loader: false /* after */
            }
            ), 1500
        )
    }
}

export const changeView = view=> {
    const res = view === "type-1"? "type-2": "type-1"

    return({
      type:CHANGE_VIEW,
      payload: res
    })
}

export const updateSliderType1 = conf => {
    return {
        type : UPDATE_SLIDER_TYPE1,
        payload: conf
    }
}

export const changeTableData = conf =>{
    return(
        {
            type: CHANGE_TABLE_DATA,
            payload: conf
        }
    )
}