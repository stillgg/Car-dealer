import React , {Component} from "react"
import {connect} from "react-redux"


import {getCarsJSON} from "../../store/actions/actions"
import {changeSubMenuCar, getCarList} from "../../store/actions/tableDataAction"


class TableData extends Component{
    componentDidMount() {
        this.props.getCarsJSON()
        // this.props.getCarList('Maserati')
    }

    render(){
        const state = this.props.cars
        let cars = this.props.cars.models
        let carList

        if(this.props.cars.models){
            cars = Object.keys(this.props.cars.models)
        }


        console.log(state.tableData.urls)
        // if (state.tableData.changedSubMenuCar !== null) {
        //     if (state.tableData.urls) {
        //         carList = (
        //             <div className={"car-list"}>
        //                 <p>{cars[state.tableData.changedSubMenuCar]}</p>
        //                 <img src={state.tableData.urls[0]} alt="car"/>
        //                 <img src={state.tableData.urls[1]} alt="car"/>
        //             </div>)
        //     }
        // } else {
        //     carList = <h1>Выберите автомобиль</h1>
        // }

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
                            null
                    }
                </div>

                <div className={"table-models"} >
                    {/*{carList}*/}

                    <div className={"car-list"}>
                        {
                            state.tableData.changedSubMenuCar !== null?
                            state.tableData.urls?
                                state.tableData.urls.map((item,index)=> {
                                    return(
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
    getCarList
}


export default connect(mapStateToProps,mapDispatchToProps)(TableData)









