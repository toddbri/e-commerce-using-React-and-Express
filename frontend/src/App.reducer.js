// const INITIAL_STATE = {loggedinname: 'Guest', username: '', password: '', signin: false, signup:false, token: ''};
// const INITIAL_STATE = {productName: '', productDescription: '', productPrice: 0, imageUrl: '', productID: null};

const INITIAL_STATE = {shoppingCartItems: [], productName: '', productDescription: '', productPrice: 0, imageUrl: '', productID: null, products: []};

function reducer(state = INITIAL_STATE, action){

  if (action.type === 'displayDonut'){
    let donut = action.payload[0];
    console.log("donut: ", donut);
    return Object.assign({},state,{productName: donut.product_name, productDescription: donut.product_description, productPrice: donut.product_price, imageUrl: donut.image_url, productID: donut.product_id});
  }

  if (action.type === 'displayProducts'){
    console.log("in the displayProducts in the home reducer");
    // return Object.assign({},state,{pageInfo: action.payload, editing: false, doesntExist: false});

    return Object.assign({},state,{products: action.payload});
  }

  if (action.type === 'action1'){
    console.log('action1 handler');
    return Object.assign({}, state,{signup: true, signin: false})

  }

  if (action.type === 'cancel'){
    console.log('cancelling');
    return Object.assign({}, state, {signin: false, signup: false})

  }

  if (action.type === 'action2'){
    console.log('action2 handler');
    return Object.assign({}, state, {signin: true, signup: false})

  }

  if (action.type === 'action2'){
    console.log('action2 handler');
    return Object.assign({}, state, {signin: true, signup: false})

  }
  if (action.type === 'action3'){
    console.log('action3 handler');
    return Object.assign({}, state, {signin: true, signup: false})

  }

  if (action.type === 'action4'){
    console.log("action4 handler");
    return Object.assign({});  // this would clear all state for this partition.
  }


  return state;
}

export default reducer;
