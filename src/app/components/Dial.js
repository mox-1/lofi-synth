import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Dial extends React.Component {

    render() {
        let deg =  - 130 + 2.6 * this.props.currentValue;
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
