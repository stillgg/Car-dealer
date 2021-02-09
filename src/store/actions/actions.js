import {
    GET_CARS_JSON, GET_IMG_URL_SLIDER_BODY_SALON,
    HANDLE_LOADER, UPDATE_SLIDER_BODY_SALON
} from "../types/types"
import {firebaseStorage} from "../../index"

import {
    GET_NEXT_IMG_URL_SLIDER,
    UPDATE_IMG_SLIDER_BODY
} from "../types/aboutCarTypes"

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

export const updateSlider = (conf,typeSlider) => (
    {
        type: UPDATE_SLIDER_BODY_SALON,
        payload: conf,
        typeSlider
    }
)

export const getImgSlider = (model,subModel,conf,iconSelect,typeSlider) =>{
    return async dispatch =>{
        const response = await firebaseStorage.ref().child(
            `/cars/image/constructor/${model}/${model.toLowerCase()}-${subModel}/result/${typeSlider}`
            // `/cars/image/constructor/Maserati/maserati-Levante/result/body`
        )
        const list = await response.listAll()

        const imgUrls = []

        const confStr = getStrConf(conf,iconSelect)

        dispatch(
            {
                type: GET_IMG_URL_SLIDER_BODY_SALON,
                loader : false,
                typeSlider
            }
        )

        for (const item of list.items){
            if( item.location.path.includes(confStr) ){
                const url = await item.getDownloadURL()
                imgUrls.push(url)
            }
        }

        console.log("imgUrls",imgUrls)

        setTimeout(()=>dispatch(
            {
                type: GET_IMG_URL_SLIDER_BODY_SALON,
                loader: true,
                payload : imgUrls,
                typeSlider
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

export const updateImgSlider = obj=>({
    type: UPDATE_IMG_SLIDER_BODY,
    payload: obj
})


const getStrConf = (confBody,iconSelect) =>{

    let key = ''

    for(const i in confBody){
        const confArr = confBody[i]
        const id = iconSelect===null? 0 : iconSelect[i]

        key+=confArr[id] + '_'
    }

    return key.slice(0,-1)
}
