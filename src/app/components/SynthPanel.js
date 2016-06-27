import React, {PropTypes} from 'react';
import {Surface, Group, Shape, Path} from 'react-art';
import ReactDOM from 'react-dom';
import Control from './Control';
import Discrete from './Discrete';
import Fader from './Fader';
import Dial from './Dial';
import FilterPanel from './FilterPanel';
import Volume from './Volume';
import Header from './Header';

var DialControl = Control(Dial);
var DialDiscreteControl = Control(Discrete(Dial));
var FaderControl = Control(Fader);
var VolumeControl = Control(Volume);

class SynthPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.activePatch.title,
            ...props.activePatch.params
        };
        this.currentListener = null;
        this.oscKeyToCentValue = [0, 34, 67, 100];
    }


    _clearMouseMoveListeners = () => {
        document.removeEventListener('mousemove', this.state.currentListener);
        this.setState({
            currentListener: null
        });
    }

    _registerMouseMoveListener = (func) => {
        this.setState({
            currentListener: func
        }, () => {
            document.addEventListener('mousemove', func);
        });
    }

    _handleParamChange = (key, val) => {
        this.setState({
            [key]: val
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.activePatch.title,
            ...nextProps.activePatch.params
        });
    }

    componentWillMount() {
        document.addEventListener('mouseup', this._clearMouseMoveListeners);
    }

    render() {
        console.log(this.state.delay);
        const width = 960;
        const height = 400;
        var BORDER_PATH = Path().moveTo(0, 0).line(0, height).line(width, 0).line(0, -1 * height).close();

        return (
            <div>
                <Header title={this.state.title} incrementActivePatch={this.props.incrementActivePatch} decrementActivePatch={this.props.decrementActivePatch}/>
                <div className={'synth-panel'}>
                    <Surface top={50} left={50} width={960} height={243}>
                        <Shape fill="#2e2f31" d={BORDER_PATH} />
                    </Surface>
                    <div className={'main-panel'}>
                        <DialDiscreteControl top={37} left={5} registerMouseMoveListener={this._registerMouseMoveListener} acuity={2} currentValue={this.oscKeyToCentValue[this.state.osc]} />
                        <div className={'asdr'}>
                            <FaderControl top={0} left={0} registerMouseMoveListener={this._registerMouseMoveListener} currentValue={this.state.attack} changeHandler={this._handleParamChange.bind(null, 'attack')} />
                            <FaderControl top={0} left={50} registerMouseMoveListener={this._registerMouseMoveListener} currentValue={this.state.sustain} changeHandler={this._handleParamChange.bind(null, 'sustain')} />
                            <FaderControl top={0} left={100} registerMouseMoveListener={this._registerMouseMoveListener} currentValue={this.state.delay} changeHandler={this._handleParamChange.bind(null, 'delay')} />
                            <FaderControl top={0} left={150} registerMouseMoveListener={this._registerMouseMoveListener} currentValue={this.state.release} changeHandler={this._handleParamChange.bind(null, 'release')} />
                        </div>
                        <FilterPanel frequency={this.state.frequency} resonance={this.state.resonance}/>
                        <DialControl top={24} left={670} registerMouseMoveListener={this._registerMouseMoveListener} changeHandler={this._handleParamChange.bind(null, 'frequency')} acuity={5}  currentValue={this.state.frequency}/>
                        <DialControl top={110} left={670} registerMouseMoveListener={this._registerMouseMoveListener} changeHandler={this._handleParamChange.bind(null, 'resonance')} position={-130} acuity={5}  currentValue={this.state.resonance}/>
                        <VolumeControl top={24} left={840} registerMouseMoveListener={this._registerMouseMoveListener} currentValue={60}/>
                    </div>
                </div>
            </div>
        );
    }
}

SynthPanel.propTypes = {
    activePatch: PropTypes.object.isRequired,
    incrementActivePatch: PropTypes.func.isRequired,
    decrementActivePatch: PropTypes.func.isRequired
};

export default SynthPanel;
