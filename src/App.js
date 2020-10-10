import React from 'react';
import './App.scss';
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
        <div className="row">
            <div className="col">
                <Header className="row"/>
                <div className="row Cover px-5">
                    <div className="col-4">
                        <img
                            src={require('./static/cover.png')}
                            alt="people-illustration"
                            height="280px"
                        />
                    </div>
                    <div className="offset-1 col-7 px-5 mt-5">
                        <h3><b>GETAROOM</b> is a hotel booking website, which will help you to find the perfect room</h3>
                    </div>
                </div>
                <div className="row">

                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
