import * as actions from '../App.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
// import {Link} from 'react-router';
class Cart extends React.Component {

      componentDidMount(){



      }

      componentWillReceiveProps(newProps){
      }

      render() {
        // console.log('Cart render state: ', this.props.products);
        // console.log("props supplied to donut render: ", this.props);
        // console.log("in Target1 render");
        let items = this.props.products;
        // console.log("products in Cart: ", items);
        let html = items.map((item, idx) => <p key={idx}> {item.product_description} - {item.product_price}</p>);

        return (<div>{html}</div>);

  }

}

const CartContainer = ReactRedux.connect(
    state => state,
    actions


)(Cart);

export default CartContainer;
