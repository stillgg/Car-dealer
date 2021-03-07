import {
    GET_CARS_JSON,
    GET_IMG_URL_SLIDER_BODY_SALON, GET_IMG_WIDGETS,
    RESET_SLIDER, RESET_SLIDER_TYPE1,
    UPDATE_SLIDER_BODY_SALON, UPDATE_WIDGETS_SELECT
}
    from "../types/types"

import {
    CHANGE_SUBMODEL,
    CHANGE_MODEL,
    GET_IMG_URL,
    CHANGE_VIEW,
    UPDATE_SLIDER_TYPE1,
    CHANGE_TABLE_DATA
} from "../types/tableDataTypes"

import {
    CHANGE_ICON_SELECT_BODY_SALON,
    CHANGE_OPTION_SELECT_BODY,
    GET_ICONS_BODY_SALON_ABOUT_CAR,
    GET_INFO_ABOUT_CAR,
    GET_NEXT_IMG_URL_SLIDER,
    UPDATE_ABOUT_CAR,
    UPDATE_IMG_SLIDER_BODY
} from "../types/aboutCarTypes"

const initionalState = {
    models: null,
    loader: false,

    tableData: {
        changedSubModel: null,
        changedModel: null,
        urls: null,
        viewMode: "type-1",
        complictationInfo: false,
        specActive: 0,
        showSpec: false
    },

    aboutCar:{
        videoUrl: null,
        iconsUrls: null,
    },

    slider: {
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
            howPercentSwipeWidthToChangeSlide : 10, /* свайп должен быть длиной больше указанной ширины(%) слайдера для показа другого слайда*/
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
            howPercentSwipeWidthToChangeSlide : 10,
            optionSelect: 0
        },
        iconsUrls: null,
        iconSelect: null,
        widgetsUrls: null,
        widgetsSelect: null
    },

    sliderType1: {
        pos: 0,
        touchStart: 0,
        touchMovePos: 0
    }
}

export const appReducer = (state=initionalState, action)=>{
    switch (action.type) {
        case GET_CARS_JSON:
            return {
                ...state,
                models: action.payload
            }

        case CHANGE_SUBMODEL:
            return {
                ...state,
                tableData: {...state.tableData, changedSubModel: action.payload}
            }

        case CHANGE_MODEL:
            return {
                ...state,
                tableData: {
                    ...state.tableData,
                    changedModel: action.payload
                }
            }

        case GET_IMG_URL:
            return {
                ...state,
                tableData: {
                    ...state.tableData,
                    urls: action.payload
                },
                loader: action.loader /* before and after download img, toggle loader*/
            }

        case GET_INFO_ABOUT_CAR:
            return {
                ...state,
                aboutCar:{
                    ...state.aboutCar,
                    videoUrl: action.payload
                }
            }

        case UPDATE_SLIDER_BODY_SALON:

            return {
                ...state,
                slider: {
                    ...state.slider,
                    [action.typeSlider]: {
                        ...state.slider[action.typeSlider],
                        ...action.payload
                    }
                },
            }

        case RESET_SLIDER:
            return {
                ...state,
                aboutCar: action.aboutCar,
                slider: {
                    ...state.slider,
                    ...action.payload
                }
            }

        case GET_IMG_URL_SLIDER_BODY_SALON:
            return {
                ...state,
                loader: action.loader,
                slider :{
                    ...state.slider,
                    [action.typeSlider]: {
                        ...state.slider[action.typeSlider],
                        imgUrls: action.payload
                    }
                }
            }

        case GET_NEXT_IMG_URL_SLIDER:
            return {
                ...state,
                slider :{
                    ...state.slider,
                    iconLoader: action.iconLoader,
                    nextImgUrls: action.payload
                }
            }
        case UPDATE_IMG_SLIDER_BODY:
            return {
                ...state,
                slider : {
                    ...state.slider,
                    body: {
                        ...state.slider.body,
                        imgUrls: action.payload
                    }
                }
            }

        case GET_ICONS_BODY_SALON_ABOUT_CAR:

            return {
                ...state,
                preloader:action.preloader,
                slider:{
                    ...state.slider,
                    iconSelect: action.iconSelect,
                    iconsUrls: action.payload
                }
            }

        case UPDATE_ABOUT_CAR:
            return {
                ...state,
                aboutCar: {
                    ...state.aboutCar,
                    iconSelect: {
                        ...state.aboutCar.iconSelect,
                    },
                    ...action.payload
                }
            }

        case CHANGE_OPTION_SELECT_BODY:
            return {
                ...state,
                slider:{
                    ...state.slider,
                    [action.typeSlider]:{
                        ...state.slider[action.typeSlider],
                        optionSelect: action.payload
                    }
                }
            }

        case CHANGE_ICON_SELECT_BODY_SALON:
            return {
                ...state,
                slider: {
                    ...state.slider,
                    iconSelect: {
                        ...state.slider.iconSelect,
                        ...action.payload
                    }
                }
            }

        case CHANGE_VIEW:
            return {
                ...state,
                tableData: {
                    ...state.tableData,
                    view: action.payload
                }
            }

        case UPDATE_SLIDER_TYPE1:
            return{
                ...state,
                sliderType1: {
                    ...state.sliderType1,
                    ...action.payload
                }
            }

        case RESET_SLIDER_TYPE1:
            return {
                ...state,
                sliderType1: action.payload
            }

        case CHANGE_TABLE_DATA:
            return{
                ...state,
                tableData: {
                    ...state.tableData,
                    ...action.payload
                }
            }

        case GET_IMG_WIDGETS:
            return {
                ...state,
                slider: {
                    ...state.slider,
                    widgetsUrls: action.widgets,
                    widgetsSelect: action.widgetsSelect
                }
            }

        case UPDATE_WIDGETS_SELECT:
            return {
                ...state,
                slider:{
                    ...state.slider,
                    widgetsSelect: {
                        ...state.slider.widgetsSelect,
                        [action.key]:action.payload
                    }

                }
            }

        default:
            return {
                ...state,
                loader: false
            }
    }
}