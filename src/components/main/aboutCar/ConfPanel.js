import React from "react"
import Options from "./Options"
import IconsPanel from "./IconsPanel"

class ConfPanel extends React.Component{

    getKey(configuration,optionSelect){
        return Object.keys(configuration)[optionSelect]
    }

    getOptionsArr(configuration,type){
        const conf = Object.keys(configuration)

        switch (type) {
            case "salon":
                return conf.filter(item => item !== "background")

            default:
                return conf.filter(item => item !== "seats")
        }
    }

    render(props) {
        const type = this.props.type
        const state = this.props.state
        const model = state.tableData.changedModel
        const subModel = state.tableData.changedSubModel

        const carInfo = state.models[model][subModel]
        const configuration = carInfo.configuration[type]

        const optionSelect = state.slider[type].optionSelect

        const optionsArr = this.getOptionsArr(configuration,type)

        return(
            <React.Fragment>
                <Options
                    type={type}
                    optionsArr={optionsArr}
                    optionSelect={optionSelect}
                    changeOptionSelect={this.props.changeOptionSelect}
                />

                <IconsPanel
                    type={type}
                    optionsArr={optionsArr}
                    state={state}
                    optionSelect={optionSelect}
                    changeIconSelect={this.props.changeIconSelect}
                    updateSlider={this.props.updateSlider}
                    getImgSlider={this.props.getImgSlider}
                    widgets={this.props.widgets}
                    widgetsSelect={this.props.widgetsSelect}
                    changePrevImgSlider={this.props.changePrevImgSlider}
                />
            </React.Fragment>
        )
    }
}

export default ConfPanel