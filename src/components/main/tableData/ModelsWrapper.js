import React from "react"
import {Link} from "react-router-dom"

const ModelsWrapper = props =>{
    const state = props.state
    const pos = props.pos
    const touchMovePos = props.touchMovePos
    const changedModel = props.changedModel
    const slider = props.slider
    const changedViewMode = state.tableData.viewMode
    // const complictationInfo = !state.tableData.complictationInfo

    return(
        <div className="models-wrapper"
             style={{
                 transform: `translateX(${props.calcTransform(pos + touchMovePos)}%)`,
                 transition: ".3s all",
                 width: "100vw"
             }}
        >
            {
                state.tableData.urls.map((item, index) => {
                    const models = state.models
                    const subModels = Object.keys(models[changedModel])
                    const aboutCarPath = props.getModel(subModels, index)
                    const complictation = props.getComplictation(models,changedModel,subModels[index])
                    const complictationKeys = Object.keys(complictation)

                    return (
                        <Link
                            key={index} className={
                            `model ${index === slider.pos ? "active" : "inactive"}`
                        }
                            to={
                                changedViewMode === "type-1"?
                                    `/${changedModel}`
                                    :
                                    `/${changedModel}/${aboutCarPath}`
                            }
                        >
                            <span className="model-header">{subModels[index]}</span>

                            <div
                                className="img-wrapper"
                                // style={{
                                //     background: `url(${state.tableData.urls[index]}) no-repeat`,
                                //     backgroundSize: "cover",
                                //     height: "25vw",
                                //     width: "50vw"
                                // }}
                            >
                                <img className={"car"} src={state.tableData.urls[index]}
                                     alt="car"/>
                            </div>
                            {/*<div className={"btn-wrapper"}>*/}
                            {/*    <Link*/}
                            {/*        to={`/${changedModel}/${aboutCarPath}`} className={"btn"}*/}
                            {/*    >*/}
                            {/*        выбрать*/}
                            {/*    </Link>*/}
                            {/*</div>*/}

                            <div className="btns-wrapper">
                                <div className="btn-spec"
                                     onClick={e=>{
                                         props.changeTableData({showSpec:true})
                                     }}
                                >
                                    <span className="txt">Технические характеристики</span>
                                </div>
                                <Link
                                    to={`/${changedModel}/${aboutCarPath}`}
                                    onClick={ ()=> {
                                       props.changeSubModel(subModels[index])
                                    } }
                                    className="btn-config">
                                    <span className="txt">Сконфигурировать</span>
                                </Link>
                            </div>

                        </Link>
                    )
                })
            }
        </div>
    )
}

export default ModelsWrapper