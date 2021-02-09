import React from "react"
import PreloaderV2 from "../../preloaders/PreloaderV2"

class ConfPanel extends React.Component{

    imgSliderHandler(state,type){
        const model = state.tableData.changedModel
        const subModel = state.tableData.changedSubModel

        const conf = state.models[model][subModel].configuration[type]

        console.log("type2",type)

        this.props.updateSlider(
            {prevImgUrls: state.slider[type].imgUrls},
            type
        )

        // const iconSelect = state.aboutCar.iconSelect
        const iconSelect = state.slider.iconSelect
        console.log("iconSelect1",iconSelect)

        this.props.getImgSlider(model,subModel,conf,iconSelect,type)
    }
    optionClickHandler(targetNode,nodeList,optionSelect,type){
        for(const node of nodeList){

            if(targetNode === node){
                node.classList.add("active")
            }else{
                node.classList.remove("active")
            }

        }
        this.props.changeOptionSelect(optionSelect,type)
    }
    iconClickHandler(state,targetNode,nodeList,configuration,iconSelect,type){
        // const optionSelect = state.aboutCar.optionSelect
        const optionSelect = state.slider[type].optionSelect

        const key = Object.keys(configuration)[optionSelect]

        for(const node of nodeList){

            if(targetNode === node){
                node.classList.add("active")
            }else{
                node.classList.remove("active")
            }

        }

        this.props.changeIconSelect(
            {
                [key] :iconSelect
            },
            type
        )

    }
    iconPanelHandler(configuration,optionSelect){
        return Object.keys(configuration)[optionSelect]
    }

    render(props) {
        const type = this.props.type
        const state = this.props.state
        const model = state.tableData.changedModel
        const subModel = state.tableData.changedSubModel

        const carInfo = state.models[model][subModel]
        const configuration = carInfo.configuration[type]
        // const optionSelect = state.aboutCar.optionSelect
        const optionSelect = state.slider[type].optionSelect
        // const icons = state.aboutCar.iconsUrls
        // const iconSelect = state.aboutCar.iconSelect
        const icons = state.slider.iconsUrls

        const iconSelect = state.slider.iconSelect
        console.log("configuration",carInfo.configuration)
        return(
            <React.Fragment>
                <ul className="options">
                    {
                        Object.keys(configuration).map(
                            (item, index) => {
                                console.log("optionSelect",optionSelect)
                                console.log("type",type)
                                    return (
                                        <li key={index}
                                            className={`option ${index === optionSelect?"active":""}`}
                                            onClick={(e) => {
                                                this.optionClickHandler(
                                                    e.target,
                                                    e.target.parentNode.children,
                                                    index,
                                                    type
                                                )
                                            }}
                                        >
                                            {item}
                                        </li>
                                    )
                                })
                    }
                </ul>
                <ul className="icons-panel">
                    {
                        icons ?
                            icons[this.iconPanelHandler(configuration, optionSelect)]
                                .map((item, index) => {
                                        const key = Object.keys(configuration)[optionSelect]
                                        // console.log("key",iconSelect)
                                        const activeIconEl = iconSelect[key]

                                            return (
                                                <li className={`icon ${index === activeIconEl?"active":""}`}
                                                    key={index}
                                                    onClick={ async e=> {

                                                        if(index === activeIconEl){
                                                            return
                                                        }

                                                        await this.iconClickHandler(
                                                            state, //state before click
                                                            e.target,
                                                            e.target.parentNode.children,
                                                            configuration,
                                                            index,
                                                            type
                                                        )

                                                        const stateAfterClick = this.props.state

                                                        this.imgSliderHandler(stateAfterClick,type)
                                                    }}>
                                                    <img src={`${item}`} alt="icon"/>
                                                </li>
                                            )
                                    }
                                ) :
                            <div style={{
                                width: "100%",
                                height: "50px"
                            }}>
                                <PreloaderV2/>
                            </div>

                    }
                </ul>
            </React.Fragment>
        )
    }
}

export default ConfPanel