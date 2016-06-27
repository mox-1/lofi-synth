import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

const Discrete = (WrappedComponent) =>
    class extends Component {
        static propTypes = {
            currentValue: PropTypes.number.isRequired
        }
        _discretise = (num) => {
            let steps = 3;
            let stepValue = 100 / steps;
            var value = 0;
            for (var i = 0; i < steps; i++) {
                if (num <= value) {
                    return value;
                };
                value += stepValue;
            }
            return 100;
        }
        render() {
            let style = {
                transition: 'transform 0.2s ease',
                top: '10px',
                left: '10px'
            };
            return (
                <div className={'discrete-dial-wrapper'}>
                    <div className={'osc-type sine'}></div>
                    <div className={'osc-type square'}></div>
                    <div className={'osc-type triangle'}></div>
                    <div className={'osc-type saw'}></div>
                    <WrappedComponent extraStyles={style} {...this.props} currentValue={this._discretise(this.props.currentValue)}/>
                </div>
            );
        }
    };

export default Discrete;
