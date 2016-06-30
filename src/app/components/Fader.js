import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const Fader = ({currentValue, handleMouseDown}) => {
    let faderStyle = {
        bottom: currentValue
    };

    return (
        <div className={'fader-wrapper'}>
            <div className={'faderSlit'}></div>
            <div className={'fader-style'} style={faderStyle} onMouseDown={handleMouseDown}></div>
        </div>
    );
};

Fader.propTypes = {
    currentValue: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired
};

export default Fader;
