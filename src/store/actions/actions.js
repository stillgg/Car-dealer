import {GET_CARS_JSON} from "../types/types"

export function getCarsJSON() {
    return async dispatch => {
        const response = await fetch("https://car-dealer-27bc6.firebaseio.com/cars/models.json")
        const json = await response.json()

        dispatch(
            {
                type: GET_CARS_JSON,
                payload: json
            }
        )
    }
}














