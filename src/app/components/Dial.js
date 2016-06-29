import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {controlConstants} from '../constants/all';

class Dial extends React.Component {

    render() {
        const {DIAL_MINIMUM, DIAL_SCALE_PARAM} = controlConstants;
        let deg =  DIAL_MINIMUM + DIAL_SCALE_PARAM * this.props.currentValue;
        let {top, left, transition}  = (this.props.extraStyles || {});
        let styles = {
            transform: 'rotate(' + deg + 'deg)',
            transition: transition || 'inherit'
        };
        let stylesLight = {
            position: 'absolute',
            top: top || 0,
            left: left || 0
        };
        return (
            <div onMouseDown={this.props.handleMouseDown} style={stylesLight}>
                <div className={'knob-lighting'}></div>
                <div className={'knob'} style={styles}></div>
            </div>
        );
    }
}

Dial.propTypes = {
    currentValue: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    extraStyles: PropTypes.object
};

export default Dial;
