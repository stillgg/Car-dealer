import React , {Component} from "react"

import {connect} from "react-redux"
import {getVideo} from "../../store/actions/aboutCarAction"

import Preloader from "../Preloader"
import Slider from "../Slider"


class AboutCar extends Component{

    getModel(){
        return this.props.cars.tableData.changedModel
    }

    getSubModel(){
        return this.props.cars.tableData.changedSubModel
    }

    getCarName(){
        return `${this.getModel()}-${this.getSubModel()}`
    }

    componentDidMount() {
        const carName = this.getCarName()

        const model = this.props.cars.tableData.changedModel
        const subModel = this.props.cars.tableData.changedSubModel

        // const carInfo = this.props.cars.models[model][subModel]
        // const configuration = carInfo.configuration
        // console.log(configuration)
        
        this.props.getVideo(carName)
    }

    render(props) {
        const preview = this.props.cars.aboutCar.videoUrl

        const model = this.props.cars.tableData.changedModel
        const subModel = this.props.cars.tableData.changedSubModel

        const carInfo = this.props.cars.models[model][subModel]
        const configuration = carInfo.configuration
        // const complictation = carInfo.complictation

        return(
            <React.Fragment>
                  <div className="preview">
                    {preview?
                        <video src={preview} muted autoPlay loop>
                        </video>
                        :
                        <Preloader/>
                    }
                </div>
                <div className="constructor">
                    <h2 className="header">Собери свой {this.getCarName()}</h2>
                    <div className="main">
                        <Slider/>
                        <div className="options">
                            {
                                Object.keys(configuration).map(
                                    (item,index) =>{
                                        return(
                                            <div key={index} className={"option"}>
                                                {item}
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => state

const mapDispatchToProps = {
    getVideo
}

export default connect(mapStateToProps,mapDispatchToProps)(AboutCar)