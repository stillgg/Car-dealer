import React from "react"

const Specifications = props =>{
    const state = props.state
    const complictationInfo = state.tableData.complictationInfo
    const showSpec = state.tableData.showSpec

    const pos = state.sliderType1.pos
    const changedModel = state.tableData.changedModel
    const changedSubModel = Object.keys(state.models[changedModel])[pos]

    const model = state.models[changedModel][changedSubModel]
    const complictationKeys = Object.keys(model.complictation)
    const complictation = model.complictation

    return(
        <div className={
            `specifications 
            ${showSpec?"active":"inactive"}
            ${complictationInfo?"true":"false"}
            `
        }>
            <div className="btn-close"
                 onClick={e=>{
                     props.changeTableData({showSpec:false})
                 }}
            >
            </div>
            <div className="spec-header">
                <span className="text">
                    {changedModel} {changedSubModel}
                </span>
            </div>

            <div className="complictations-wrapper">
                <h2 className="header">
                        Комплектаци{complictationKeys.length>1?"и":"я"}
                        <span
                            className={"btn-header"}
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                content: "",
                                width: "25px",
                                height: "25px",
                                backgroundImage: `url(./img/icons/icon${!complictationInfo?"Plus":"Minus"}.svg)`,
                                backgroundSize: "cover",
                                marginLeft: "15px",
                                top: "50%",
                                transform: "translateY(-40%)"
                            }}

                            onClick={
                                e=>{
                                    props.changeTableData(
                                        {complictationInfo:!complictationInfo}
                                    )
                                }
                            }
                        >
                        </span>
                    </h2>

                <div className="complictation">
                    <ul className={"info-wrapper"}>
                        {
                            complictationKeys.map((item,index)=>{
                                const conf = Object.keys(complictation[item])
                                const compl = complictation[item]

                                return (
                                    <li className="info">
                                        <div className="header"
                                             onClick={e=>{
                                                 if(e.target.tagName === "DIV"){
                                                     return e.target.classList.toggle("active")
                                                 }
                                                 return e.target.parentNode.classList.toggle("active")
                                             }}
                                        >
                                            <span className="txt">{item.split("_").join(" ")}</span>
                                            <span className="header-btn">
                                                &rsaquo;
                                            </span>
                                        </div>
                                        <ul className="model-spec">
                                            {conf.map((item)=>{
                                                return(
                                                    <li className="model-spec-info">{item}:{compl[item]}</li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Specifications