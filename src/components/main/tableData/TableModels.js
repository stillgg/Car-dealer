import React from "react"
import {Link} from "react-router-dom"
import ModelsWrapper from "./ModelsWrapper"
import {changeModel} from "../../../store/actions/tableDataAction";
import Specifications from "./Specifications";

class TableModels extends React.Component{
    roundWidth(clientX,width){
        return Math.round(clientX/width*10)/10
    }

    getComplictation(models,changedModel,changedSubModel){
        return models[changedModel][changedSubModel]["complictation"]
    }

    getSpec(models,changedModel,changedSubModel,complictation){
        return models[changedModel][changedSubModel]["complictation"][complictation]
    }

    nextSliderBtnHandler(length,pos){
        if(pos === length+1){
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

    calcTransform(pos){
        return (-70*pos)+15
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

    render(){
        const props = this.props
        const state = props.state
        const width = document.documentElement.clientWidth

        const pos = state.sliderType1.pos
        const touchStart = state.sliderType1.touchStart
        const touchMovePos = state.sliderType1.touchMovePos

        const slider = state.sliderType1
        const changedModel = state.tableData.changedModel

        const modelsArr = props.modelsArr


        return(
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
                     this.touchEndHandler(touchStart, touchEnd, length, pos)
                 }}
            >
                <div
                    className={`prev-btn ${!pos ? "disable" : "active"}`}
                    onClick={() => this.prevSliderBtnHandler(pos)}
                >
                    <span className={"arrow"}>&lsaquo;</span>
                </div>

                <div className={`next-btn ${pos === modelsArr.length + 1 ? "disable" : "active"}`}
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
                />

                <Specifications
                    state={state}
                    changeTableData={props.changeTableData}
                />

            </div>
        )
    }
}

export default TableModels