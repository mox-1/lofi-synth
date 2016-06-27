import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

const Control = (WrappedComponent) =>
    class extends Component {

        static propTypes = {
            top: PropTypes.number.isRequired,
            left: PropTypes.number.isRequired,
            acuity: PropTypes.number.isRequired,
            registerMouseMoveListener: PropTypes.func.isRequired,
            currentValue: PropTypes.number.isRequired,
            changeHandler: PropTypes.func
        };

        static defaultProps = {
            acuity: 1,
        }

        constructor(props) {
            super(props);
            this.state = {
                relY: props.currentValue,
                lastY: 0
            };
        }

        _onMouseMove = (e) => {
            let newRelY = this.state.relY + (this.state.lastY - e.pageY) / this.props.acuity;
            this.setState({
                lastY: e.pageY,
                relY: this._scaleParam(newRelY)
            }, () => {
                if (typeof this.props.changeHandler === 'function') {
                    this.props.changeHandler(this.state.relY);
                }
            });
        }

        _handleMouseDown = (e) => {
            e.preventDefault();
            this.setState({
                lastY: e.pageY
            }, () => {
                this.props.registerMouseMoveListener(this._onMouseMove);
            });
        }

        _scaleParam = (param) => {
            if (param < 0) {
                return 0;
            } else if (param > 100) {
                return 100;
            } else {
                return param;
            }
        }

        componentWillReceiveProps(nextProps) {
            this.setState({
                relY: nextProps.currentValue
            });
        }

        render() {
            const {top, left} = this.props;
            return (
                <div style={{top, left, position: 'absolute'}}>
                    <WrappedComponent currentValue={this.state.relY} handleMouseDown={this._handleMouseDown}/>
                </div>
            );
        }
    };

export default Control;
