import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateAccSuccess.scss';

class CreateAccSuccess extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="createAccSuccess">
                <div className="containerForSuccess">
                <img src={require('../../../static/LogoWhite.svg')} alt=""></img>
                <div className="cardForSuccess">
                    <div className="row">
                        <h1>You signed up successfully!</h1>
                        <p>
                            Thank you for choosing <b>GETAROOM</b>. Please, go back to sign in page to enter and get a room.
                        </p>
                        <br></br>
                        <div className="container2" style={{width:"600px"}}>
                            <Link to="/auth/signIn">
                            <button className="signUpBtn" type="button">OK</button>
                            </Link>
                        </div>
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default CreateAccSuccess;