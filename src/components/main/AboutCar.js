import React , {Component} from "react"

import {connect} from "react-redux"
import {getVideo} from "../../store/actions/aboutCarAction"

import Preloader from "../Preloader"


class AboutCar extends Component{

    getCar(){
        const model = this.props.cars.tableData.changedModel
        const subModel = this.props.cars.tableData.changedSubModel

        return `${model}-${subModel}`
    }

    componentDidMount() {

        const car = this.getCar()
        console.log(car)
        return this.props.getVideo(car)
    }

    render(props) {
        const preview = this.props.cars.aboutCar.videoUrl
        return(
            <React.Fragment>
                <div className="aboutCar">
                    {preview?
                        <video src={preview} muted autoPlay loop>
                        </video>
                        :
                        <Preloader/>
                    }
                </div>
                <div className="constructor">
                    <h2>Собери свой {this.getCar()}</h2>
                    <div>

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