import React,{Component} from "react"


class Widgets extends Component{

    componentDidMount() {
        const model = this.props.model
        const subModel = this.props.subModel
        this.props.getWidgetsImg(model,subModel)
    }


    render() {
        const state = this.props.state
        const widgetsSelect = this.props.widgetsSelect
        const widgetsUrls = this.props.widgetsUrls? this.props.widgetsUrls: []

        const model = this.props.model
        // const conf = this.props.conf
        const iconSelect = this.props.iconSelect
        const type = this.props.type
        const subModel = this.props.subModel
        const widgets = this.props.widgets
        const confBody = this.props.carInfo.configuration.body
        const confSalon = this.props.carInfo.configuration.salon
        // const conf = this.props.carInfo.configuration


        const widgetsArr = Object.keys(widgetsUrls)

        const urlsBody = state.slider.body.imgUrls
        const urlsSalon = state.slider.salon.imgUrls

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

                                        await this.props.changePrevImgSlider(urlsBody,urlsSalon)

                                        //after click
                                        const widgetsSelect = this.props.widgetsSelect

                                        this.props.getImgSlider(
                                            model, subModel,confBody,
                                            iconSelect,"body",widgets,
                                            widgetsSelect
                                        )

                                        this.props.getImgSlider(
                                            model, subModel,confSalon,
                                            iconSelect,"salon",widgets,
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