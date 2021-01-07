import React , {Component} from "react"

import {connect} from "react-redux"
import {
    changeIconSelect,
    changeOptionSelect,
    getIcons,
    getVideo,
    updateAboutCar
} from "../../store/actions/aboutCarAction"

import Preloader from "../preloaders/Preloader"
import Slider from "../Slider"
import PreloaderV2 from "../preloaders/PreloaderV2"
import {getImgSlider, getNextImgSlider, updateImgSlider, updateSlider} from "../../store/actions/actions"


class AboutCar extends Component{

    imgSliderHandler(){
        const model = this.props.cars.tableData.changedModel
        const subModel = this.props.cars.tableData.changedSubModel

        const conf = this.props.cars.models[model][subModel].configuration.body

        let key = ""

        for(const i in this.props.cars.aboutCar.iconSelect){
            if(!conf[i]){
                continue
            }
            key+= conf[i][this.props.cars.aboutCar.iconSelect[i]] + "_"
        }

        // if(this.props.cars.slider.imgUrls !== this.props.cars.slider.prevImgUrls){
        //
        //     this.props.updateSlider({
        //         prevImgUrls: this.props.cars.slider.imgUrls
        //     })
        // }

        this.props.updateSlider(
            {prevImgUrls: this.props.cars.slider.imgUrls}
        )

        this.props.getImgSlider(model,subModel ,key.slice(0,-1) )
        // if(this.props.cars.slider.nextImgUrls === null){
        // }

        const prevImgSlide = this.props.cars.slider.imgUrls

        // this.props.getNextImgSlider(model,subModel ,key.slice(0,-1),prevImgSlide)
    }

    optionClickHandler(targetNode,nodeList,optionSelect){
        for(const node of nodeList){

            if(targetNode === node){
                node.classList.add("active")
            }else{
                node.classList.remove("active")
            }

        }

        this.props.changeOptionSelect(optionSelect)
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

    getCarInfo(model,subModel){
        return this.props.cars.models[model][subModel].configuration
    }

    iconPanelHandler(bodyConfiguration,optionSelect){
        return Object.keys(bodyConfiguration)[optionSelect]
    }

    iconClickHandler(targetNode,nodeList,bodyConfiguration,iconSelect){
        const optionSelect = this.props.cars.aboutCar.optionSelect
        const key = Object.keys(bodyConfiguration)[optionSelect]

        for(const node of nodeList){

            if(targetNode === node){
                node.classList.add("active")
            }else{
                node.classList.remove("active")
            }

        }

        this.props.changeIconSelect(
            {
                [key] :iconSelect
            }
        )
    }

    componentDidMount() {
        const carName = this.getCarName()

        const model = this.props.cars.tableData.changedModel
        const subModel = this.props.cars.tableData.changedSubModel

        // const carInfo = this.props.cars.models[model][subModel]
        // const configuration = carInfo.configuration
        // console.log(configuration)
        // const optionSelect = this.getFirstOption(model,subModel)

        this.props.getVideo(carName)
        this.props.getIcons(model,subModel)
    }

    render(props) {
        const preview = this.props.cars.aboutCar.videoUrl
        const optionSelect = this.props.cars.aboutCar.optionSelect

        const model = this.props.cars.tableData.changedModel
        const subModel = this.props.cars.tableData.changedSubModel

        const carInfo = this.props.cars.models[model][subModel]
        const bodyConfiguration = carInfo.configuration.body
        // const complictation = carInfo.complictation
        const icons = this.props.cars.aboutCar.iconsUrls
        // console.log("icons",icons[Object.keys(bodyConfiguration)[optionSelect]])
        const iconSelect = this.props.cars.aboutCar.iconSelect

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
                                Object.keys(bodyConfiguration).map(
                                    (item, index) => {
                                        if(index === optionSelect){
                                            return (
                                                <li key={index} className={"option active"}
                                                     onClick={(e)=>{
                                                         this.optionClickHandler(
                                                             e.target,
                                                             e.target.parentNode.children,
                                                             index
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
                                                            e.target.parentNode.children,
                                                            index
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
                            {
                                icons ?
                                    icons[this.iconPanelHandler(bodyConfiguration,optionSelect)]
                                        .map((item, index) => {
                                            const key = Object.keys(bodyConfiguration)[optionSelect]

                                            const activeIconEl = iconSelect[key]

                                            if (index === activeIconEl) {
                                                return (
                                                    <li className="icon active" key={index}
                                                        onClick={(e)=>{
                                                            this.iconClickHandler(
                                                                e.target,
                                                                e.target.parentNode.children,
                                                                bodyConfiguration,
                                                                index
                                                            )
                                                        }}>
                                                        <img src={`${item}`} alt="icon"/>
                                                    </li>)
                                            }

                                            return (
                                                <li className="icon" key={index}
                                                    onClick={async(e)=>{
                                                        await this.iconClickHandler(
                                                            e.target,
                                                            e.target.parentNode.children,
                                                            bodyConfiguration,
                                                            index
                                                        )
                                                        this.imgSliderHandler()
                                                    }}>
                                                    <img src={`${item}`} alt="icon"/>
                                                </li>
                                            )
                                        }
                                    ) :
                                    <div style={{
                                        width: "100%",
                                        height: "50px"
                                    }}>
                                        <PreloaderV2/>
                                    </div>

                            }
                        </ul>
                    </div>
                </div>
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