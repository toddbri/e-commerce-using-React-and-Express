import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import './App.css';
import { Link } from 'react-router';
import * as actions from './App.action';


class AppLayout extends Component {

  render() {

    let login = <div>
                  <div className="signup"><Link to="/signup">Sign up</Link></div>
                <div className="signin"><p className="label">username</p>
                  <input className='signininput' value={this.props.un} name="un" onChange={(event) => this.props.typing(event)} type="text"></input>
                  <p className="label">password</p>
                  <input className='signininput' value={this.props.pwd} name="pwd" onChange={(event) => this.props.typing(event)} type="text"></input>
                  <div> <button disabled={this.props.un === ''? true: false} className="loginbutton" onClick={() => this.props.logIn(this.props.un, this.props.pwd)}>Log In</button></div>
                </div>
                </div>;

    let navbar = <div className="navbar">
                    <Link to="/"> <img alt="donutgraphic" id="donutgif" src="/images/donut.gif"/></Link>
                    <img onClick={()=>this.props.showShoppingCart(this.props.auth_token)} alt="shoppingcart" id="shoppingcart" src="/images/shoppingcart.png"/>
                    <div className="shoppingcartCount">{this.props.shoppingCartItems}</div>
                    <div>{(this.props.firstName === undefined || this.props.firstName === '') ? 'Guest': 'Hi, ' + this.props.firstName}</div><br/><br/><br/><br/>
                    {this.props.firstName === ''? login: null}


                    {this.props.firstName !== ''? <div><button  className="logoutbutton" onClick={this.props.logOut}>Log Out</button></div>: null}

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
    state => state,
    actions
)(AppLayout);

export default AppContainer;
