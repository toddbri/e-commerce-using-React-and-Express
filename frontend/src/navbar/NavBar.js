import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
// import './App.css';

import * as actions from './NavBar.action';

class component extends Component {

  render() {
    console.log('NavBar render state: ', this.props);


    return (
      <div className="navbar">
        NavBar Goes Here!
      </div>
    );
  }
}

const Container = ReactRedux.connect(
    state => state.App,
    actions
)(component);

export default Container;
