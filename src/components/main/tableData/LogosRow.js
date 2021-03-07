import React from "react"
import {NavLink} from "react-router-dom"

const LogosRow = (props) =>{
    const modelsArr = props.modelsArr
    const state = props.state
    const changedModel = props.changedModel

    return(
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

                                     await props.getCarList(item)
                                     props.changeModel(item)
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
    )
}

export default LogosRow