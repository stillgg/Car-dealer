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
        // this.props.getCarList('Maserati')
    }

    render(){
        const state = this.props.cars
        let cars = this.props.cars.models

        if(this.props.cars.models){
            cars = Object.keys(this.props.cars.models)
        }

        console.log(state.tableData.urls)

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

                                     onClick={ ()=> {
                                         this.props.changeSubMenuCar(index)
                                         this.props.getCarList(item)
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

                    <div className={"car-list"}>

                        {

                            state.tableData.changedSubMenuCar !== null ?
                                state.loader ?
                                    <Preloader/>
                                    :
                                    state.tableData.urls ?
                                        state.tableData.urls.map((item, index) => {
                                            return (
                                                <img src={state.tableData.urls[index]} alt="car"/>
                                            )
                                        })
                                        :
                                        false
                                :
                                <h1>Выберите автомобиль</h1>
                        }
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = (state)=>state

const mapDispatchToProps = {
    getCarsJSON,
    changeSubMenuCar,
    getCarList,
    handleLoader
}


export default connect(mapStateToProps,mapDispatchToProps)(TableData)









