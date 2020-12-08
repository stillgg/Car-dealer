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

        const slides = document.querySelectorAll(".slide")

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
            <div className="slider">

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

                        // case prevPos:
                        //     return <div key={id} className={`slide slide${id} prevSlide`}
                        //                 style={{
                        //                     backgroundImage: `url(${item})`,
                        //                     transform: `translate(${(id-pos)*100}%)`
                        //                 }}
                        //     >
                        //     </div>

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