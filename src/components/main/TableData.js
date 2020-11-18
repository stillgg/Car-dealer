import React , {Component} from "react"
import {connect} from "react-redux"

import Preloader from "../Preloader"

import {
    getCarsJSON,
    handleLoader
} from "../../store/actions/actions"

import {
    changeSubModel,
    changeModel,
    getCarList
} from "../../store/actions/tableDataAction"
import {Link} from "react-router-dom"


class TableData extends Component{
    componentDidMount() {
        this.props.getCarsJSON()
    }

    getModel(models,id){
        return models[id]
    }

    getModelsArr(models){
        return Object.keys(models)
    }


    render(){
        const state = this.props.cars

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
                                <div key={index}

                                     className={
                                         state.tableData.changedSubMenuCar === index ? "active-car" : "car"
                                     }

                                     onClick={ async ()=> {
                                         await this.props.getCarList(item)
                                         this.props.changeModel(item)
                                     } }
                                >
                                    <img
                                        src={`./img/${item.toLowerCase()}-logo.svg`} alt={item}
                                    />
                                </div>
                            ))
                            :
                            false
                    }
                </div>

                <div className={"table-models"} >
                        {
                            state.loader ?
                                <Preloader/>
                                :
                                state.tableData.changedModel !== null ?
                                    state.tableData.urls ?
                                        state.tableData.urls.map((item, index) => {
                                            const models = this.props.cars.models
                                            const changedModel = this.props.cars.tableData.changedModel
                                            const subModels = Object.keys(models[changedModel])
                                            const aboutCarPath = this.getModel(subModels,index)

                                            return (
                                                <div key={index} className={"model"}>
                                                    <span className={"model-header"}>{subModels[index]}</span>

                                                    <div className="img-wrapper">
                                                        <img src={state.tableData.urls[index]} alt="car"/>
                                                    </div>

                                                    <div className={"btn-wrapper"}>
                                                        <Link
                                                            to={`/${aboutCarPath}`} className={"btn"}
                                                            onClick={ ()=> this.props.changeSubModel(subModels[index]) }
                                                        >
                                                            выбрать
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        false
                                    :
                                    <h1 className={"title"}>Выберите марку автомобиля</h1>
                        }
                </div>
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
    handleLoader
}

export default connect(mapStateToProps,mapDispatchToProps)(TableData)








