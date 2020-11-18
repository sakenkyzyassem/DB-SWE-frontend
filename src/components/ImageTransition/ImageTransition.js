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
                    alt={this.props.title}
                />
                <div className="transition-card card-text" style={{height: this.props.height, width: this.props.width}}>
                    <h5 id="title">{ this.props.title }</h5>
                    <p id="subtitle">{ this.props.subtitle }</p>
                </div>
            </div>
        )
    }
}

export default ImageTransition;