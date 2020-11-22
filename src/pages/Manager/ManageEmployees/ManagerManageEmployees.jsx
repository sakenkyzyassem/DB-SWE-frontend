import React from "react";
import { Container } from "react-bootstrap";
import { Link, withRouter } from 'react-router-dom';
import Loading from "../../../components/Loading/Loading";
import "./ManagerManageEmployees.scss";
import {getAllEmployees} from "../../../services/managerServices";
import UserContext from "../../../services/userContext";

const ImageComponent = ({job_title}) => {

    if (job_title === "Cleaner") {
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
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            manager: null,
            isLoaded: true,
            employees: [],
            employeesId:[],
            personal: []
        }
        //console.log(this.state);
    }

    componentDidMount() {
        let context = this.context;
        this.setState({manager: context.user});
        //console.log(this.state.manager)

        getAllEmployees()
            .then(res => {
                for (let i = 0; i < res.length; i++) {
                    if(res[i].hotel_id===this.state.manager.hotel_id && res[i].role!=="MANAGER"){
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