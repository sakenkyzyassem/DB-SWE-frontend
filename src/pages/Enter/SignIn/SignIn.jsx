import React, { Component } from 'react';
import './SignIn.scss';
import UserContext from '../../../services/userContext';

class SignIn extends Component {
    state = {  }
    render() { 
        return ( 
            <UserContext.Consumer>
                { user => 
            <div className="signIn">
                <div className="container">
                <img src={require('../../../static/LogoWhite.svg')} alt=""></img>
                <div className="card">
                    <div className="row">
                        <div className="col-6">
                            <img className="imgSignUp" src={require('../../../static/signUpImg2.jpg')} alt="LobbyBoy"/>
                        </div>
                        <div className="col-6">
                            <div className="row">
                            <div className="col-3">
                                <img src={require("../../../static/waveSignIn.svg")} alt="wave"/>
                            </div>
                            <div className="col-9">
                                <h1>Sign In</h1>
                                <input type="email" placeholder="Enter email" className="inputForm"></input>
                                <input type="password" placeholder="Enter password" className="inputForm"></input>
                                <br></br>
                                <button className="signUpBtn">Sign in</button>
                                <p>Don't have an account? <a href="/signUp">Sign up</a></p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            }       
            </UserContext.Consumer>
         );
    }
}
 
export default SignIn;