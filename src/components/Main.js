import React from "react"
import TableData from "./main/TableData"
import {Route, Switch, withRouter} from "react-router-dom"
import AboutCar from "./main/AboutCar"


const Main = (props) =>{
    return(
        <main className={"Main"}>
            <Switch>
                <Route path={"/:item/:aboutCarPath"} component={AboutCar}/>
                {/*<Route path={"/:item"} component={AboutCar}/>*/}
                <Route path={"/:item"} component={TableData}/>
                <Route path="/" component={TableData}/>
            </Switch>
        </main>
    )
}

export default withRouter(Main)