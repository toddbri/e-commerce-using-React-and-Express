import * as actions from '../App.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
// import {Link} from 'react-router';
class Cart extends React.Component {

      render() {

        let items = this.props.products;
        let html = items.map((item, idx) => <p key={idx}> {item.product_description} - {item.product_price}</p>);

        return (<div>{html}</div>);

  }

}

const CartContainer = ReactRedux.connect(
    state => state,
    actions


)(Cart);

export default CartContainer;
