import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './App';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import DonutContainer from './donut/donut';
import HomeContainer from './home/home';
import CartContainer from './cart/cart';
import SignUpContainer from './signup/signup';
import CheckoutContainer from './checkout/checkout';
import ThanksContainer from './thanks/thanks';
import reducer from './App.reducer';
import ReduxThunk from 'redux-thunk';
import $ from 'jquery';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Cookies from 'js-cookie';
const BASEURL = location.hostname === 'localhost' ? 'http://localhost:4000' : '';
import './index.css';


const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

let auth_token = Cookies.get('auth_token');
let shoppingCartItems = Cookies.get('shoppingCartItems');
let firstName = Cookies.get('firstName');
let lastName = Cookies.get('lastName');
let email = Cookies.get('email');
let city = Cookies.get('city');
let state = Cookies.get('state');
let zipcode = Cookies.get('zipcode');
let username = Cookies.get('username');

auth_token = auth_token === "null" ? null : auth_token; //convert from string null to real null if needed

if (auth_token !== null) {

  store.dispatch({type: 'reauthUser', auth_token: auth_token, firstName: firstName, lastName: lastName, email: email,
                  city: city, state: state, zipcode: zipcode, username: username});
   $.ajax({
    url: BASEURL +  '/api/shopping_cart',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({product_id: -1, user_token: auth_token})
  })
  .then(data => {
    store.dispatch({type:'updateShoppingCartCount', payload: data.shoppingCartCount});
    }
  )
  .catch(resp => store.dispatch({type: 'error', message: resp}));

}

if (shoppingCartItems && shoppingCartItems > 0){
  store.dispatch({type: 'rebuildState', field: 'shoppingCartItems', value: shoppingCartItems});
}

let vdom = <ReactRedux.Provider store={store}>
  <Router history={hashHistory}>
    <div>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer}/>
        <Route path="/donut/:id" component={DonutContainer}/>
        <Route path="/signup" component={SignUpContainer}/>
        <Route path="/cart" component={CartContainer}/>
        <Route path="/checkout" component={CheckoutContainer}/>
        <Route path="/thanks" component={ThanksContainer}/>

      </Route>
    </div>
  </Router>
</ReactRedux.Provider>;

ReactDOM.render(
  vdom,
  document.getElementById('root')
);
