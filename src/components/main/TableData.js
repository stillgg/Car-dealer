import React , {Component} from "react"
import {connect} from "react-redux"
import {Link, NavLink} from "react-router-dom"

import {
    getCarsJSON,
    handleLoader
} from "../../store/actions/actions"

import {
    changeSubModel,
    changeModel,
    getCarList,
    changeView,
    updateSliderType1, changeTableData
} from "../../store/actions/tableDataAction"

import Preloader from "../preloaders/Preloader"
import Greeting from "./Greeting"


class TableData extends Component{
    roundWidth(clientX,width){
        return Math.round(clientX/width*10)/10
    }

    getComplictation(models,changedModel,changedSubModel){
        return models[changedModel][changedSubModel]["complictation"]
    }

    nextSliderBtnHandler(length){
        const pos = this.props.cars.sliderType1.pos
        if(pos === length+1){
            return
        }
        return this.props.updateSliderType1(
            {
                pos:pos+1
            }
            )
    }

    prevSliderBtnHandler(){
        const pos = this.props.cars.sliderType1.pos
        if(!pos){
            return this.props.updateSliderType1()
        }
        this.props.updateSliderType1(
            {
                pos:pos-1
            }
            )
    }

    calcTransform(pos){
        return (-63*pos)+20
    }

    touchStartHandler(touchStart){
        this.props.updateSliderType1({touchStart})
    }

    touchEndHandler(touchStart,touchEnd,length){
        const res =touchStart-touchEnd
        if(res<0 && -res>0.25){
            this.prevSliderBtnHandler()
        }
        if(res>0 && res>0.25){
            this.nextSliderBtnHandler(length)
        }
        this.props.updateSliderType1({
            touchStart:0,
            touchMovePos:0
        })
    }

    getModel(models,id){
        return models[id]
    }

    getModelsArr(models){
        return Object.keys(models)
    }

    getPos(touchMovePos){
        this.props.updateSliderType1({touchMovePos})
    }

    componentDidMount() {
        this.props.getCarsJSON()
    }

