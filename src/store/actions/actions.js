import {
    GET_CARS_JSON,
    HANDLE_LOADER
} from "../types/types"

export function getCarsJSON() {
    return async dispatch => {
        try{
            const response = await fetch("https://car-dealer-27bc6.firebaseio.com/cars/models.json")
            const json = await response.json()

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












