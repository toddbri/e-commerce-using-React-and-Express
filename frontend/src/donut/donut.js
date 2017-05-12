import * as actions from './donut.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
// import {Link} from 'react-router';
class Donut extends React.Component {

      componentDidMount(){
        this.props.getDonut(this.props.params.id);
      }

      componentWillReceiveProps(newProps){

      }

      render() {
        console.log("props supplied to donut render: ", this.props);
        console.log("in Target1 render");
        let html = <div className="singleProduct">
                    <div className="singleProductImageContainer">
                      <img alt="productPic" className="singleProductImage" src={'/images/' + this.props.imageUrl}/>
                    </div>
                    <div className="singleProductDetails">
                    <p className="singleProductName">{this.props.productName}</p>
                    <p className="singleProductDescription">{this.props.productDescription}</p>
                    <p className="singleProductPrice">{'$ ' + parseFloat(this.props.productPrice).toFixed(2)}</p>
                    <button onClick={()=>this.props.addItemToCart(this.props.productID)} className="addToCartButtonSingleProduct">Add to Cart</button>
                    </div>
                    </div>;


        let noPage = null;


        return (<div>
                  {noPage}
                  {html}

                </div>);


  }

}

const DonutContainer = ReactRedux.connect(
    state => state,
    actions


)(Donut);

export default DonutContainer;
