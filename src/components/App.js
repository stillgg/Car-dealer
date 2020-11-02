import React , {Component} from "react"
import Nav from "./Nav"
import Main from "./Main"

import '../App.scss'

class App extends Component{

    render(props){
        return(
            <React.Fragment>
                <Nav/>
                <Main/>
            </React.Fragment>
        )
    }

}

export default App