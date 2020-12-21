import {GET_INFO_ABOUT_CAR} from "../types/aboutCarTypes"
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

        console.log("car",car)

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

export const getImgs = (model,subModel,configuration) =>{
    return async dispatch =>{
        const icons = await firebaseStorage.ref().child(`/cars/image/constructor/${model}/${model.toLowerCase()}-${subModel}/icons`)


    }
}