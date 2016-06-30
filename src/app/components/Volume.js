import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {ControlConstants} from '../constants/all';

const Volume = ({currentValue, handleMouseDown}) => {
    let faderStyle = {
        backgroundImage: 'url(\'images/fader_wide.png\')',
        backgroundSize: 'contain',
        height: 17,
        width: 80,
        position: 'absolute',
        bottom: ControlConstants.VOLUME_FADER_SCALE * currentValue
    };
    return (
        <div className={'volume-wrapper'}>
            <div className={'faderSlit wide'} style={{left: 'calc(50% - 3px)'}}></div>
            <div style={faderStyle} onMouseDown={handleMouseDown}></div>
        </div>
    );
};

Volume.propTypes = {
    currentValue: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired
};

export default Volume;
