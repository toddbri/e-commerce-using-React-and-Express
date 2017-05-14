import * as actions from '../App.action'
import React from 'react';
import * as ReactRedux from 'react-redux';
class SignUp extends React.Component {


    validateInputs(){
      if (this.props.signUpPassword !== this.props.confirmPassword) {

      } else {

        let tmpUser = {username: this.props.signUpUsername, first_name: this.props.signUpfirstName, last_name: this.props.signUplastName,
                        email: this.props.signUpemail, address1: '', address2: '', city: '',
                        state: '', zip_code: '', password: this.props.signUpPassword
                      };

        this.props.signUp(tmpUser);


      }

    }

    render() {
      let passwordsDifferent = (this.props.confirmPassword !== this.props.signUpPassword);
      let content = <div className="signupContainer">
            <p className="sulabel">first name</p>
              <input className='signupinputfield' value={this.props.signUpfirstName} name="signUpfirstName" onChange={(event) => this.props.typing(event)} type="text"></input>
              <p className="sulabel">last name</p>
                <input className='signupinputfield' value={this.props.signUplastName} name="signUplastName" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="sulabel">username</p>
              <input className='signupinputfield' value={this.props.signUpUsername} name="signUpUsername" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="sulabel">email</p>
              <input className='signupinputfield' value={this.props.signUpemail} name="email" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="sulabel">password</p>
              <input className='signupinputfield' value={this.props.signUpPassword} name="signUpPassword" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="sulabel">confirm password</p>
              <input className='signupinputfield' value={this.props.confirmPassword} name="confirmPassword" onChange={(event) => this.props.typing(event)} type="text"></input>
            <p className="passwordsdifferent">{passwordsDifferent ? 'password are not the same' : '' }</p>
            <button disabled={passwordsDifferent} onClick={() => this.validateInputs()} className={passwordsDifferent  || this.props.signUpPassword === '' ? "signUpButtonGreyedOut" : "signUpButton"}>Submit</button>

          </div>;


      return (<div> {content} </div> );

    }

}

const SignUpContainer = ReactRedux.connect(
    state => state,
    actions


)(SignUp);

export default SignUpContainer;