    render(){
        const pos = this.props.cars.sliderType1.pos
        const touchStart = this.props.cars.sliderType1.touchStart
        const width = document.documentElement.clientWidth
        const touchMovePos = this.props.cars.sliderType1.touchMovePos

        const state = this.props.cars
        const changedViewMode = this.props.cars.tableData.viewMode
        const slider = this.props.cars.sliderType1
        const changedModel = this.props.cars.tableData.changedModel
        const changedSubModel = this.props.cars.tableData.changedSubModel
        
        let modelsArr

        if(this.props.cars.models){
            modelsArr = this.getModelsArr(this.props.cars.models)
        }

        return(
            <div className={"data"}>
                <div className={"row"}>
                    {
                        modelsArr ? modelsArr.map(
                            (item, index) => (
                                <NavLink key={index}

                                      className={
                                          state.tableData.changedSubMenuCar === index ? "active-car" : "car"
                                      }

                                      onClick={async () => {

                                          if(changedModel === item){
                                              return
                                          }

                                          await this.props.getCarList(item)
                                          this.props.changeModel(item)
                                      }}

                                     to={item}
                                >
                                    <img
                                        src={`./img/${item.toLowerCase()}-logo.svg`} alt={item}
                                    />
                                </NavLink>
                            ))
                            :
                            false
                    }
                </div>

                {/*<div className={"btn-view"}*/}
                {/*    onClick={()=>this.props.changeView(state.tableData.view)}*/}
                {/*>*/}
                {/*    <img src="./img/icons/iconMenu1.svg" alt=""/>*/}
                {/*</div>*/}
                {
                    modelsArr ?
                        state.tableData.changedModel !== null ?
                            state.tableData.urls ?
                                <div className={"table-models-view-1"}
                                     onTouchStart={
                                         e => {
                                             const clientX = e.touches[0].clientX
                                             this.touchStartHandler(
                                                 this.roundWidth(clientX, width)
                                             )

                                         }
                                     }
                                     onTouchMove={e => {
                                         const clientX = e.changedTouches[0].clientX
                                         const touchMove = this.roundWidth(clientX, width)
                                         const res = touchStart - touchMove

                                         this.getPos(res * 1.3)
                                     }}

                                     onTouchEnd={e => {
                                         const touchEnd = this.roundWidth(e.changedTouches[0].clientX, width)
                                         const length = modelsArr.length

                                         this.touchEndHandler(touchStart, touchEnd, length)
                                     }}
                                >
                                    <div
                                        className={`prev-btn ${!pos ? "disable" : "active"}`}
                                        onClick={() => this.prevSliderBtnHandler()}
                                    >
                                        <span className={"arrow"}>&lsaquo;</span>
                                    </div>

                                    <div className={`next-btn ${pos === modelsArr.length + 1 ? "disable" : "active"}`}
                                         onClick={() => this.nextSliderBtnHandler(modelsArr ? modelsArr.length : 0)}
                                    >
                                        <span className={"arrow"}>&rsaquo;</span>
                                    </div>

                                    <div className="models-wrapper"
                                         style={{
                                             transform: `translateX(${this.calcTransform(pos + touchMovePos)}%)`,
                                             transition: ".3s all"
                                         }}
                                    >
                                        {
                                            state.tableData.urls.map((item, index) => {
                                                const models = this.props.cars.models
                                                // const changedModel = this.props.cars.tableData.changedModel
                                                const subModels = Object.keys(models[changedModel])
                                                const aboutCarPath = this.getModel(subModels, index)
                                                const complictation = this.getComplictation(models,changedModel,subModels[index])
                                                const complictationKeys = Object.keys(complictation)
                                                return (
                                                    <Link
                                                        key={index} className={
                                                        `model ${index === slider.pos ? "active" : "inactive"}`
                                                    }
                                                        // to={
                                                        //     changedViewMode === "type-1"?
                                                        //         `/${changedModel}`
                                                        //         :
                                                        //         `/${changedModel}/${aboutCarPath}`
                                                        // }
                                                        to={`${changedModel}/${aboutCarPath}`}
                                                        onClick={() => {
                                                            this.props.changeSubModel(subModels[index])
                                                        }
                                                        }
                                                    >
                                                        <span className="model-header">{subModels[index]}</span>

                                                        <div className="img-wrapper">
                                                            <img className={"car"} src={state.tableData.urls[index]}
                                                                 alt="car"/>
                                                        </div>
                                                        {/*<div className={"btn-wrapper"}>*/}
                                                        {/*    <Link*/}
                                                        {/*        to={`/${changedModel}/${aboutCarPath}`} className={"btn"}*/}
                                                        {/*        onClick={ ()=> this.props.changeSubModel(subModels[index]) }*/}
                                                        {/*    >*/}
                                                        {/*        выбрать*/}
                                                        {/*    </Link>*/}
                                                        {/*</div>*/}
                                                        <div className="specifications">
                                                            <div>
                                                                <h2 className="header">
                                                                    Комплектаци{complictationKeys.length>1?"и":"я"}
                                                                    <span
                                                                        className="btn-header"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            position: "absolute",
                                                                            content: "",
                                                                            width: "25px",
                                                                            height: "25px",
                                                                            backgroundImage: "url('./img/icons/iconPlus.svg')",
                                                                            backgroundSize: "cover",
                                                                            marginLeft: "15px",
                                                                            top: "50%",
                                                                            transform: "translateY(-40%)"
                                                                        }}

                                                                        onClick={
                                                                            e=>{
                                                                                const complictationInfo = !state.tableData.complictationInfo
                                                                                this.props.changeTableData(
                                                                                    {complictationInfo}
                                                                                    )
                                                                            }
                                                                        }
                                                                    >
                                                                </span>
                                                                </h2>
                                                            </div>
                                                            <div className="complictation">
                                                                {
                                                                    complictationKeys.map(item=>{
                                                                        return (
                                                                            <div className="info">
                                                                                <span>{item.split("_").join(" ")}</span>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                :
                                <Preloader/>
                            :
                            <Greeting/>
                        :
                        false
                }
            </div>
        )
    }

}

const mapStateToProps = (state) => state

const mapDispatchToProps = {
    getCarsJSON,
    changeSubModel,
    changeModel,
    getCarList,
    handleLoader,
    changeView,
    updateSliderType1,
    changeTableData
}

export default connect(mapStateToProps,mapDispatchToProps)(TableData)