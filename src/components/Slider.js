import React, {Component} from "react"
import {connect} from "react-redux"
import {getImgSlider, updateImgSlider, updateSlider} from "../store/actions/actions"
import PreloaderV2 from "./preloaders/PreloaderV2"

class Slider extends Component {
    componentDidMount() {
        this.getStrDefaultBodyConfiguration()
    }

    getStrDefaultBodyConfiguration(){
        const model = this.props.tableData.changedModel
        const subModel = this.props.tableData.changedSubModel

        const conf = this.props.models[model][subModel].configuration.body

        let key = ''

        for(const i in conf){
            key+=conf[i][0] + '_'
        }

        this.props.getImgSlider(model,subModel ,key.slice(0,-1) )
    }

    prevHandler(pos){
        if(pos === 0){
            return
        }
        this.props.updateSlider({
            pos: pos - 1,
            prevPos: pos
        })
    }

    nextHandler(pos,sliderLength){
        if(pos === sliderLength){
            return
        }
        this.props.updateSlider({
            pos: pos + 1,
            prevPos: pos
        })
    }

    getTouchPosOnSlider(pos, sliderWidth, sliderMarginLeft){
        return (pos-parseInt(sliderMarginLeft)) *100/sliderWidth //вычисляем положение косания относительно слайдера
    }

    touchStartHandler(X1){
        this.props.updateSlider(
            {X1}
        )
    }

    touchEndHandler(
        X1, X2, sliderMarginLeft, sliderWidth,
        HPSWTChangeSlide, pos, sliderLength, className
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
            this.prevHandler(pos)
            return
        }

        if( className.includes("next") ){
            this.nextHandler(pos,sliderLength)
            return
        }

        if(X1<X2){
            this.prevHandler(pos)
        }else{
            this.nextHandler(pos,sliderLength)
        }

        this.props.updateSlider(
            {
                X2, touchPosSliderX1, touchPosSliderX2
            }
        )
    }

    calcTransformSlide(id,pos){
        return (id-pos) * 100
    }

    render() {
        const sliderImgs = this.props.slider.imgUrls
        const nextSliderImgs = this.props.slider.nextImgUrls
        const prevSliderImgs = this.props.slider.prevImgUrls

        const sliderLength = sliderImgs? sliderImgs.length - 1: false
        const pos = this.props.slider.pos
        // const prevPos = this.props.prevPos

        let prev = "active"
        let next = "active"

        const slider = document.querySelector(".slider")
        // const slides = document.querySelectorAll(".slide")

        const sliderWidth = slider? slider.clientWidth : false
        const sliderStyles = slider? getComputedStyle(slider) : false
        const sliderMarginLeft = slider? sliderStyles.marginLeft : false

        const HPSWTChangeSlide = this.props.slider.howPercentSwipeWidthToChangeSlide

        const X1 = this.props.slider.X1
        // const X2 = this.props.X2

        // const activeSlide = slides[pos]
        const nextImgUrl = this.props.slider.nextImgUrls
        // console.log("prevImgs",prevSliderImgs)
        // console.log("sliderImgs",sliderImgs)

        console.log("IMGurl",sliderImgs)

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
            <div className="slider"

                 onTouchStart={(e)=>{
                     this.touchStartHandler(
                         Math.round(e.targetTouches[0].clientX)
                     )
                 }}

                 onTouchEnd={(e)=>{
                     const className = e.target.className

                     this.touchEndHandler(
                         X1, Math.round(e.changedTouches[0].clientX),
                         sliderMarginLeft,
                         sliderWidth, HPSWTChangeSlide,
                         pos, sliderLength, className
                     )

                 }}

            >

                <div className={`prev ${prev}`}
                     onClick={
                         ()=> {
                             this.prevHandler(pos)
                         }
                     }
                >&lsaquo;</div>

                <div
                    className={`next ${next}`}
                    onClick={
                        ()=> {
                            this.nextHandler(pos,sliderLength)
                        }
                    }
                >&rsaquo;</div>

                {
                    sliderImgs?
                        sliderImgs.map((item, id) => {
                            switch (id) {
                                case pos:
                                    return <img key={id} className={`slide slide${id} activeSlide`}
                                                src={item} alt={""}
                                                style={{
                                                    zIndex: "100",
                                                    transform: `translate(${this.calcTransformSlide(id,pos)}%)`
                                                }}
                                    >
                                    </img>

                                default:
                                    return (
                                        <img key={id} className={`slide slide${id}`}
                                             src={item} alt={""}
                                             style={{
                                                 zIndex: "100",
                                                 transform: `translate(${this.calcTransformSlide(id,pos)}%)`
                                             }}
                                        >
                                        </img>
                                    )
                            }
                        })
                        :
                        <PreloaderV2/>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => state.cars

const mapDispatchToProps = {
    updateSlider,
    getImgSlider,
    updateImgSlider
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider)