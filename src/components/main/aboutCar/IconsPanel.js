import React , {Component} from "react"
import PreloaderV2 from "../../preloaders/PreloaderV2";

class IconsPanel extends Component{

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

    iconClickHandler(targetNode,nodeList,iconSelect,type,val,urlsBody,urlsSalon){

        for(const node of nodeList){

            if(targetNode === node){
                node.classList.add("active")
            }else{
                node.classList.remove("active")
            }

        }

        this.props.changePrevImgSlider(urlsBody,urlsSalon)

        this.props.changeIconSelect(
            {
                [val] :iconSelect
            },
            type
        )

    }

    render(){
        const state = this.props.state
        const icons = state.slider.iconsUrls
        const iconSelect = state.slider.iconSelect
        const widgets = this.props.widgets
        const widgetsSelect = this.props.widgetsSelect

        const optionsArr = this.props.optionsArr
        const optionSelect = this.props.optionSelect
        const type = this.props.type

        const urlsBody = state.slider.body.imgUrls
        const urlsSalon = state.slider.salon.imgUrls
        return(
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
                                                    optionsArr[optionSelect],
                                                    urlsBody,
                                                    urlsSalon
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
        )
    }

}

export default IconsPanel