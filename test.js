// import React , {Component} from "react"
// import axios from "axios"
// import {connect} from "react-redux"
// import {storageRef} from "./index";
//
// class App extends Component{
//
//     constructor(props){
//         super(props)
//
//         this.state = {
//             cars: null,
//             imgUrls: [],
//             contentReady: false
//         }
//
//     }
//
//     componentDidMount() {
//
//         fetch("https://car-dealer-27bc6.firebaseio.com/cars.json")
//             .then(res=>res.json() )
//             // .then(data => this.setState((state, props) => (
//             //     {cars : data}
//             // )))
//             .then(data =>
//                 this.setState((state, props) => (
//                     {cars: data}
//                 ))
//             )
//             // .then( () =>
//             //     storageRef.child("maserati-Levante.png").getDownloadURL()
//             //     .then( (url)=> this.setState((state, props) => (
//             //         {
//             //             img: url,
//             //             contentReady: true
//             //         }
//             //     )) )
//             // )
//             .then( () =>
//                 storageRef.listAll()
//                     .then(
//                         (listRes)=> {
//                             // console.log('ListResult',res)
//                             listRes.items.forEach(
//                                 (refItem,index) => {
//                                     // console.log('refItem',refItem.location.path)
//                                     refItem.getDownloadURL()
//                                         .then((url) => {
//                                                 this.setState((state, props) => (
//                                                     {
//                                                         imgUrls: [...state.imgUrls, url],
//                                                     }
//                                                 ))
//                                             }
//                                         )
//                                         .then(()=>(
//                                             this.setState((state, props) => (
//                                                 {
//                                                     contentReady:true
//                                                 }
//                                             ))
//                                         ))
//
//                                     // this.setState((state, props) => (
//                                     //     {
//                                     //         imgUrls: [...state.imgUrls,refItem.location.path]
//                                     //     }
//                                     // ))
//
//
//                                     // console.log('this.state',this.state)
//                                 }
//                             )
//                         }
//
//                     )
//
//             )
//
//
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//     }
//
//     render(){
//
//         // console.log(this.state)
//         const imgUrls = this.state.imgUrls
//
//         const cars = this.state.cars
//         let carArr
//         if(cars){
//             carArr = Object.keys(cars.models.Maserati)
//         }
//
//         console.log('imgUrls',imgUrls)
//         console.log('this.state',this.state)
//         return(
//
//
//             <div>
//
//                 {this.state.contentReady?
//                     carArr.map((url,index)=> (
//                         <img key={index} src={imgUrls[index]} alt="maserati"/>)
//                     )
//                     :
//                     null
//                 }
//             </div>
//         )
//     }
//
// }
//
// export default connect(null,null)(App)