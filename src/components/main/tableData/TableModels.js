import React from "react"
// import {Link} from "react-router-dom"
import ModelsWrapper from "./ModelsWrapper"
// import {changeModel} from "../../../store/actions/tableDataAction";
import Specifications from "./Specifications"

class TableModels extends React.Component{
    componentWillUnmount() {
        this.props.resetSliderType1()
    }

    roundWidth(clientX,width){
        return Math.round(clientX/width*10)/10
    }

    roundHeight(clientY,height){
        return Math.round(clientY/height*10)/10
    }

    getComplictation(models,changedModel,changedSubModel){
        return models[changedModel][changedSubModel]["complictation"]
    }

    getSpec(models,changedModel,changedSubModel,complictation){
        return models[changedModel][changedSubModel]["complictation"][complictation]
    }

    nextSliderBtnHandler(length,pos){
        if(pos+1 === length){
            return this.props.updateSliderType1
        }
        return this.props.updateSliderType1(
            {
                pos:pos+1
            }
        )
    }

    prevSliderBtnHandler(pos){
        if(!pos){
            return this.props.updateSliderType1()
        }
        this.props.updateSliderType1(
            {
                pos:pos-1
            }
        )
    }

    roundValue(val,round){
        return Math.round( val * round)/round
    }

    calcTransform(pos, axis) {
        const modelInactive = document.querySelector("a.inactive")
        const clientWidth = document.documentElement.clientWidth

        const x = modelInactive? modelInactive.clientWidth: 0
        const y = modelInactive? modelInactive.clientHeight: 0

        if (axis === "X") {
            // return (-x * pos) + (clientWidth - x)/2
            return (-x * pos) + clientWidth * 0.15
        }

        if (axis === "Y") {
            return (-y * pos)
        }
    }

    touchStartHandler(touchStart){
        this.props.updateSliderType1({touchStart})
    }

    touchEndHandler(touchStart,touchEnd,length,pos){
        const res =touchStart-touchEnd
        if(res<0 && -res>0.25){
            this.prevSliderBtnHandler(pos)
        }
        if(res>0 && res>0.25){
            this.nextSliderBtnHandler(length,pos)
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

    getPostfixItemSpecInfo(type){
        const obj = {
            boost: {
                name: "разгон 0-100 км/ч",
                postfix:"c"
            },
            maxSpeed: {
                name: "максимальная скорость",
                postfix: "км/ч",
            },
            power: {
                name: "мощность",
                postfix: "л.с."
            },
            Engine: {
                name: "двигатель",
                postfix: ""
            },
            ed: {
                name: "объём двигателя",
                postfix: "л"
            }
        }

        return obj[type]
    }

    render(){
        const props = this.props
        const state = props.state
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight

        const pos = state.sliderType1.pos
        const touchStart = state.sliderType1.touchStart
        const touchMovePos = state.sliderType1.touchMovePos

        const slider = state.sliderType1
        const changedModel = state.tableData.changedModel

        const modelsArr = Object.keys(state.models[changedModel])


        return(
            <div className={"table-models-view-1"}
                 onTouchStart={
                     e => {
                         const clientX = e.touches[0].clientX
                         const clientY = e.touches[0].clientY

                         this.touchStartHandler(
                             this.roundWidth(clientX, width)
                         )
                         // this.touchStartHandler(
                         //     this.roundHeight(clientY, height)
                         // )
                     }
                 }
                 onTouchMove={e => {
                     const clientX = e.changedTouches[0].clientX
                     const clientY = e.changedTouches[0].clientY

                     const touchMove = this.roundWidth(clientX, width)
                     // const touchMove = this.roundHeight(clientY, height)


                     const res = touchStart - touchMove
                     this.getPos(res * 1.3)
                 }}

                 onTouchEnd={e => {
                     const touchEnd = this.roundWidth(e.changedTouches[0].clientX, width)
                     // const touchEnd = this.roundHeight(e.changedTouches[0].clientY, height)
                     const length = modelsArr.length
                     this.touchEndHandler(touchStart, touchEnd, length, pos)
                 }}
            >
                <div
                    className={`prev-btn ${!pos ? "disable" : "active"}`}
                    onClick={() => this.prevSliderBtnHandler(pos)}
                >
                    <span className={"arrow"}>&lsaquo;</span>
                </div>

                <div className={`next-btn ${pos+1 === modelsArr.length ? "disable" : "active"}`}
                     onClick={() =>{
                         this.nextSliderBtnHandler(modelsArr ? modelsArr.length : 0,pos)
                     }}
                >
                    <span className={"arrow"}>&rsaquo;</span>
                </div>

                <ModelsWrapper
                    state={state}
                    pos={pos}
                    touchMovePos={touchMovePos}
                    changedModel={changedModel}
                    slider={slider}
                    calcTransform={this.calcTransform}
                    getModel={this.getModel}
                    getComplictation={this.getComplictation}
                    changeTableData={this.props.changeTableData}
                    changeSubModel={this.props.changeSubModel}
                    roundValue={this.roundValue}
                />

                <Specifications
                    state={state}
                    changeTableData={props.changeTableData}
                    getPostfixItemSpecInfo={this.getPostfixItemSpecInfo}
                />

            </div>
        )
    }
}

export default TableModels