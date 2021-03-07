import {
    GET_CARS_JSON, GET_IMG_URL_SLIDER_BODY_SALON, GET_IMG_WIDGETS,
    HANDLE_LOADER, RESET_SLIDER, UPDATE_SLIDER_BODY_SALON, UPDATE_WIDGETS, UPDATE_WIDGETS_SELECT
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
export const getImgSlider = (model,subModel,conf,iconSelect,typeSlider,widgets,widgetsSelect) =>{
    return async dispatch =>{
        const response = await firebaseStorage.ref().child(
            `/cars/image/constructor/${model}/${model==="Maserati"?model.toLowerCase()+"-":""}${subModel}/result/${typeSlider}`
        )
        const list = await response.listAll()

        const imgUrls = []

        const confStr = getStrConf(conf,iconSelect,widgets,widgetsSelect)

        dispatch(
            {
                type: GET_IMG_URL_SLIDER_BODY_SALON,
                loader : false,
                typeSlider
            }
        )

        for (const item of list.items){
        console.log("confStr",confStr)
        console.log("location Path",item.location.path)
            if( item.location.path.includes(confStr) ){
                const url = await item.getDownloadURL()
                imgUrls.push(url)
            }
        }

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

export const getNextImgSlider = (model,subModel,conf) =>{
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

export const resetSlider = () => ({
    type: RESET_SLIDER,
    payload: {
        body: {
            iconLoader: false,
            // prevImgUrls: null,
            // nextImgUrls: null,
            imgUrls: null,
            prev: "disable",
            next: "active",
            pos: 0,
            // prevPos: 0,
            X1: 0, /* начальная координата косания относительно окна браузера по оси x */
            X2: 0, /* конечная координата косания */
            touchPosSliderX1: 0, /* начальная координата косания относительно слайдера по оси x */
            touchPosSliderX2: 0,
            howPercentSwipeWidthToChangeSlide: 10, /* свайп должен быть длиной больше указанной ширины(%) слайдера для показа другого слайда*/
            optionSelect: 0
        },
        salon: {
            iconLoader: false,
            // prevImgUrls: null,
            // nextImgUrls: null,
            imgUrls: null,
            prev: "disable",
            next: "active",
            pos: 0,
            // prevPos: 0,
            X1: 0, /* начальная координата косания относительно окна браузера по оси x */
            X2: 0, /* конечная координата косания */
            touchPosSliderX1: 0, /* начальная координата косания относительно слайдера по оси x */
            touchPosSliderX2: 0,
            howPercentSwipeWidthToChangeSlide: 10,
            optionSelect: 0
        },
        iconsUrls: null,
        iconSelect: null,
        widgetsUrls: null,
        widgetsSelect: null
    },
    aboutCar: {
        videoUrl: null,
        iconsUrls: null,
    }
})

export const getWidgetsImg = (model,subModel) =>{
    return async dispatch =>{
        const response = await firebaseStorage.ref().child(
            `/cars/image/constructor/${model}/${subModel}/widgets`
        )
        const list = await response.listAll()

        // console.log("list",list.prefixes)

        const result = {}

        for (let i=0; i<=list.prefixes.length-1; i++){
            const iconsList = await list.prefixes[i].listAll()
            const pathList = list.prefixes[i].location.path.split('/')
            const key = pathList[pathList.length-1]
            result[key] = []

            for(const item of iconsList.items){
                const iconUrl = await item.getDownloadURL()
                result[key].push(iconUrl)
            }
        }

        const iconSelect = {
        }


        for(const key of Object.keys(result)){
            iconSelect[key] = 0
        }
        dispatch({
            type: GET_IMG_WIDGETS,
            widgets:result,
            widgetsSelect:iconSelect
        })
    }
}

export const updateWidgetsSelect = (key,value)=>{
    return (
        {
            type: UPDATE_WIDGETS_SELECT,
            payload: value,
            key
        }
    )
}

const getStrConf = (confBody,iconSelect,widgets,widgetsSelect) =>{

    let key = ''

    for(const i in confBody){
        const confArr = confBody[i]
        const id = iconSelect===null? 0 : iconSelect[i]

        key+=confArr[id] + '_'
    }

    if(widgets){
        for(const i in widgets){
            const confArr = widgets[i]
            const id = iconSelect===null? 0 : widgetsSelect[i]

            key+= confArr[id] + '_'
        }
    }

    return key
}
