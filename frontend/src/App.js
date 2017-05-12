import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import './App.css';
// import { Link } from 'react-router';
import * as actions from './App.action';

// import navBarContainer from './navbar/NavBar';


class AppLayout extends Component {
  render() {
    console.log('AppLayout render props: ', this.props);

    let navbar = <div className="navbar">
                    <img alt="donutgraphic" id="donutgif" src="/images/donut.gif"/><img alt="shoppingcart" id="shoppingcart" src="/images/shoppingcart.png"/>
                    <div className="shoppingcartCount">{this.props.shoppingcartCount}</div>
                    <div onClick={this.props.action1} className="action1">Log in</div><div onClick={this.props.action2} className="action2">Action 1</div><div className="data1">{this.props.data1}</div>
                </div>;

    let logobar = <div className="logobar">Dough Nutz</div>;
    
    let option1 = <div className="option1Container">
                      <div className="option1Content">
                      Input 1:  <input className="input1" onChange={(event) => this.props.input1Typing(event)} value={this.props.data1} type="text"/>
                      Input 2:  <input className="input2" onChange={(event) => this.props.input2Typing(event)} value={this.props.data2} type="text"/>
                      <button className="submitButton" onClick={() => this.props.action3(this.props.data1, this.props.data2)}>Submit</button>
                      <button className="cancel" onClick={this.props.cancel}>X</button>
                      </div>
                      </div>;

    let option2 =  <div className="option2Container">
                      <div className="option2Content">
                      Username: <input className="usernameinput" onChange={(event) => this.props.input1Typing(event)} value={this.props.data1} type="text"/>
                      Password: <input className="passwordinput" onChange={(event) => this.props.input2Typing(event)} value={this.props.data2} type="text"/>
                      <button className="otherButton" onClick={() => this.props.signUp(this.props.data1, this.props.data2)}>Other</button>
                      <button className="cancel" onClick={this.props.cancel}>X</button>
                      </div>
                      </div>;

    let selectedOption = this.props.data1 ? option1 : this.props.data2 ? option2 : null;

    return (
      <div className="app">

        {navbar}
        {logobar}
        <div className="productDetails">
        {selectedOption}
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
