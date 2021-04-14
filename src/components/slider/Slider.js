import React, {Component} from "react"
import {connect} from "react-redux"
import {
    changePrevImgSlider,
    getImgSlider, getWidgetsImg, resetSlider,
    updateImgSlider,
    updateSlider, updateWidgetsSelect
} from "../../store/actions/actions"

import {
    changeIconSelect,
    changeOptionSelect
} from "../../store/actions/aboutCarAction"

import ConfPanel from "../main/aboutCar/ConfPanel"
import Widgets from "../main/aboutCar/Widgets"



class Slider extends Component {
    componentDidMount() {
        this.getStrDefaultBodyConfiguration()
    }
    componentWillUnmount() {
        this.props.resetSlider()
    }

    resetSelect(iconSelect){
        for(const i in iconSelect){
            iconSelect[i] = 0
        }

        return iconSelect
    }

    getStrDefaultBodyConfiguration(){
        const model = this.props.tableData.changedModel
        const subModel = this.props.tableData.changedSubModel
        const type = this.props.type
        const conf = this.props.models[model][subModel].configuration[type]

        const widgets = this.props.models[model][subModel].configuration.widgets


        const widgetsSelect = this.resetSelect(
            this.props.slider.widgetsSelect
        )

        const iconSelect = this.resetSelect(
            this.props.slider.iconSelect
        )

        this.props.getImgSlider(model,subModel,conf,iconSelect,type,widgets,widgetsSelect)
    }

    prevHandler(pos,type){
        if(pos === 0){
            return
        }
        this.props.updateSlider(
            {
            pos: pos - 1,
            prevPos: pos
            },
            type
        )
    }

    nextHandler(pos,sliderLength,type){
        if(pos === sliderLength || !sliderLength){
            return
        }
        this.props.updateSlider(
            {
            pos: pos + 1,
            prevPos: pos
            },
            type
        )
    }

    getTouchPosOnSlider(pos, sliderWidth, sliderMarginLeft){
        return (pos-parseInt(sliderMarginLeft)) *100/sliderWidth //вычисляем положение косания относительно слайдера
    }

    touchStartHandler(X1,type){
        this.props.updateSlider(
            {X1},
            type
        )
    }

    touchEndHandler(
        X1, X2, sliderMarginLeft, sliderWidth,
        HPSWTChangeSlide, pos, sliderLength, className, type
    ){

        const touchPosSliderX1 = this.getTouchPosOnSlider(
            X1, sliderWidth, sliderMarginLeft
        )

        const touchPosSliderX2 = this.getTouchPosOnSlider(
            X2, sliderWidth, sliderMarginLeft
        )

        if(
            touchPosSliderX2 - touchPosSliderX1 < HPSWTChangeSlide
            &&
            touchPosSliderX2 - touchPosSliderX1 > -HPSWTChangeSlide
        ){
            return
        }

        if( className.includes("prev")  ){
            this.prevHandler(pos,type)
            return
        }

        if( className.includes("next") ){
            this.nextHandler(pos,sliderLength,type)
            return
        }

        if(X1<X2){
            this.prevHandler(pos,type)
        }else{
            this.nextHandler(pos,sliderLength,type)
        }

        this.props.updateSlider(
            {
                X2, touchPosSliderX1, touchPosSliderX2
            },
            type
        )
    }

    calcTransformSlide(id,pos){
        return (id-pos) * 100
    }

    getPlaceholder(model){
        const obj = {
            Maserati: "https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Fplaceholders%2FMaserati.jpg?alt=media&token=447af30e-a08a-4b06-b1c1-9961a46669f0",
            Porshe: "https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Fplaceholders%2FPorshe.jpg?alt=media&token=a7c0195a-cd55-47ca-b508-c17818f08480"
        }

        return obj[model]
    }


