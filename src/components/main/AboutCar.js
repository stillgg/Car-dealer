import React , {Component} from "react"

import {connect} from "react-redux"


import PreloaderV2 from "../preloaders/PreloaderV2"
import Constructor from "./aboutCar/Constructor"
import Nav from "../Nav"

import {
    changeIconSelect,
    changeOptionSelect,
    getIcons,
    getVideo
} from "../../store/actions/aboutCarAction"
import {getImgSlider, getNextImgSlider, updateImgSlider, updateSlider} from "../../store/actions/actions"



class AboutCar extends Component{
    getModel(state){
        return state.cars.tableData.changedModel
    }

    getSubModel(state){
        return state.cars.tableData.changedSubModel
    }

    getCarName(state){
        return `${this.getModel(state)}-${this.getSubModel(state)}`
    }

    getCarInfo(model,subModel){
        return this.props.cars.models[model][subModel].configuration
    }

    componentDidMount() {
        const state = this.props
        const carName = this.getCarName(state)

        const model = state.cars.tableData.changedModel
        const subModel = state.cars.tableData.changedSubModel
        this.props.getVideo(carName)
        this.props.getIcons(model,subModel)
    }

    render(props) {
        const state = this.props
        const preview = state.cars.aboutCar.videoUrl

        return(
            <React.Fragment>
                <Nav/>
                <div className="preview">
                    {preview ?
                        <video muted autoPlay loop playsinline>
                            <source src={preview} type="video/mp4"/>
                            Your browser does not support HTML5 video.
                        </video>
                        :
                        <PreloaderV2/>
                    }

                    <a href="#constructor" className="arrow" style={{
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                        top: "85%",
                        left: "50%",
                        transform: "translateX(-50%) ",
                        cursor: "pointer",
                        opacity: ".6",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <img
                            className="arrow-down"
                            src="https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Ficons%2FarrowDown.png?alt=media&token=29d5de7c-aba6-4de0-856c-4bd02175616d"
                            alt="arrowDown"/>
                    </a>
                </div>


                <Constructor
                    state={state}
                    carName={this.getCarName(state)}
                    changedModel={this.getModel}
                    getSubModel={this.getSubModel}
                    changeIconSelect={this.props.changeIconSelect}
                    updateSlider={this.props.updateSlider}
                    getImgSlider={this.props.getImgSlider}
                    changeOptionSelect={this.props.changeOptionSelect}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
    getVideo,
    getIcons,
    changeOptionSelect,
    changeIconSelect,
    getImgSlider,
    updateSlider,
    getNextImgSlider,
    updateImgSlider
}

export default connect(mapStateToProps,mapDispatchToProps)(AboutCar)