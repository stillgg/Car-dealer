import React  from "react"
import Nav from "./Nav"
import Main from "./Main"
import {BrowserRouter} from "react-router-dom"

import '../App.scss'


const App = () =>{
    return(
        <BrowserRouter>
            <React.Fragment>
                <Nav/>
                <Main/>
            </React.Fragment>
        </BrowserRouter>
    )
}


export default App
