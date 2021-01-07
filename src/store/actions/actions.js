import {
    GET_CARS_JSON, GET_IMG_URL_SLIDER,
    HANDLE_LOADER, UPDATE_SLIDER
} from "../types/types"
import {firebaseStorage} from "../../index"
import {GET_NEXT_IMG_URL_SLIDER, UPDATE_IMG_SLIDER} from "../types/aboutCarTypes"

export const getCarsJSON = () => {
    return async dispatch => {
        try {
            const response = await fetch("https://car-dealer-27bc6.firebaseio.com/cars/models.json")
            const json = await response.json()
            console.log(json)
            dispatch(
                {
                    type: GET_CARS_JSON,
                    payload: json
                }
            )
        } catch (e) {
            throw e
        }
    }
}

export const handleLoader = value => (
    {
        type: HANDLE_LOADER,
        payload: value
    }
)

export const updateSlider = conf => (
    {
        type: UPDATE_SLIDER,
        payload: conf
    }
)

export const getImgSlider = (model,subModel,conf) =>{
    return async dispatch =>{
        const response = await firebaseStorage.ref().child(
            `/cars/image/constructor/${model}/${model.toLowerCase()}-${subModel}/result/body`
            // `/cars/image/constructor/Maserati/maserati-Levante/result/body`
        )

        const list = await response.listAll()

        const imgUrls = []

        dispatch(
            {
                type: GET_IMG_URL_SLIDER,
                loader : false
            }
        )

        for (const item of list.items){
            if( item.location.path.includes(conf) ){
                const url = await item.getDownloadURL()
                imgUrls.push(url)
            }
        }

        setTimeout(()=>dispatch(
            {
                type: GET_IMG_URL_SLIDER,
                loader: true,
                payload : imgUrls
            }
        ),200)

    }
}

export const getNextImgSlider = (model,subModel,conf, prevImgUrls) =>{
    return async dispatch =>{

        dispatch(
            {
                type: GET_NEXT_IMG_URL_SLIDER,
                iconLoader: true
            }
        )

        const response = await firebaseStorage.ref().child(
            `/cars/image/constructor/${model}/${model.toLowerCase()}-${subModel}/result/body`
            // `/cars/image/constructor/Maserati/maserati-Levante/result/body`
        )

        const list = await response.listAll()

        const imgUrls = []

        for (const item of list.items){
            if( item.location.path.includes(conf) ){
                const url = await item.getDownloadURL()
                imgUrls.push(url)
            }
        }

        setTimeout(()=>dispatch(
            {
                type: GET_NEXT_IMG_URL_SLIDER,
                iconLoader: false,
                payload : imgUrls
            }
        ),200)
    }
}

export const updateImgSlider = (obj)=>({
    type: UPDATE_IMG_SLIDER,
    payload: obj
})



