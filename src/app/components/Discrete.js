import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {ControlConstants} from '../constants/all';

const Discrete = (WrappedComponent) =>
    class extends Component {
        static propTypes = {
            currentValue: PropTypes.number.isRequired
        }
        _discretise = (num) => {
            let steps = ControlConstants.NUM_OF_OSC_TYPES - 1;
            let stepValue = 100 / steps;
            var value = 1;
            for (var i = 0; i < steps; i++) {
                if (num <= value) {
                    return value;
                };
                value += stepValue;
            }
            return 100;
        }
        render() {
            return (
                <div className={'discrete-dial-wrapper'}>
                    <div className={'osc-type sine'}></div>
                    <div className={'osc-type square'}></div>
                    <div className={'osc-type triangle'}></div>
                    <div className={'osc-type saw'}></div>
                    <WrappedComponent {...this.props} currentValue={this._discretise(this.props.currentValue)}/>
                </div>
            );
        }
    };

export default Discrete;
