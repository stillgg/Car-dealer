import React from "react"
import TableData from "./main/TableData"
import {Route, Switch, withRouter} from "react-router-dom"
import AboutCar from "./main/AboutCar"

// import {useRoutes} from "hookrouter"
// import Routes from "./router"


const Main = (props) =>{
    return(
        <main className={"Main"}>
            <Switch>
                <Route path={"/:aboutCarPath"} component={AboutCar}/>
                <Route path="/" component={TableData}/>
            </Switch>
        </main>
    )
}

export default withRouter(Main)