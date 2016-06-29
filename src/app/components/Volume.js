import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {controlConstants} from '../constants/all';

class Volume extends React.Component {

    render() {
        let faderStyle = {
            backgroundImage: 'url(\'images/fader_wide.png\')',
            backgroundSize: 'contain',
            height: 17,
            width: 80,
            position: 'absolute',
            bottom: controlConstants.VOLUME_FADER_SCALE * this.props.currentValue
        };
        let faderWrapperStyle = {
            position: 'absolute',
            height: 150,
            width: 78,
            margin: 10
        };
        return (
            <div style={faderWrapperStyle}>
                <div className={'faderSlit wide'} style={{left: 'calc(50% - 3px)'}}></div>
                <div style={faderStyle} onMouseDown={this.props.handleMouseDown}></div>
            </div>
        );
    }
}

Volume.propTypes = {
    currentValue: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired
};

export default Volume;
