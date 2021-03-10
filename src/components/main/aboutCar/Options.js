import React from "react"

class Options extends React.Component{
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
        const optionsArr = this.props.optionsArr
        const optionSelect = this.props.optionSelect
        const type = this.props.type

        return(
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
        )
    }
}

export default Options