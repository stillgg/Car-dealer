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
    updateSliderType1,
    changeTableData,
    resetSliderType1
} from "../../store/actions/tableDataAction"

import Preloader from "../preloaders/Preloader"
import Greeting from "./Greeting"
import LogosRow from "./tableData/LogosRow"
import TableModels from "./tableData/TableModels"


class TableData extends Component{

    getSpec(models,changedModel,changedSubModel,complictation){
        return models[changedModel][changedSubModel]["complictation"][complictation]
    }

    getModelsArr(models){
        return Object.keys(models)
    }

    componentDidMount() {
        this.props.getCarsJSON()
    }

    render(){
        const state = this.props.cars
        // const pos = state.sliderType1.pos
        const changedModel = state.tableData.changedModel
        let modelsArr

        if(this.props.cars.models){
            modelsArr = this.getModelsArr(state.models)
        }

        return(
            <div className={"data"}>

                <LogosRow
                    modelsArr={modelsArr}
                    state={state}
                    changedModel={changedModel}
                    changeModel={this.props.changeModel}
                    getCarList={this.props.getCarList}
                />

                {
                    modelsArr ?
                        state.tableData.changedModel !== null ?
                            state.tableData.urls ?
                                <TableModels
                                    state={state}
                                    modelsArr={modelsArr}
                                    changeTableData={this.props.changeTableData}
                                    updateSliderType1={this.props.updateSliderType1}
                                    changeSubModel={this.props.changeSubModel}
                                    resetSliderType1={this.props.resetSliderType1}
                                />
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

const mapStateToProps = state => state

const mapDispatchToProps = {
    getCarsJSON,
    changeSubModel,
    changeModel,
    getCarList,
    handleLoader,
    changeView,
    updateSliderType1,
    changeTableData,
    resetSliderType1
}

export default connect(mapStateToProps,mapDispatchToProps)(TableData)