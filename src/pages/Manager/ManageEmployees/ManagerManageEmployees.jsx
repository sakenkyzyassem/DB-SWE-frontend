import React from "react";
import { Container } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import Loading from "../../../components/Loading/Loading";
import "./ManagerManageEmployees.scss";
import {getAllEmployees} from "../../../services/managerServices";

const ImageComponent = ({job_title}) => {

    if (job_title == "Cleaner") {
        return (
            <img
            src={require(`../../../static/cleaner.svg`)} 
            alt="cleaner" 
            style={{height:"55px"}}
            className="imgGuest"
            />
        );
    }else{
        return (
            <img
            src={require(`../../../static/deskclerk.svg`)} 
            alt="deskclerk" 
            style={{height:"55px"}}
            className="imgGuest"
            />
        );
    }
};

class ManageEmployees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            employees: [],
            employeesId:[],
            personal: []
        }
        console.log(this.state);
    }

    componentDidMount() {
        getAllEmployees()
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    this.setState({
                      employees: [
                        ...this.state.employees,
                        res[i].first_name+" "+res[i].last_name
                      ],
                      employeesId: [
                          ...this.state.employeesId,
                          res[i].employee_id
                      ],
                      personal: [
                        ...this.state.personal,
                        res[i].job_title
                    ],
                    })
                }
            })
    }


    render() {
        if( this.state.isLoaded ) {
            return (
                <div className="manageEmployees">
                    <Container className="container">
                        <h2>Manage Employees</h2>
                        <input type="text" id="findGuest" class="findguest" onKeyUp="filteredSearch()" size="50" placeholder="Enter name and surname of the employee"></input>
                        <button class="search" type="button" >Search</button>
                        <div class="card" id="guestsList">
                            {this.state.employees.map((employee, i) => (
                                <Link to={`/manager/employee/${this.state.employeesId[i]}`}>
                                <div className="guest" id="list">
                                    <ImageComponent job_title={this.state.personal[i]}/>
                                    {employee}
                                </div>
                                </Link>
                            ))}
                        </div>
                    </Container>
                    <div className="back"></div>
                </div>
            )
        }
        else {
            return (
                <Loading />
            )
        }
    }
}

export default withRouter(ManageEmployees);