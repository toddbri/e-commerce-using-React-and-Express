import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './App';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

import DonutReducer from './target1/target1.reducer';
import DonutContainer from './target1/target1';

import HomeReducer from './home/home.reducer';
import HomeContainer from './home/home';

// import NavBarReducer from './navbar/NavBar.reducer';

import AppReducer from './App.reducer';
import ReduxThunk from 'redux-thunk';
// import * as actions from './wiki-page/wikipage.action'
// import {Router, Route, Link, IndexLink, hashHistory, IndexRoute} from 'react-router';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import './index.css';


class Unknown extends React.Component {

  render() {
    return (<div className="unknownPage" >Sorry, I'm not familiar with that page.</div>);
  }
}

const reducer = Redux.combineReducers({
  App: AppReducer,
  Donut: DonutReducer,
  Home: HomeReducer

});


const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

let vdom = <ReactRedux.Provider store={store}>
  <Router history={hashHistory}>
    <div>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer}/>
        <Route path="/donut/:id" component={DonutContainer}/>
        <Route path="/*" component={Unknown}/>
      </Route>
    </div>
  </Router>
</ReactRedux.Provider>;

ReactDOM.render(
  vdom,
  document.getElementById('root')
);
