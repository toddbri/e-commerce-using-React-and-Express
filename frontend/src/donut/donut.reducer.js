// const INITIAL_STATE = {editing: false, doesntExist: false};
const INITIAL_STATE = {productName: '', productDescription: '', productPrice: 0, imageUrl: '', productID: null};

function reducer(state = INITIAL_STATE, action){
  console.log('recieved in target1 reducer: ', action);

  if (action.type === 'displayDonut'){
    console.log("in the displayDonut reducer");
    let donut = action.payload[0];
    console.log("donut: ", donut);
    // return Object.assign({},state,{pageInfo: action.payload, editing: false, doesntExist: false});
    return Object.assign({},state,{productName: donut.product_name, productDescription: donut.product_description, productPrice: donut.product_price, imageUrl: donut.image_url, productID: donut.product_id});
  }

  if (action.type === 'action2'){
    return Object.assign({},state,{})
  }

  return state;
}

export default reducer;
