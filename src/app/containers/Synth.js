import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SynthPanel from '../components/SynthPanel';
import * as PatchActions from '../actions/PatchActions';

import {userPrompts} from '../constants/all';

// dont give this component a state. let all data come from redux

class Synth extends Component {

    constructor() {
        super();
        this.state = {
            tempPatch: false,
            activePatch: 1,
            patches: []
        };
    }

    static propTypes = {
        patches: PropTypes.array.isRequired,
        patchActions: PropTypes.object.isRequired
    }

    _incrementActivePatch = () => {
        let incremented = this.state.activePatch + 1;
        this.setState({
            tempPatch: false,
            activePatch: incremented === this.state.patches.length ? 0 : incremented
        });
    }

    _decrementActivePatch = () => {
        let decremented = this.state.activePatch - 1;
        this.setState({
            tempPatch: false,
            activePatch: decremented < 0 ? this.state.patches.length - 1 : decremented
        });
    }

    _savePatch = (data) => {
        // redux action to update active id of redux state with params
        // send data to backend
        let showSuccessMessage = () => {
            window.alert(userPrompts.SUCCESS);
        };
        if (this.state.tempPatch) {
            Promise.resolve(this.props.patchActions.addNewPatch(data)).then(() => {
                this.setState({
                    tempPatch: false,
                    activePatch: this.state.patches.length - 1
                }, showSuccessMessage);
            });
        } else {
            let x = window.confirm(userPrompts.CONFIRM);
            if (x) {
                Promise.resolve(this.props.patchActions.editPatch(data, this.state.activePatch)).then(showSuccessMessage);
            }
        }
    }

    _newPatch = () => {
        Promise.resolve(window.prompt(userPrompts.PROMPT)).then((title) => {
            this.setState({
                tempPatch: {
                    title: title,
                    params: {
                        osc: 1,
                        attack: 50,
                        sustain: 50,
                        delay: 50,
                        release: 50,
                        frequency: 50,
                        resonance: 50
                    }
                }
            });
        });
    }

    // initialising a new patch will take place in SynthPanel state

    componentWillReceiveProps(nextProps) {
        this.setState({
            patches: nextProps.patches
        });
    }

    componentWillMount() {
        this.props.patchActions.loadPatches();
    }

    render() {
        let activePatch = this.state.tempPatch || this.state.patches[this.state.activePatch];
        return activePatch && (
            <div>
                <SynthPanel
                    activePatch={activePatch}
                    incrementActivePatch={this._incrementActivePatch}
                    decrementActivePatch={this._decrementActivePatch}
                    newPatch={this._newPatch}
                    savePatch={this._savePatch}
                />
            </div>
        ) || <div>Loading</div>;
    }
}

var mapState = (state) => ({
    patches: state.patches
});

var mapDispatch = (dispatch) => ({
    patchActions: bindActionCreators(PatchActions, dispatch)
});

export default connect(mapState, mapDispatch)(Synth);
