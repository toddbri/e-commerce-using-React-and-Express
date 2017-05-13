import * as actions from '../App.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
import {Link} from 'react-router';
class Home extends React.Component {

    componentDidMount(){
      this.props.getProducts();

    }

    componentWillReceiveProps(newProps){
    }

    render() {

      let producthtml = this.props.products.map((item, idx) => <div key={idx} className="singleItemContainer">
          <div className="productName">{item.product_name}</div>
          <Link to={'/donut/' + item.product_id}><img alt="productImage" className="donutImage" src={'/images/' + item.image_url}/></Link>
          <div className="itemPrice">$ {parseFloat(item.product_price).toFixed(2)}</div>
          <button disabled={this.props.auth_token === null} onClick={()=>this.props.addItemToCart(item.product_id, this.props.auth_token)} className="addToCartButton">Add to Cart</button>

          </div>);


      return (<div>{producthtml}  </div>);


    }

}

const HomeContainer = ReactRedux.connect(
    state => state,
    actions


)(Home);

export default HomeContainer;

//Home Container
