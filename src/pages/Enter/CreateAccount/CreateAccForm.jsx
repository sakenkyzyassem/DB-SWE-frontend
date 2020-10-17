import React, { Component } from 'react';
import './CreateAccForm.scss';

class CreateAccForm extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="createAccForm">
                <div className="container">
                <img src={require('../../../static/LogoWhite.svg')} alt=""></img>
                <div className="card2">
                    <h1>Create an account</h1>
                    <div className="row">
                        <div className="col-6">
                            <label>First Name</label>
                            <input type="text" placeholder="Enter first name" className="inputForm2"></input>
                            <label>Last Name</label>
                            <input type="text" placeholder="Enter last name" className="inputForm2"></input>
                            <label>Mobile Phone</label>
                            <input type="tel" maxLength="11" placeholder="Enter mobile phone number" className="inputForm2"></input>
                            <label>Address</label>
                            <input type="text" placeholder="Enter address" className="inputForm2"></input>
                        </div>
                        <div className="col-6">
                            <label className="labelType">ID Type</label>
                            <select>
                                <option selected disabled>Choose identification type</option>
                                <option>Passport</option>
                                <option>Driving license</option>
                            </select>
                            <label>ID Number</label>
                            <input placeholder="Enter identification number" className="inputForm2"></input>
                            <label>Home Phone</label>
                            <input type="tel" placeholder="Enter home phone number" className="inputForm2"></input>
                        </div>
                    </div>
                    <div className="container2">
                        <a href="/createAccountSuccess">
                        <button className="signUpBtn">Continue</button>
                        </a>
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default CreateAccForm;