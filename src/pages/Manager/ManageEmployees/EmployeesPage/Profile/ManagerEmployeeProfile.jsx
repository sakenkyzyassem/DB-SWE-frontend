import React from "react";
import {getAllEmployees} from "../../../../../services/managerServices";
import Loading from "../../../../../components/Loading/Loading";
// import "./DeskClerkGuestProfile.scss";
import { Row, Col } from "react-bootstrap";
import {withRouter} from "react-router-dom";

const ImageComponent = ({job_title}) => {

    if (job_title == "Cleaner") {
        return (
            <img
            src={require(`../../../../../static/cleaner.svg`)} 
            alt="cleaner" 
            style={{height:"160px"}}
            />
        );
    }else{
        return (
            <img
            src={require(`../../../../../static/deskclerk.svg`)} 
            alt="deskclerk" 
            style={{height:"160px"}}
            />
        );
    }
};

class EmployeeProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            personal: {},
            index: 0
        }
        console.log(this.state);
    }

    componentDidMount() {
        getAllEmployees()
            .then(res => {
                const index = res.findIndex(g=>g.employee_id==this.props.employee_id);
                this.setState({index: index});
                this.setState({personal: res[index]});
                console.log(index);
                console.log(this.props.employee_id);
                console.log(this.state.personal);
                console.log(res);
            })
    }

    

    render() {
        if( this.state.isLoaded ) {
            return (
                <div className="employeeProfile">
                    <div style={{height:"50px"}}></div>
                    <h6 className="info-header">Employee's General Information</h6>
                    <br></br>
                    <Row>
                        <Col md={3}>
                            <p>First Name</p>
                            <p>Last Name</p>
                            <p>Email</p>
                        </Col>
                        <Col>
                            <p>{this.state.personal.first_name}</p>
                            <p>{this.state.personal.last_name}</p>
                            <p>{this.state.personal.email}</p>
                        </Col>
                        <Col md={3}>
                            <ImageComponent job_title={this.state.personal.job_title}/>
                        </Col>
                    </Row>
                    <h6 className="info-header">Employee's Work Information</h6>
                    <br></br>
                    <Row>
                        <Col md={3}>
                            <p>Job Title</p>
                            <p>Hotel</p>
                            <p>Payment</p>
                        </Col>
                        <Col>
                            <p>{this.state.personal.job_title}</p>
                            <p>{this.state.personal.hotel_id}</p>
                            <p>{this.state.personal.payment_per_hour} $/hour</p>
                        </Col>
                    </Row>
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

export default withRouter(EmployeeProfile);