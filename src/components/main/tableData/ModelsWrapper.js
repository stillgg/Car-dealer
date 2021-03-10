import React from "react"
import {Link} from "react-router-dom"

const ModelsWrapper = props =>{
    const state = props.state
    const pos = props.pos
    const touchMovePos = props.touchMovePos
    const changedModel = props.changedModel
    const slider = props.slider
    const changedViewMode = state.tableData.viewMode

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
                            >
                                <img className={`car ${changedModel}`} src={state.tableData.urls[index]}
                                     alt="car"/>
                            </div>

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