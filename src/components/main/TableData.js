import React , {Component} from "react"
import {connect} from "react-redux"

import Preloader from "../Preloader"

import {
    getCarsJSON,
    handleLoader
} from "../../store/actions/actions"

import {
    changeSubMenuCar,
    getCarList
} from "../../store/actions/tableDataAction"


class TableData extends Component{
    componentDidMount() {
        this.props.getCarsJSON()
    }

    render(){
        const state = this.props.cars
        let cars = this.props.cars.models

        if(this.props.cars.models){
            cars = Object.keys(this.props.cars.models)
        }

        return(
            <div className={"data"}>
                <div className={"row"}>
                    {
                        cars ? cars.map(
                            (item, index) => (
                                <div key={index}

                                     className={
                                         state.tableData.changedSubMenuCar === index ? "active-car" : "car"
                                     }

                                     onClick={ async ()=> {
                                         await this.props.changeSubMenuCar(index)
                                         await this.props.getCarList(item)
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

                    {/*<div className={"car-list"}>*/}

                        {
                            state.loader ?
                                <Preloader/>
                                :
                                state.tableData.changedSubMenuCar !== null ?
                                    state.tableData.urls ?
                                        state.tableData.urls.map((item, index) => {
                                            const models = this.props.cars.models
                                            const id = this.props.cars.tableData.changedSubMenuCar
                                            const selectCarModels = Object.keys(models[cars[id]])
                                            console.log('carModels',selectCarModels)

                                            return (
                                                <div key={index} className={"model"}>
                                                    <span className={"model-header"}>{selectCarModels[index]}</span>
                                                    <img src={state.tableData.urls[index]} alt="car"/>
                                                </div>
                                            )
                                        })
                                        :
                                        false
                                    :
                                    <h1>Выберите марку автомобиля</h1>
                        }

                    {/*</div>*/}

                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => state

const mapDispatchToProps = {
    getCarsJSON,
    changeSubMenuCar,
    getCarList,
    handleLoader
}


export default connect(mapStateToProps,mapDispatchToProps)(TableData)









