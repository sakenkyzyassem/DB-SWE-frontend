import React from "react";

import './Home.scss';

class Home extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="row Cover px-5">
                    <div className="col-4">
                        <img
                            src={require("../../static/cover.png")}
                            alt="people-illustration"
                            height="280px"
                        />
                    </div>
                    <div className="offset-1 col-7 px-5 mt-5">
                        <h3><b>GETAROOM</b> is a hotel booking website, which will help you to find the perfect room</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;