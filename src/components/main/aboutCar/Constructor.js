import React from "react"
import Slider from "../../slider/Slider"

class Constructor extends React.Component{

    render(props){
        const carName = this.props.carName

        return(
            <div className="constructor" id="constructor">
                <h2 className="header">
                    Собери свой
                    <br/>
                    {carName}
                </h2>
                <div className="main">
                    <Slider
                        type="body"
                    />

                    <Slider
                        type="salon"
                    />
                </div>
            </div>
        )
    }
}

export default Constructor