import React , {Component} from "react"

import {connect} from "react-redux"
import {getVideo} from "../../store/actions/aboutCarAction"

import Preloader from "../Preloader"


class AboutCar extends Component{
    componentDidMount() {
        return this.props.getVideo("Maserati-Levante")
    }

    render(props) {
        const preview = this.props.cars.aboutCar.videoUrl
        return(
            <div>
                {preview?
                    <video>
                        <source src={preview}/>
                    </video>
                    :
                    <Preloader/>
                }
                about car
            </div>
        )
    }

}

const mapStateToProps = state => state

const mapDispatchToProps = {
    getVideo
}

export default connect(mapStateToProps,mapDispatchToProps)(AboutCar)