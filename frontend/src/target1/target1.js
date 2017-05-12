import * as actions from './target1.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
// import {Link} from 'react-router';
class Target1 extends React.Component {

  componentDidMount(){
    console.log("did mount for target1");
    console.log("id: ", this.props.params);
    this.props.getDonut(this.props.params.id);

  }

componentWillReceiveProps(newProps){
    console.log("willrecieveProps-target1");
    // console.log('newProps: ' + newProps.params.data1);
    // if (newProps.params.data1 !== this.props.params.data1){
    //   this.props.ActionByName(newProps.params.data1);
    // }

  }

  render() {
    console.log("props supplied to donut render: ", this.props);
    console.log("in Target1 render");
    let html = <div className="singleProduct">
                <div className="singleProductImageContainer">
                  <img alt="productPic" className="singleProductImage" src={'/images/' + this.props.imageUrl}/>
                </div>
                <div className="singleProductDetails">
                  {this.props.productName}
                  {this.props.productDescription}
                  {'$ ' + parseFloat(this.props.productPrice).toFixed(2)}
                </div>
                </div>;


    let noPage = null;


    return (<div>
              {noPage}
              {html}

            </div>);


  }

}

const Target1Container = ReactRedux.connect(
    state => state.Donut,
    actions


)(Target1);

export default Target1Container;
