import {CHANGE_COLOR} from "../types/types"

export function changeColor(color) {
    return (
        {
            type: CHANGE_COLOR,
            payload: color
        }
    )
}