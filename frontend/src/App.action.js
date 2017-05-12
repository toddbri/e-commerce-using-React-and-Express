import $ from 'jquery';
// import {hashHistory} from 'react-router';

export function getProducts(){
  console.log('in getProducts looking for');
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/products'
    })
    .then(data => {
      console.log("getProducts returned: " + data);
      dispatch({type:'displayProducts', payload: data});
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;

}


export function getDonut(product_id){
  console.log('in getDonut looking for ' + product_id);
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/product/' + product_id
    })
    .then(data => {
      console.log("getDonut returned: ", data);
      dispatch({type:'displayDonut', payload: data});
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;

}

export function addItemToCart(product_id){
    console.log("in addItemToCart id is: ", product_id)
    let asyncAction = function(dispatch) {
      let destPort = 4000;
      $.ajax({
        url: 'http://localhost:'+ destPort + '/api/shopping_cart',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({product_id: product_id, user_token: "2697a265-99cd-4325-bfb5-b99258829dba"})
      })
      .then(data => {
        console.log("singleProduct - addItemtoCare returned: " + data);
        dispatch({type:'update-contents', payload: data});
        }
      )
      .catch(resp => dispatch({type: 'error', message: resp}))
    };
    return asyncAction;

}


export function action1(){
  console.log('entering action1 handler');
  return (dispatch) => dispatch({type: 'action1'});

}

export function action2(){
  console.log('entering action2 handler');
  return (dispatch) => dispatch({type: 'action2'});

}

export function action3(){
  console.log('entering action3 handler');
  return (dispatch) => dispatch({type: 'action3'});

}

export function action4(){
  console.log('entering action4 handler');
  return (dispatch) => dispatch({type: 'action4'});

}

export function input1Typing(event){
  console.log('entering input1Typing handler');
  return (dispatch) => dispatch({type: 'action5', payload: event.target.value});

}

export function input2Typing(event){
  console.log('entering input2Typing handler');
  return (dispatch) => dispatch({type: 'action6', payload: event.target.value});

}
