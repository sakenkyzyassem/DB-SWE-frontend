import React, { Component } from 'react';
import './SignUp.scss';

class SignUp extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="signUp">
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
                                <img src={require("../../../static/waveSignUp.svg")} alt="wave"/>
                            </div>
                            <div className="col-9">
                                <h1>Sign Up</h1>
                                <input type="email" placeholder="Enter email" className="inputForm"></input>
                                <input type="password" placeholder="Enter password" className="inputForm"></input>
                                <br></br>
                                <a href="/createAccount">
                                <button className="signUpBtn" type="button">Sign up</button>
                                </a>
                                <p>Already have an account? <a href="/signIn">Sign in</a></p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default SignUp;