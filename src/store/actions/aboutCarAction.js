import {
    CHANGE_ICON_SELECT,
    CHANGE_OPTION_SELECT,
    GET_ICONS_ABOUT_CAR,
    GET_INFO_ABOUT_CAR,
    UPDATE_ABOUT_CAR
} from "../types/aboutCarTypes"
import {firebaseStorage} from "../../index"

export const getVideo = car =>{
    return async dispatch =>{
        const response = await firebaseStorage.ref().child(`/cars/videos/previews`)
        const list = await response.listAll()
        let videoUrl

        dispatch(
            {
                type: GET_INFO_ABOUT_CAR,
                loader: true /* before */
            }
        )

        for (const item of list.items){
            if(item.location.path.includes(car)){
                videoUrl = await item.getDownloadURL()
            }
        }

        setTimeout(() => dispatch(
            {
                type: GET_INFO_ABOUT_CAR,
                payload: videoUrl,
                loader: false /* after */
            }
            ), 1500
        )

    }
}

export const getIcons = (model,subModel)=>{

    return async dispatch =>{
        try{
            const response = await firebaseStorage.ref().child(`/cars/image/constructor/${model}/${model.toLowerCase()}-${subModel}/icons`)
            const list = await response.listAll()

            const result = {

            }

            dispatch(
                {
                    type: GET_ICONS_ABOUT_CAR,
                    loader: true
                }
            )

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


            dispatch(
                {
                    type: GET_ICONS_ABOUT_CAR,
                    loader: false,
                    payload: result,
                    iconSelect
                }
            )
        }
        catch (e) {
            throw e
        }
    }
}

export const updateAboutCar = conf =>{
    return{
        type: UPDATE_ABOUT_CAR,
        payload: conf
    }
}

export const changeOptionSelect = optionSelect => {
    return{
        type: CHANGE_OPTION_SELECT,
        payload: optionSelect
    }
}

export const changeIconSelect = iconSelect =>{
    return{
        type: CHANGE_ICON_SELECT,
        payload: iconSelect
    }
}