// const INITIAL_STATE = {loggedinname: 'Guest', username: '', password: '', signin: false, signup:false, token: ''};
const INITIAL_STATE = {shoppingcartCount: 0};

function reducer(state = INITIAL_STATE, action){
  console.log('in App reducer');
  console.log('App state: ', state);

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
  //
  // if (action.type === 'signIn'){
  //   return Object.assign({});
  // }
  //
  // if (action.type === 'usernameTyping'){
  //   console.log('action data-username: ' + action.username);
  //   return Object.assign({}, state, {username: action.username});
  //
  // }
  //
  // if (action.type === 'passwordTyping'){
  //   console.log('action data-password: ' + action.password);
  //   return Object.assign({},state, {password: action.password});
  //
  // }
  //
  // if (action.type === 'accountcreated'){
  //   console.log('user account was created ok');
  //   return Object.assign({},state, {signup: false});
  // }
  //
  // if (action.type === 'usersignedin'){
  //   console.log('user account was created ok');
  //   return Object.assign({},state, {signin: false, loggedinname: action.username, token: action.token});
  // }

  return state;
}

export default reducer;
