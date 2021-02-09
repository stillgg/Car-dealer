import React, {Component} from "react"
import {connect} from "react-redux"
import {
    getImgSlider,
    updateImgSlider,
    updateSlider
} from "../../store/actions/actions"

import {
    changeIconSelect,
    changeOptionSelect
} from "../../store/actions/aboutCarAction"



import PreloaderV2 from "../preloaders/PreloaderV2"
import ConfPanel from "../main/aboutCar/ConfPanel"


class Slider extends Component {
    componentDidMount() {
        this.getStrDefaultBodyConfiguration()
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

        const iconSelect = this.resetSelect(
            // this.props.aboutCar.iconSelect
            this.props.slider.iconSelect
        )
        // console.log("model",model)
        // console.log("submodel",subModel)
        // console.log(confBody)

        // console.log("iconSelect",iconSelect)

        this.props.getImgSlider(model,subModel,conf,iconSelect,type)
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
        if(pos === sliderLength){
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

    render() {
        const type = this.props.type
        const state = this.props.cars

        const sliderImgs = this.props.slider[type].imgUrls

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
                        sliderImgs?
                            sliderImgs.map((item, id) => {
                                return <img key={id} className={`slide ${pos === id ? "activeSlide" : `slide${id}`}`}
                                            src={item} alt={""}
                                            style={{
                                                zIndex: "100",
                                                transform: `translate(${this.calcTransformSlide(id, pos)}%)`
                                            }}
                                >
                                </img>
                            })
                            :
                            <PreloaderV2/>
                    }

                </div>

                <ConfPanel
                    type={type}
                    state={this.props}
                    changeIconSelect={this.props.changeIconSelect}
                    updateSlider={this.props.updateSlider}
                    getImgSlider={this.props.getImgSlider}
                    changeOptionSelect={this.props.changeOptionSelect}
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
    changeOptionSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider)