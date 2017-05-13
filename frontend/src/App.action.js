import $ from 'jquery';
import Cookies from 'js-cookie';
import {hashHistory} from 'react-router';

export function getProducts(){
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/products'
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
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/product/' + product_id
    })
    .then(data => {
      dispatch({type:'displayDonut', payload: data});
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;

}

export function logOut(){
     let asyncAction = function(dispatch) {
      Cookies.remove('auth_token');
      Cookies.remove('firstName');
      Cookies.remove('username');
      Cookies.remove('shoppingCartItems');
      dispatch({type: 'logout' , firstName: '', auth_token: '', username: ''});
    };
    return asyncAction;

}

export function addItemToCart(product_id, auth_token){
  if (auth_token !== null){

        let asyncAction = function(dispatch) {
          let destPort = 4000;
          $.ajax({
            url: 'http://localhost:'+ destPort + '/api/shopping_cart',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({product_id: product_id, user_token: auth_token})
          })
          .then(data => {
            dispatch({type:'updateShoppingCartCount', payload: data.shoppingCartCount});
            }
          )
          .catch(resp => dispatch({type: 'error', message: resp}))
        };
        return asyncAction;
    }
}


export function typing(event){
  return (dispatch) => dispatch({type: 'typing', field: event.target.name, value: event.target.value});

}
export function logIn(un, pwd){
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/user/login',
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
      Cookies.set('zip_code', userObject.zip_code);

      dispatch({type:'updateUserInfo', payload: userObject});
      addItemToCart(-1,userObject.auth_token);
      // hashHistory.push('/');
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };

  return asyncAction;

}

export function signUp(userObject){
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/user/signup',
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
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/shopping_cart_items',
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
