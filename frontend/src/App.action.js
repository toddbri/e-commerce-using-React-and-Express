import $ from 'jquery';
import Cookies from 'js-cookie';
import {hashHistory} from 'react-router';
import config from './config/config';
const BASEURL = location.hostname === 'localhost' ? 'http://localhost:4000' : '';
const StripeCheckout = window.StripeCheckout;
const stripePK = config.stripePK;

export function getProducts(){
  let asyncAction = function(dispatch) {
    $.ajax({
      url: BASEURL + '/api/products'
    })
    .then(data => {
      dispatch({type:'displayProducts', payload: data});
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;

}


export function getDonut(product_id){
  let asyncAction = function(dispatch) {
    $.ajax({
      url: BASEURL + '/api/product/' + product_id
    })
    .then(data => {
      dispatch({type:'displayDonut', payload: data});
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;

}


const INITIAL_STATE = {shoppingCartItems: 0, productName: '', productDescription: '', productPrice: 0, imageUrl: '', productID: null, products: [],
                      auth_token: null, username: '', password: '', signUpPassword: '', confirmPassword: '', email:'', firstName: '', lastName: '',
                      address1: '', address2: '', city: '', state: '', zipcode: '', shoppingCart: [], signUpUsername: '',
                      un: '', pwd:''};

const EXEMPT = ['shoppingCartItems', 'products'];

export function logOut(){
     let asyncAction = function(dispatch) {
      Object.keys(INITIAL_STATE).forEach(key => {
        if (EXEMPT.indexOf(key) === -1 ) {
          Cookies.set(key,INITIAL_STATE[key]);
        }

      });
      // getProducts(dispatch);
      dispatch({type: 'logout'});
      hashHistory.push('/');
    };
    return asyncAction;

}

export function addItemToCart(product_id, auth_token){
  if (auth_token !== null){

        let asyncAction = function(dispatch) {

          $.ajax({
            url: BASEURL + '/api/shopping_cart',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({product_id: product_id, user_token: auth_token})
          })
          .then(data => {
            dispatch({type:'updateShoppingCartCount', payload: data.shoppingCartCount});
            }
          )
          .catch(resp => {
            dispatch({type: 'error', message: resp})
          })
        };
        return asyncAction;
    }
}


export function typing(event){
  return (dispatch) => dispatch({type: 'typing', field: event.target.name, value: event.target.value});

}
export function logIn(un, pwd){
  let asyncAction = function(dispatch) {

    $.ajax({
      url: BASEURL + '/api/user/login',
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({username: un, password: pwd})
    })
    .then(userObject => {
      Cookies.set('firstName', userObject.first_name);
      Cookies.set('lastName', userObject.last_name);
      Cookies.set('username', userObject.username);
      Cookies.set('auth_token', userObject.auth_token);
      Cookies.set('address1', userObject.address1);
      Cookies.set('address2', userObject.address2);
      Cookies.set('city', userObject.city);
      Cookies.set('state', userObject.state);
      Cookies.set('zipcode', userObject.zip_code);
      Cookies.set('email', userObject.email);

      dispatch({type:'updateUserInfo', payload: userObject});


      $.ajax({
        url: BASEURL + '/api/shopping_cart',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({product_id: -1 , user_token: userObject.auth_token})
      })
      .then(data => {
        dispatch({type:'updateShoppingCartCount', payload: data.shoppingCartCount});
        hashHistory.push('/');
        }
      )
      .catch(resp => {
        dispatch({type: 'error', message: resp})
      })

      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };

  return asyncAction;

}

export function signUp(userObject){
  let asyncAction = function(dispatch) {

    $.ajax({
      url: BASEURL + '/api/user/signup',
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(userObject)
    })
    .then(data => {
      userObject.auth_token = data.auth_token;
      dispatch({type:'updateUserInfo', payload: userObject});
      hashHistory.push('/');
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };

  return asyncAction;

}



export function showShoppingCart(auth_token){

  let asyncAction = function(dispatch) {

    $.ajax({
      url: BASEURL + '/api/shopping_cart_items',
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({user_token: auth_token})
    })
    .then(data => {

      dispatch({type:'displayCart', payload: data});
      hashHistory.push('/cart');
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };

  return asyncAction;

}

export function chargeCard(amount, auth_token, email) {
    let asyncAction = function(dispatch) {
        let handler = StripeCheckout.configure({ //this configures Stripe
            key: stripePK,
            image: '/images/glazed.jpeg',
            locale: 'auto',
            token: function callback(token) {
                var stripeToken = token.id;
                console.log('Public stripe token recieved if payment info verified: ', stripeToken);
                // If verified, send stripe token to backend
                $.ajax({
                    type: 'POST',
                    url: BASEURL + '/api/pay',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        stripeToken: stripeToken,
                        email: email,
                        amount: amount
                    })
                })
                // After payment is processed in the back end send another request to update the database and set state
                .then(response => {
                    console.log("ok, i heard back from stripe");
                    $.ajax({
                        type: 'POST',
                        url: BASEURL + '/api/checkout',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            user_token: auth_token
                        })
                    })
                    .then(response => {
                      console.log('it worked!');
                      dispatch({type:'updateShoppingCartCount', payload: 0});
                      hashHistory.push('/thanks');

                    })
                })
            }
        });

        handler.open({        //this kicks off Stripe payment
            name: 'Dough Nutz',
            amount: amount
        });
    }
    return asyncAction;
}
