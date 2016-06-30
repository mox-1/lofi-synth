import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {ControlConstants} from '../constants/all';

const Dial = ({currentValue, extraStyles, handleMouseDown}) => {
    const {DIAL_MINIMUM, DIAL_SCALE_PARAM} = ControlConstants;
    let deg =  DIAL_MINIMUM + DIAL_SCALE_PARAM * currentValue;
    let {top, left, transition}  = (extraStyles || {});
    let styles = {
        transform: 'rotate(' + deg + 'deg)'
    };
    return (
        <div onMouseDown={handleMouseDown} className={'dial-wrapper'}>
            <div className={'knob-lighting'}></div>
            <div className={'knob'} style={styles}></div>
        </div>
    );
};

Dial.propTypes = {
    currentValue: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    extraStyles: PropTypes.object
};

export default Dial;
