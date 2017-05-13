// import {hashHistory} from 'react-router';

const INITIAL_STATE = {shoppingCartItems: 0, productName: '', productDescription: '', productPrice: 0, imageUrl: '', productID: null, products: [],
                      auth_token: '', username: '', password: '', signUpPassword: '', confirmPassword: '', email:'', firstName: '', lastName: '',
                      address1: '', address2: '', city: '', state: '', zipcode: '', shoppingCart: [],passwordsDifferent: true, signUpUsername: '',
                      signUpErrorMessage: '', un: '', pwd:''};

function reducer(state = INITIAL_STATE, action){

  if (action.type === 'displayDonut'){
    let donut = action.payload[0];
    return Object.assign({},state,{productName: donut.product_name, productDescription: donut.product_description, productPrice: donut.product_price, imageUrl: donut.image_url, productID: donut.product_id});
  }

  if (action.type === 'displayProducts'){

    return Object.assign({},state,{products: action.payload});
  }

  if (action.type === 'displayCart'){

    return Object.assign({},state,{products: action.payload});
  }

  if (action.type === 'updateShoppingCartCount'){
    return Object.assign({}, state,{shoppingCartItems: action.payload})

  }

  if (action.type === 'reauthUser'){
    return Object.assign({}, state, {auth_token: action.auth_token, firstName: action.firstName, lastName: action.lastName,
       email: action.email, city: action.city, state: action.state, zipcode: action.zipcode, address1: action.address1, address2: action.address2})

  }

  if (action.type === 'logout'){
    return Object.assign({}, state, {auth_token: '', firstName: '', shoppingCartItems: 0, username: ''} );

  }

  if (action.type === 'typing'){
    let tmpObject = {};
    tmpObject[action.field] = action.value;
    return Object.assign({}, state, tmpObject );

  }

  if (action.type === 'rebuildState'){
    console.log('rebuilding State for ' , action.field , ' to: ', action.value);
    let tmpObject = {};
    tmpObject[action.field] = action.value;

    return Object.assign({}, state, tmpObject);

  }

  // if (action.type === 'signUpErrorMessage'){
  //   return Object.assign({}, state, {signUpErrorMessage: action.message});
  //
  // }

  if (action.type === 'updateUserInfo'){
    let user = action.payload;
    console.log('reducer user: ', user);
    return Object.assign({}, state, {username: user.username,
       auth_token: user.auth_token, email: user.email, firstName: user.first_name,
       lastName: user.last_name, address1: user.addres1, address2: user.address2,
       city: user.city, state: user.state, zipcode: user.zip_code, password: user.password,
       un: '', pwd: ''
        } );

  }


  return state;
}

export default reducer;
