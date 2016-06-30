import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Note from './Note';
import {Notes, keyMap} from '../constants/all';
import Voice from '../utils/Voice';

class Keyboard extends Component {

    constructor() {
        super();
        this.state = {
            oscillators: false,
            audioContext: false,
            gainNode: false,
            filter: false,
            activeNotes: []
        };
        this.activeNotes = {};
    }

    _setActiveNote = (i) => {
        if((Object.keys(this.activeNotes).indexOf(i.toString()) === -1)) {
            var osc = new Voice(this.state.audioContext, this.state.audioContext.destination, Notes[i].freq, {...this.props});
            osc.start();
            this.activeNotes[i] = osc;
            this.setState({
                activeNotes: [...this.state.activeNotes, i]
            });
        }
    }

    _stopAllActiveNotes = () => {
        Object.keys(this.activeNotes).forEach((noteKey) => {
            this.activeNotes[noteKey].stop();
        });
        this.activeNotes = {};
        this.setState({
            activeNotes: []
        });
    }

    _stopActiveNote = (e) => {
        let idx = keyMap.indexOf(e.which);
        if(idx > -1) {
            Promise.resolve(this.activeNotes[idx].stop()).then(() => {
                delete this.activeNotes[idx];
            });
            this.setState({
                activeNotes: this.state.activeNotes.filter((note) => (note !== idx))
            });
        }
    }

    _playNoteFromKeys = (e) => {
        let idx = keyMap.indexOf(e.which);
        if(idx > -1) {
            this._setActiveNote(idx);
        }
    }

    componentWillMount() {
        this.setState({
            audioContext: new AudioContext()
        });
        document.addEventListener('mouseup', this._stopAllActiveNotes);
        document.addEventListener('keydown', this._playNoteFromKeys);
        document.addEventListener('keyup', this._stopActiveNote);
    }

    render() {
        let whiteNoteCount = 0;
        return (<div className={'keyboard'}>
            {Notes.map((note, i) => {
                if(note.cMaj) {
                    whiteNoteCount++;
                };
                return (<Note data={note} key={i} noteIndex={i} playing={!!~this.state.activeNotes.indexOf(i)} index={whiteNoteCount} playNote={this._setActiveNote}/>);
            })}
        </div>);
    }
}

Keyboard.propTypes = {
    oscType: PropTypes.string.isRequired,
    attack: PropTypes.number.isRequired,
    delay: PropTypes.number.isRequired,
    sustain: PropTypes.number.isRequired,
    release: PropTypes.number.isRequired,
    frequency: PropTypes.number.isRequired,
    resonance: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired
};

export default Keyboard;
