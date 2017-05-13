import * as actions from '../App.action'
// import * as Redux from 'redux';
import React from 'react';
import * as ReactRedux from 'react-redux';
// import {Link} from 'react-router';
class SignUp extends React.Component {


    validateInputs(){
      // if (this.props.firstName === '' || this.props.lastName === '' || this.props.signUpUsername === '' || this.props.email === '' || this.props.signUpPassword === '' || this.props.confirmPassword){
      //     alert( "All Fields Must be Filled Out");
      // } else {
          let tmpUser = {username: this.props.signUpUsername, first_name: this.props.firstName, last_name: this.props.lastName,
                          email: this.props.email, address1: '', address2: '', city: '',
                          state: '', zip_code: '', password: this.props.signUpPassword
                        };

          this.props.signUp(tmpUser);
      // }

    }

    render() {
      let passwordsDifferent = this.props.confirmPassword === this.props.signUpPassword;
      let content = <div className="signupContainer">
            <p className="sulabel">first name</p>
              <input className='signupinputfield' value={this.props.firstName} name="firstName" onChange={(event) => this.props.typing(event)} type="text"></input>
              <p className="sulabel">last name</p>
                <input className='signupinputfield' value={this.props.lastName} name="lastName" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="sulabel">username</p>
              <input className='signupinputfield' value={this.props.signUpUsername} name="signUpUsername" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="sulabel">email</p>
              <input className='signupinputfield' value={this.props.email} name="email" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="sulabel">password</p>
              <input className='signupinputfield' value={this.props.signUpPassword} name="signUpPassword" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="sulabel">confirm password</p>
              <input className='signupinputfield' value={this.props.confirmPassword} name="confirmPassword" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="passwordsdifferent">{passwordsDifferent ? '  ' : 'password are not the same'}</p>
            <button onClick={() => this.validateInputs()} className="signUpButton">Submit</button>

          </div>;


      return (<div> {content} </div> );

    }

}

const SignUpContainer = ReactRedux.connect(
    state => state,
    actions


)(SignUp);

export default SignUpContainer;

//Home Container
