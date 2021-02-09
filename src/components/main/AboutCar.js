import React , {Component} from "react"

import {connect} from "react-redux"
import {
    changeIconSelect,
    changeOptionSelect,
    getIcons,
    getVideo
} from "../../store/actions/aboutCarAction"

import PreloaderV2 from "../preloaders/PreloaderV2"
import {getImgSlider, getNextImgSlider, updateImgSlider, updateSlider} from "../../store/actions/actions"
import Constructor from "./aboutCar/Constructor"


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
                <div className="preview">
                    {preview ?
                        <video muted autoPlay loop playsinline>
                            <source src={preview} type="video/mp4"/>
                            Your browser does not support HTML5 video.
                        </video>
                        :
                        <PreloaderV2/>
                    }
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
    // updateAboutCar,
    changeOptionSelect,
    changeIconSelect,
    getImgSlider,
    updateSlider,
    getNextImgSlider,
    updateImgSlider
}

export default connect(mapStateToProps,mapDispatchToProps)(AboutCar)