import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"

const Nav = (props) =>{

    const model = props.cars.tableData.changedModel

    const imgsLogo = {
        Maserati: "https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Ficons%2Fmaserati-logo.svg?alt=media&token=b879b168-edc3-4c51-abc0-b343afc7ffc7",
        Porshe: "https://firebasestorage.googleapis.com/v0/b/car-dealer-27bc6.appspot.com/o/cars%2Fimage%2Ficons%2Fporshe-logo.svg?alt=media&token=6f38bcdd-b206-4f9d-90ad-9c83ddf55e1e"
    }

    return (
        <nav className={"Nav"}>
            <div className="logo-car-wrapper">
                <Link
                    to="/"
                    className="logo-car"
                    style={{
                        background: "white",
                        boxShadow: "rgb(0 0 0 / 14%) 0 0 8px 0",
                        padding: "20px 0",
                        left: "1rem",
                        position: "fixed",
                        zIndex: "100000",
                        backgroundImage: `url(${imgsLogo[model]})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "70%",
                    }}/>
            </div>

        </nav>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps,null)(Nav)