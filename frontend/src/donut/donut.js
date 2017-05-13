import * as actions from '../App.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
// import {Link} from 'react-router';
class Donut extends React.Component {

      componentDidMount(){
        this.props.getDonut(this.props.params.id);
      }


      render() {

        let html = <div className="singleProduct">
                    <div className="singleProductImageContainer">
                      <img alt="productPic" className="singleProductImage" src={'/images/' + this.props.imageUrl}/>
                    </div>
                    <div className="singleProductDetails">
                    <p className="singleProductName">{this.props.productName}</p>
                    <p className="singleProductDescription">{this.props.productDescription}</p>
                    <p className="singleProductPrice">{'$ ' + parseFloat(this.props.productPrice).toFixed(2)}</p>
                    <button disabled={this.props.auth_token === null} onClick={()=>this.props.addItemToCart(this.props.productID, this.props.auth_token)}
                      className="addToCartButtonSingleProduct">Add to Cart</button>
                    </div>
                    </div>;

        return (<div> {html} </div>);
                  
  }

}

const DonutContainer = ReactRedux.connect(
    state => state,
    actions


)(Donut);

export default DonutContainer;
