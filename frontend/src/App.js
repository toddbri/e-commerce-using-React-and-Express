import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import './App.css';
import { Link } from 'react-router';
import * as actions from './App.action';

// import navBarContainer from './navbar/NavBar';


class AppLayout extends Component {
  render() {
    console.log('AppLayout render props: ', this.props);

    let navbar = <div className="navbar">
                    <Link to="/"> <img alt="donutgraphic" id="donutgif" src="/images/donut.gif"/><img alt="shoppingcart" id="shoppingcart" src="/images/shoppingcart.png"/></Link>
                    <div className="shoppingcartCount">{this.props.shoppingcartCount}</div>
                    <div onClick={this.props.action1} className="action1">Log in</div><div onClick={this.props.action2} className="action2">Action 1</div><div className="data1">{this.props.data1}</div>
                </div>;

    let logobar = <div className="logobar">Dough Nutz</div>;


    return (
      <div className="app">

        {navbar}
        {logobar}
        <div className="productDetails">
        {this.props.children}
        </div>
      </div>
    );
  }
}

const AppContainer = ReactRedux.connect(
    state => state.App,
    actions
)(AppLayout);

export default AppContainer;
