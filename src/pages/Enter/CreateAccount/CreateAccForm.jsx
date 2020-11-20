import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './CreateAccForm.scss';

class CreateAccForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            mobile: "",
            address: "",
            documentType: "",
            documentId: "",
            home: "",
            success: false
         }
        this.createUser = this.createUser.bind(this);
    }

    async createUser(e) {
        let userPrev = this.props.history.location.state;
        const user = {
            email: userPrev.email,
            password: userPrev.password,
            price: 0,
            ...this.state
        }
        await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }).then((res) => {
            console.log(res);
            if( res.ok ) {
                this.props.history.push('/auth/createAccountSuccess');
            }
        })
            .catch(err => console.log(err));
    }

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
                            <input type="text" placeholder="Enter first name" className="inputForm2" onChange={e => this.setState({firstName: e.target.value})}></input>
                            <label>Last Name</label>
                            <input type="text" placeholder="Enter last name" className="inputForm2"onChange={e => this.setState({lastName: e.target.value})}></input>
                            <label>Mobile Phone</label>
                            <input type="tel" maxLength="12" placeholder="Enter mobile phone number" className="inputForm2" onChange={e => this.setState({mobile: e.target.value})}></input>
                            <label>Address</label>
                            <input type="text" placeholder="Enter address" className="inputForm2" onChange={e => this.setState({address: e.target.value})}></input>
                        </div>
                        <div className="col-6">
                            <label className="labelType">ID Type</label>
                            <select onChange={e => this.setState({documentType: e.target.value})}>
                                <option selected disabled>Choose identification type</option>
                                <option     >Passport</option>
                                <option>Driving license</option>
                            </select>
                            <label>ID Number</label>
                            <input placeholder="Enter identification number" className="inputForm2" onChange={e => this.setState({documentId: e.target.value})}></input>
                            <label>Home Phone</label>
                            <input type="tel" placeholder="Enter home phone number" className="inputForm2" onChange={e => this.setState({home: e.target.value})}></input>
                        </div>
                    </div>
                    <div className="container2">
                     <button className="signUpBtn" onClick={this.createUser}>Continue</button>
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default withRouter(CreateAccForm);