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

export function createPage(newTitle){
    return (dispatch) => dispatch({type:'newPage', newTitle: newTitle})

}

export function toggleEdit(){

  return (dispatch) => dispatch({type:'toggleEdit'});

}

export function updateContent(event){
    console.log('updateContent');
    console.log('etv: ' + event.target.value);
    return (dispatch) => dispatch({type: 'updateContent', payload: event.target.value});
}

export function addItemToCart(product_id){
  console.log("addItemToCart received: " , product_id);
  // let content = value.content;
  // console.log("JSON data: " + JSON.stringify({content: value.content}));
  let asyncAction = function(dispatch) {
    let destPort = 4000;
    $.ajax({
      url: 'http://localhost:'+ destPort + '/api/shopping_cart',
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({product_id: product_id, user_token: "2697a265-99cd-4325-bfb5-b99258829dba"})
    })
    .then(data => {
      // console.log("updatePage returned: " + data);
      dispatch({type:'update-contents', payload: data});
      }
    )
    .catch(resp => dispatch({type: 'error', message: resp}))
  };
  return asyncAction;
}
