import React, {Component} from "react"
import {connect} from "react-redux"
import {updateSlider} from "../store/actions/actions"

class Slider extends Component {
    componentDidMount() {
        
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


    render() {
        const sliderImgs = this.props.cars.slider.imgUrls
        const sliderLength = sliderImgs.length -1
        const pos = this.props.cars.slider.pos
        const prevPos = this.props.cars.slider.prevPos

        let prev = "active"
        let next = "active"

        const slider = document.querySelector(".slider")
        const slides = document.querySelectorAll(".slide")

        // const sliderWidth = this.props.cars.sliderWidth
        // const responseTime = this.props.cars.slider.responseTime

        let touchStartTime
        let touchEndTime
        let X1
        let X2



        const activeSlide = slides[pos]

        switch (pos) {
            case sliderLength:
                next = "disable"
                break
            case 0:
                prev = "disable"
                break
        }


        return (
            <div className="slider"
                 // onTouchMove={(e)=>{
                 //     console.log(e.touches[0].clientX)
                 // }}
                 onTouchStart={(e)=>{
                     X1 = Math.round(e.targetTouches[0].clientX)
                     console.log('start',
                         X1
                     )
                 }}

                 onTouchEnd={(e)=>{
                     X2 = Math.round(e.changedTouches[0].clientX)

                     if( X2-X1 < 100 && X2-X1 > -100){
                         return
                     }

                     if( e.target.className.includes("prev")  ){
                         this.prevHandler(pos)
                         return
                     }

                     if( e.target.className.includes("next") ){
                         this.nextHandler(pos,sliderLength)
                         return
                     }

                     if(X1<X2){
                         this.prevHandler(pos)
                     }else{
                         this.nextHandler(pos,sliderLength)
                     }
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

                {sliderImgs.map((item, id) => {

                    switch (id) {
                        case pos:
                            return <div key={id} className={`slide slide${id} activeSlide`}
                                        style={{
                                            backgroundImage: `url(${item})`,
                                            zIndex: "100",
                                            transform: `translate(${(id-pos)*100}%)`
                                        }}
                            >
                            </div>

                        default:
                            return (
                                <div key={id} className={`slide slide${id}`}
                                     style={{
                                         backgroundImage: `url(${item})`,
                                         transform: `translate(${(id-pos)*100}%)`
                                     }}
                                >
                                </div>
                            )
                    }
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => state
const mapDispatchToProps = {
    updateSlider
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider)