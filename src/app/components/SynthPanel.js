import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Control from './Control';
import Discrete from './Discrete';
import Fader from './Fader';
import Dial from './Dial';
import FilterPanel from './FilterPanel';
import Volume from './Volume';
import Header from './Header';
import Keyboard from './Keyboard';

var DialControl = Control(Dial);
var DialDiscreteControl = Control(Discrete(Dial));
var FaderControl = Control(Fader);
var VolumeControl = Control(Volume);

class SynthPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.activePatch.title,
            ...props.activePatch.params,
            currentListener: false,
            volume: 60
        };
    }


    _clearMouseMoveListeners = () => {
        document.removeEventListener('mousemove', this.state.currentListener);
        this.setState({
            currentListener: false
        });
    }

    _registerMouseMoveListener = (func) => {
        this.setState({
            currentListener: func,
        }, () => {
            document.addEventListener('mousemove', func);
        });
    }

    _handleParamChange = (key, val) => {
        this.setState({
            [key]: val
        });
    }

    _setOscillatorType = (val) => {
        var type;
        if(val < 2) {
            type = 'sine';
        } else if (val < 34) {
            type = 'square';
        } else if (val < 67) {
            type = 'triangle';
        } else {
            type = 'sawtooth';
        }
        this.setState({
            oscType: type,
            oscVal: val
        });
    }

    _setOscillatorVal = (type) => {
        var val;
        if(type === 'sine') {
            val = 1;
        } else if (type === 'square') {
            val = 34;
        } else if (type === 'triangle') {
            val = 67;
        } else if (type === 'sawtooth') {
            val = 100;
        }
        return val;
    }

    _savePatch = () => {
        let {oscType, attack, sustain, delay, release, frequency, resonance} = this.state;
        this.props.savePatch({
            title: this.state.title,
            params: {
                oscType,
                attack,
                sustain,
                delay,
                release,
                frequency,
                resonance
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.activePatch.title,
            ...nextProps.activePatch.params,
            oscVal: this._setOscillatorVal(this.props.activePatch.params.oscType)
        });
    }

    componentWillMount() {
        document.addEventListener('mouseup', this._clearMouseMoveListeners);
        this.setState({
            oscVal: this._setOscillatorVal(this.props.activePatch.params.oscType)
        });
    }

    render() {
        return (
            <div>
                <Header title={this.state.title} incrementActivePatch={this.props.incrementActivePatch} decrementActivePatch={this.props.decrementActivePatch} newPatch={this.props.newPatch} savePatch={this._savePatch}/>
                <div className={'synth-panel' + (!!this.state.currentListener ? ' active' : '')}>
                    <div className={'main-panel'}>
                        <div className={'osc-section'}>
                            <div className={'section-label'}>OSC</div>
                            <DialDiscreteControl
                                registerMouseMoveListener={this._registerMouseMoveListener}
                                acuity={2}
                                currentValue={this.state.oscVal}
                                changeHandler={this._setOscillatorType}
                            />
                        </div>
                        <div className={'asdr'}>
                            <div className={'section-label'}>ENV</div>
                            <FaderControl
                                top={0}
                                left={0}
                                registerMouseMoveListener={this._registerMouseMoveListener}
                                currentValue={this.state.attack}
                                changeHandler={this._handleParamChange.bind(null, 'attack')}
                            />
                            <FaderControl
                                top={0}
                                left={50}
                                registerMouseMoveListener={this._registerMouseMoveListener}
                                currentValue={this.state.delay}
                                changeHandler={this._handleParamChange.bind(null, 'delay')}
                            />
                            <FaderControl
                                top={0}
                                left={100}
                                registerMouseMoveListener={this._registerMouseMoveListener}
                                currentValue={this.state.sustain}
                                changeHandler={this._handleParamChange.bind(null, 'sustain')}
                            />
                            <FaderControl
                                top={0}
                                left={150}
                                registerMouseMoveListener={this._registerMouseMoveListener}
                                currentValue={this.state.release}
                                changeHandler={this._handleParamChange.bind(null, 'release')}
                            />
                        </div>
                        <div className={'filter-section'}>
                            <div className={'section-label'}>FILTER</div>
                            <FilterPanel
                                frequency={this.state.frequency}
                                resonance={this.state.resonance}
                            />
                            <DialControl
                                top={25}
                                left={328}
                                registerMouseMoveListener={this._registerMouseMoveListener}
                                changeHandler={this._handleParamChange.bind(null, 'frequency')}
                                acuity={5}
                                currentValue={this.state.frequency}
                            />
                            <DialControl
                                top={115}
                                left={328}
                                registerMouseMoveListener={this._registerMouseMoveListener}
                                changeHandler={this._handleParamChange.bind(null, 'resonance')}
                                acuity={5}
                                currentValue={this.state.resonance}
                            />
                        </div>
                        <div className={'volume-section'}>
                            <div className={'section-label'}>VOL</div>
                            <VolumeControl
                                top={0}
                                left={0}
                                registerMouseMoveListener={this._registerMouseMoveListener}
                                currentValue={this.state.volume}
                                changeHandler={this._handleParamChange.bind(null, 'volume')}
                            />
                        </div>
                    </div>
                </div>
                <Keyboard {...this.state}/>
            </div>
        );
    }
}

SynthPanel.propTypes = {
    activePatch: PropTypes.object.isRequired,
    incrementActivePatch: PropTypes.func.isRequired,
    decrementActivePatch: PropTypes.func.isRequired,
    newPatch: PropTypes.func.isRequired,
    savePatch: PropTypes.func.isRequired
};

export default SynthPanel;
