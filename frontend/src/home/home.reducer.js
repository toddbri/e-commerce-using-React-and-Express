// const INITIAL_STATE = {editing: false, doesntExist: false};
const INITIAL_STATE = {products: []};

function reducer(state = INITIAL_STATE, action){
  console.log('recieved in home reducer: ' + action);

  if (action.type === 'displayProducts'){
    console.log("in the displayProducts in the home reducer");
    // return Object.assign({},state,{pageInfo: action.payload, editing: false, doesntExist: false});

    return Object.assign({},state,{products: action.payload});
  }

  if (action.type === 'action2'){
    return Object.assign({},state,{})
  }

  // if (action.type === 'updateContent'){
  //   console.log('in updateContents: ' + action.payload);
  //   console.log("pageInfo.content: " + state.pageInfo.content);
  //   console.log("pageInfo.title: " + state.pageInfo.title);
  //   Object.keys(state.pageInfo).forEach((item) => console.log('[' + item + ']-' + state.pageInfo[item]));
  //   let tmpState = Object.assign({},state);
  //   console.log('tmpState.content-before: ' + tmpState.pageInfo.content);
  //   tmpState.pageInfo = Object.assign({},state.pageInfo);
  //   tmpState.pageInfo.content = action.payload;
  //   console.log('tmpState.content-after: ' + tmpState.pageInfo.content);
  //   return Object.assign({}, state, tmpState,{doesntExist: false});
  // }
  //
  // if (action.type === 'error'){
  //   console.log('got page not found');
  //   return Object.assign({},state,{doesntExist: true});
  // }
  //
  // if (action.type === 'newPage'){
  //   console.log("in newPage");
  //   let tmpState = state;
  //   tmpState.pageInfo.content = '';
  //   tmpState.pageInfo.title = action.newTitle;
  //   return Object.assign({},state, tmpState, {doesntExist: false, editing: true });
  //
  // }
  return state;
}

export default reducer;

//home reducer
