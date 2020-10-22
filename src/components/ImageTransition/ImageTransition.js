import React from "react";
import './ImageTransition.scss';

class ImageTransition extends React.Component {

    onHover = () => {

    }

    render() {
        return(
            <div className="img-card m-3">
                <img
                    onMouseEnter={() => this.onHover}
                    className="hotel-img"
                    src={this.props.src}
                    height={this.props.height}
                    width={this.props.width}
                />
                <div className="transition-card card-text" style={{height: this.props.height, width: this.props.width}}>
                    <h5>Hotel-name</h5>
                    <p>Place-of-location</p>
                </div>
            </div>
        )
    }
}

export default ImageTransition;