import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Fader extends React.Component {

    render() {
        let faderStyle = {
            backgroundImage: 'url(\'images/fader.png\')',
            backgroundSize: 'contain',
            height: 50,
            width: 23,
            position: 'absolute',
            bottom: this.props.currentValue
        };
        let faderWrapperStyle = {
            position: 'absolute',
            left: this.props.left,
            top: this.props.top,
            height: 150,
            width: 23,
            margin: 10
        };
        return (
            <div style={faderWrapperStyle}>
                <div className={'faderSlit'}></div>
                <div style={faderStyle} onMouseDown={this.props.handleMouseDown}></div>
            </div>
        );
    }
}

Fader.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    currentValue: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired
};

export default Fader;
