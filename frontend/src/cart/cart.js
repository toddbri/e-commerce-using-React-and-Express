import * as actions from '../App.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
// import {Link} from 'react-router';
class Cart extends React.Component {

      render() {

        let items = this.props.products;
        let total = 0;
        total = items.reduce((accum, item) => accum + item.extended, 0);
        total = parseFloat(total).toFixed(2);
        let table =   <div className="shoppingcartcontainer">
                          <table className="shoppingcarttable">
                            <tr>
                              <th>Quantity</th>
                              <th>Item</th>
                              <th>Unit Price</th>
                              <th>Extended</th>
                            </tr>
                            {items.map((item, idx) => <tr>
                                          <td className='quantity'>{item.quantity}</td>
                                          <td>{item.product_name}</td>
                                          <td className="money">{parseFloat(item.product_price).toFixed(2)}</td>
                                          <td className="money">{parseFloat(item.extended).toFixed(2)}</td></tr>)}
                          <tr><td></td><td>Total</td><td></td><td className="money">{total}</td></tr>
                          </table>
                      </div>
        let checkout = <div className="checkoutbuttoncontainer"><button className="checkoutbutton">Checkout</button></div>

        return (<div>
                {table}
                {total>0 ? checkout: null}
                </div>);

  }

}

const CartContainer = ReactRedux.connect(
    state => state,
    actions


)(Cart);

export default CartContainer;
