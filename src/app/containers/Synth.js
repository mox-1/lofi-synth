import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import SynthPanel from '../components/SynthPanel';

// dont give this component a state. let all data come from redux

class Synth extends Component {

    constructor() {
        super();
        this.state = {
            activePatch: 1,
            // a mockup of redux state. can therfore be added and edited to with actions
            patches: [
                {
                    title: 'Classic Piano',
                    params: {
                        osc: 1,
                        attack: 10,
                        sustain: 0,
                        delay: 50,
                        release: 90,
                        frequency: 67,
                        resonance: 97
                    }
                },
                {
                    title: 'FM synth',
                    params: {
                        osc: 2,
                        attack: 90,
                        sustain: 4,
                        delay: 76,
                        release: 45,
                        frequency: 70,
                        resonance: 3
                    }
                }
            ]
        };
    }

    static propTypes = {

    }

    _incrementActivePatch = () => {
        let incremented = this.state.activePatch + 1;
        this.setState({
            activePatch: incremented === this.state.patches.length ? 0 : incremented
        });
    }

    _decrementActivePatch = () => {
        let decremented = this.state.activePatch - 1;
        this.setState({
            activePatch: decremented < 0 ? this.state.patches.length - 1 : decremented
        });
    }

    _savePatch = (data) => {
        // redux action to update active id of redux state with params
        // send data to backend
    }

    // initialising a new patch will take place in SynthPanel state

    render() {
        let activePatch = this.state.patches[this.state.activePatch];
        return (
            <div>
                <SynthPanel
                    activePatch={activePatch}
                    incrementActivePatch={this._incrementActivePatch}
                    decrementActivePatch={this._decrementActivePatch}
                />
            </div>
        );
    }
}

export default Synth;
