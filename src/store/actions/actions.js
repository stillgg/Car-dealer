import {
    GET_CARS_JSON, GET_IMG_URL_SLIDER,
    HANDLE_LOADER, UPDATE_SLIDER
} from "../types/types"
import {firebaseStorage} from "../../index";

export function getCarsJSON() {
    return async dispatch => {
        try{
            const response = await fetch("https://car-dealer-27bc6.firebaseio.com/cars/models.json")
            const json = await response.json()
            console.log(json)
            dispatch(
                {
                    type: GET_CARS_JSON,
                    payload: json
                }
            )
        }
        catch (e) {
            throw e
        }
    }
}

export function handleLoader(value) {
    return(
        {
            type: HANDLE_LOADER,
            payload: value
        }
    )
}

export function updateSlider(conf){
    return {
        type: UPDATE_SLIDER,
        payload: conf
    }
}

export function getImgSlider(model,subModel,conf) {
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

        console.log(conf)

        setTimeout(()=>dispatch(
            {
                type: GET_IMG_URL_SLIDER,
                loader: true,
                payload : imgUrls
            }
        ),200)

    }
}








