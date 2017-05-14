import * as actions from '../App.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
import config from './config';
// import {Link} from 'react-router';
import {hashHistory} from 'react-router';
class Checkout extends React.Component {

        validateInputs(){

            // hashHistory.push('/thanks');

        }

      render() {
        console.log("config: ", config);
        console.log('secretPK: ',config.stripePK);
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
                            {items.map((item, idx) => <tr key={idx}>
                                          <td className='quantity'>{item.quantity}</td>
                                          <td>{item.product_name}</td>
                                          <td className="money">{parseFloat(item.product_price).toFixed(2)}</td>
                                          <td className="money">{parseFloat(item.extended).toFixed(2)}</td></tr>)}
                          <tr><td></td><td>Total</td><td></td><td className="money">{total}</td></tr>
                          </table>
                      </div>

        let shippingAddress = <div className="shippingAddressContainer">
                        <div className="shippingDetails">Shipping Details</div>
                        <p className="shippingLabel">First Name</p>
                          <input className='shippingInputField' value={this.props.shippingFirstName} name="shippingFirstName" onChange={(event) => this.props.typing(event)} type="text"></input>
                          <p className="shippingLabel">Last Name</p>
                            <input className='shippingInputField' value={this.props.shippingLastName} name="shippingLastName" onChange={(event) => this.props.typing(event)} type="text"></input>
                        <p className="shippingLabel">Email</p>
                          <input className='shippingInputField' value={this.props.shippingEmail} name="shippingEmail" onChange={(event) => this.props.typing(event)} type="text"></input>
                        <p className="shippingLabel">Address 1</p>
                          <input className='shippingInputField' value={this.props.shippingAddress1} name="shippingAddress1" onChange={(event) => this.props.typing(event)} type="text"></input>
                        <p className="shippingLabel">Address 2</p>
                          <input className='shippingInputField' value={this.props.shippingAddress2} name="shippingAddress2" onChange={(event) => this.props.typing(event)} type="text"></input>
                        <p className="shippingLabel">City</p>
                          <input className='shippingInputField' value={this.props.shippingCity} name="shippingCity" onChange={(event) => this.props.typing(event)} type="text"></input>
                        <p className="shippingLabel">State</p>
                          <input className='shippingInputField' value={this.props.shippingCity} name="shippingCity" onChange={(event) => this.props.typing(event)} type="text"></input>
                        <p className="shippingLabel">Zip Code</p>
                          <input className='shippingInputField' value={this.props.shippingCity} name="shippingCity" onChange={(event) => this.props.typing(event)} type="text"></input>
                        <button onClick={() => this.validateInputs()} className="payButton">Submit Order</button>

            </div>;



        return (<div>
                {table}
                {shippingAddress}
                </div>);

  }

}

const CheckoutContainer = ReactRedux.connect(
    state => state,
    actions


)(Checkout);

export default CheckoutContainer;