    render() {
        const type = this.props.type
        const state = this.props

        const model = state.tableData.changedModel
        const subModel = state.tableData.changedSubModel

        const carInfo = state.models[model][subModel]
        const configuration = carInfo.configuration[type]

        const sliderImgs = this.props.slider[type].imgUrls

        const prevSliderImgs = this.props[type].prevImgUrls

        const sliderLength = sliderImgs? sliderImgs.length - 1: false
        const pos = this.props.slider[type].pos

        let prev = "active"
        let next = "active"

        const slider = document.querySelector(".slider")

        const sliderWidth = slider? slider.clientWidth : false
        const sliderStyles = slider? getComputedStyle(slider) : false
        const sliderMarginLeft = slider? sliderStyles.marginLeft : false

        const HPSWTChangeSlide = this.props.slider[type].howPercentSwipeWidthToChangeSlide

        const X1 = this.props.slider[type].X1

        const widgets = carInfo.configuration.widgets

        const widgetsSelect = this.props.slider.widgetsSelect
        const widgetsUrls = this.props.slider.widgetsUrls

        const iconSelect = this.props.slider.iconSelect

        if(sliderLength){
            switch (pos) {
                case sliderLength:
                    next = "disable"
                    break
                case 0:
                    prev = "disable"
                    break
                default:
                    break
            }
        }


        if (!configuration){
            return <React.Fragment></React.Fragment>
        }

        return (
            <React.Fragment>
                <div className="slider"

                     onTouchStart={(e)=>{
                         this.touchStartHandler(
                             Math.round(e.targetTouches[0].clientX),
                             type
                         )
                     }}

                     onTouchEnd={(e)=>{
                         const className = e.target.className

                         this.touchEndHandler(
                             X1, Math.round(e.changedTouches[0].clientX),
                             sliderMarginLeft,
                             sliderWidth, HPSWTChangeSlide,
                             pos, sliderLength, className, type
                         )

                     }}

                >

                    <div className={`prev ${prev}`}
                         onClick={
                             ()=> {
                                 this.prevHandler(pos,type)
                             }
                         }
                    >&lsaquo;</div>

                    <div
                        className={`next ${next}`}
                        onClick={
                            ()=> {
                                this.nextHandler(pos,sliderLength,type)
                            }
                        }
                    >&rsaquo;</div>


                    {
                        widgets?
                            <Widgets
                                widgets={widgets}
                                getWidgetsImg={this.props.getWidgetsImg}
                                model={model}
                                subModel={subModel}
                                widgetsSelect={widgetsSelect}
                                widgetsUrls={widgetsUrls}
                                updateWidgetsSelect={this.props.updateWidgetsSelect}
                                getImgSlider={this.props.getImgSlider}
                                conf={configuration}
                                iconSelect={iconSelect}
                                type={type}
                                changePrevImgSlider={this.props.changePrevImgSlider}
                                state={state}
                                carInfo={carInfo}
                            />
                            :
                            false
                    }

                    {
                        prevSliderImgs?
                            prevSliderImgs.map((item,id)=>{
                                return <img key={id} className={`slide ${pos === id ? "activeSlide" : `slide${id}`}`}
                                            src={item} alt={""}
                                            style={{
                                                zIndex: "100",
                                                transform: `translate(${this.calcTransformSlide(id, pos)}%)`
                                            }}
                                />
                            })
                            :
                            false
                    }


                    {
                        sliderImgs?
                            sliderImgs.map((item, id) => {
                                return <img key={id} className={`slide ${pos === id ? "activeSlide" : `slide${id}`}`}
                                            src={item} alt={""}
                                            style={{
                                                zIndex: "100",
                                                transform: `translate(${this.calcTransformSlide(id, pos)}%)`
                                            }}
                                />
                            })
                            :
                            <img className="placeholder"
                                 src={`${this.getPlaceholder(model)}`}
                                 style={{
                                     width: "100%",
                                     height: "100%",
                                     objectFit: "cover"
                                 }}
                                 alt="placeholder"
                            />
                    }

                </div>

                <ConfPanel
                    type={type}
                    state={this.props}
                    changeIconSelect={this.props.changeIconSelect}
                    updateSlider={this.props.updateSlider}
                    getImgSlider={this.props.getImgSlider}
                    changeOptionSelect={this.props.changeOptionSelect}
                    changePrevImgSlider={this.props.changePrevImgSlider}
                    widgets={widgets}
                    widgetsSelect={widgetsSelect}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => state.cars

const mapDispatchToProps = {
    updateSlider,
    getImgSlider,
    updateImgSlider,
    changeIconSelect,
    changeOptionSelect,
    resetSlider,
    getWidgetsImg,
    updateWidgetsSelect,
    changePrevImgSlider
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider)