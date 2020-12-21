import React , {Component} from "react"

import {connect} from "react-redux"
import {getVideo} from "../../store/actions/aboutCarAction"

import Preloader from "../preloaders/Preloader"
import Slider from "../Slider"
import PreloaderV2 from "../preloaders/PreloaderV2";


class AboutCar extends Component{

    optionClickHandler(targetNode,nodeList){

        for(const node of nodeList){

            if(targetNode === node){
                node.classList.add("active")
            }else{
                node.classList.remove("active")
            }

        }
    }

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
        const configuration = carInfo.configuration.body
        // const complictation = carInfo.complictation

        return(
            <React.Fragment>
                <div className="preview">
                    {preview ?
                        <video src={preview} muted autoPlay loop>
                        </video>
                        :
                        <PreloaderV2/>
                    }
                </div>
                <div className="constructor">
                    <h2 className="header">Собери свой {this.getCarName()}</h2>
                    <div className="main">
                        <Slider/>
                        <ul className="options">
                            {
                                Object.keys(configuration).map(
                                    (item, index) => {
                                        if(!index){
                                            return (
                                                <li key={index} className={"option active"}
                                                     onClick={(e)=>{
                                                         this.optionClickHandler(
                                                             e.target,
                                                             e.target.parentNode.children
                                                         )
                                                     }}
                                                >
                                                    {item}
                                                </li>
                                            )
                                        }
                                        return <li key={index} className={"option"}
                                                    onClick={(e)=>{
                                                        this.optionClickHandler(
                                                            e.target,
                                                            e.target.parentNode.children
                                                        )
                                                    }}
                                        >
                                            {item}
                                        </li>

                                    }
                                )
                            }
                        </ul>
                        <ul className="icons-panel">
                            <li className="icon">
                                <img src="https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Fconstructor%2FMaserati%2Fmaserati-Levante%2Ficons%2Fbackground%2FBianco.jpg?alt=media&token=2050f627-e7cc-44f4-a278-e3f192487b2d" alt=""/>
                            </li>
                            <li className="icon">
                                <img src="https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Fconstructor%2FMaserati%2Fmaserati-Levante%2Ficons%2Fbackground%2FBlueEmozione.jpg?alt=media&token=f7519dfe-9653-404e-8016-95a758f18b97" alt=""/>
                            </li>
                            <li className="icon">
                                <img src="https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Fconstructor%2FMaserati%2Fmaserati-Levante%2Ficons%2Fbackground%2FNeroRibelle.jpg?alt=media&token=461ad219-c015-4f12-817c-83817dfe6d7a" alt=""/>
                            </li>
                        </ul>
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