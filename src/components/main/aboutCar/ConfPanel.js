import React from "react"
import PreloaderV2 from "../../preloaders/PreloaderV2"

class ConfPanel extends React.Component{

    imgSliderHandler(state,type,key,widgets,widgetsSelect){
        const model = state.tableData.changedModel
        const subModel = state.tableData.changedSubModel

        const conf = state.models[model][subModel].configuration[type]

        this.props.updateSlider(
            {prevImgUrls: state.slider[type].imgUrls},
            type
        )

        const iconSelect = state.slider.iconSelect

        const confBody = state.models[model][subModel].configuration.body
        const confSalon = state.models[model][subModel].configuration.salon

        if(key === "background"){
            this.props.getImgSlider(
                model,subModel,
                confSalon,iconSelect,
                "salon",widgets,widgetsSelect
            )
        }

        if(key === "seats"){
            this.props.getImgSlider(
                model,subModel,
                confBody,iconSelect,
                "body",widgets,widgetsSelect
            )
        }

        this.props.getImgSlider(model,subModel,conf,iconSelect,type,widgets,widgetsSelect)
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

    iconClickHandler(targetNode,nodeList,iconSelect,type,val){

        for(const node of nodeList){

            if(targetNode === node){
                node.classList.add("active")
            }else{
                node.classList.remove("active")
            }

        }

        this.props.changeIconSelect(
            {
                [val] :iconSelect
            },
            type
        )

    }

    getKey(configuration,optionSelect){
        return Object.keys(configuration)[optionSelect]
        // const result = []
        //
        // switch (type) {
        //     case "body":
        //         for (const i of keys) {
        //             if (i === "seats") {
        //                 continue
        //             }
        //             result.push(i)
        //         }
        //         break
        //
        //     case "salon":
        //         for (const i of keys) {
        //             if (i === "background") {
        //                 continue
        //             }
        //             result.push(i)
        //         }
        //         break
        //
        //     default:
        //         break
        // }
        //
        // return result
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

    getStrOptionName(type){
        const obj = {
            background: "цвет",
            wheels: "диски",
            supports: "суппорта",
            seats: "экстерьер",
            roof: "крыша"
        }

        return obj[type]? obj[type] : ""
    }

    render(props) {
        const type = this.props.type
        const state = this.props.state
        const model = state.tableData.changedModel
        const subModel = state.tableData.changedSubModel

        const carInfo = state.models[model][subModel]
        const configuration = carInfo.configuration[type]

        const icons = state.slider.iconsUrls
        const iconSelect = state.slider.iconSelect

        const optionSelect = state.slider[type].optionSelect

        const optionsArr = this.getOptionsArr(configuration,type)

        const widgets = this.props.widgets
        const widgetsSelect = this.props.widgetsSelect

        return(
            <React.Fragment>
                <ul className="options">
                    {
                        optionsArr.map(
                            (item, index) => {

                                return (
                                    <li key={index}
                                        className={`option ${index === optionSelect ? "active" : ""}`}
                                        onClick={(e) => {
                                            this.optionClickHandler(
                                                e.target,
                                                e.target.parentNode.children,
                                                index,
                                                type
                                            )
                                        }}
                                    >
                                        {this.getStrOptionName(item)}
                                    </li>
                                )
                            })
                    }
                </ul>
                <ul className="icons-panel">
                    {
                        icons ?
                            icons[optionsArr[optionSelect]] ?
                                icons[optionsArr[optionSelect]].map((item, index) => {

                                        const activeIconEl = iconSelect[optionsArr[optionSelect]]

                                        return (
                                            <li className={`icon ${index === activeIconEl ? "active" : ""}`}
                                                key={index}
                                                onClick={async e => {

                                                    if (index === activeIconEl) {
                                                        return
                                                    }

                                                    await this.iconClickHandler(
                                                        e.target,
                                                        e.target.parentNode.children,
                                                        index,
                                                        type,
                                                        optionsArr[optionSelect]
                                                    )

                                                    const stateAfterClick = this.props.state

                                                    this.imgSliderHandler(
                                                        stateAfterClick, type,
                                                        optionsArr[optionSelect],
                                                        widgets,widgetsSelect
                                                    )
                                                }}>
                                                <img src={`${item}`} alt="icon"/>
                                            </li>
                                        )
                                    }
                                )
                                : false
                            :
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