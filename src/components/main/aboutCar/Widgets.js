import React,{Component} from "react"


class Widgets extends Component{

    componentDidMount() {
        const model = this.props.model
        const subModel = this.props.subModel
        this.props.getWidgetsImg(model,subModel)
    }


    render() {
        const widgetsSelect = this.props.widgetsSelect
        const widgetsUrls = this.props.widgetsUrls? this.props.widgetsUrls: []

        const model = this.props.model
        const conf = this.props.conf
        const iconSelect = this.props.iconSelect
        const type = this.props.type
        const subModel = this.props.subModel
        const widgets = this.props.widgets

        const widgetsArr = Object.keys(widgetsUrls)

        return(
            <div className="widgets">

                {
                    widgetsArr.length ?
                        widgetsArr.map((item, index) => {
                            const indexImgUrl = widgetsSelect[item]
                            const imgUrl = widgetsUrls[item][indexImgUrl]

                            return (
                                <img
                                    key={index}
                                    src={`${imgUrl}`}
                                    alt="widget"
                                    onClick={async e=>{
                                        await this.props.updateWidgetsSelect(
                                            item, widgetsUrls[item].length>1? +!indexImgUrl : 0
                                        )

                                        //after click
                                        const widgetsSelect = this.props.widgetsSelect

                                        this.props.getImgSlider(
                                            model, subModel,conf,
                                            iconSelect,type,widgets,
                                            widgetsSelect
                                        )
                                    }}
                                    style={{
                                        width:"45px",
                                        height:"45px",
                                        cursor:"pointer"
                                    }}
                                />
                            )
                        })
                        :
                        false
                }

            </div>
        )
    }
}

export default Widgets