import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Note from './Note';
import {Notes, keyMap} from '../constants/all';

class Keyboard extends Component {

    constructor() {
        super();
        this.state = {
            activeNote: false,
            audioContext: false,
            gainNode: false,
            wave: false
        };
    }

    _registerMouseMoveListener = (func) => {
        this.setState({
            currentListener: func
        }, () => {
            document.addEventListener('mousemove', func);
        });
    }

    _playNote = (i) => {
        if(!this.state.activeNote) {
            this.setState({
                activeNote: i
            }, () => {
                this.state.oscillators[i].connect(this.state.gainNode);
            });
        }
    }

    _silenceActiveNote = () => {
        this.state.activeNote && Promise.resolve(this.state.oscillators[this.state.activeNote].disconnect(this.state.gainNode)).then(() => {
            this.setState({
                activeNote: false
            });
        });
    }

    _createWave = () => {
        var real = new Float32Array(2);
        var imag = new Float32Array(2);
        real[0] = 0;
        imag[0] = 0;
        real[1] = 1;
        imag[1] = 0;
        var wave = this.state.audioContext.createPeriodicWave(real, imag, {disableNormalization: true});
        this.setState({
            wave: wave
        });
    }

    _playNoteFromKeys = (e) => {
        let idx = keyMap.indexOf(e.which);
        if(idx > -1) {
            this._playNote(idx);
        }
    }

    componentWillMount() {
        this.setState({
            audioContext: new AudioContext()
        }, () => {
            Promise.resolve(this.setState({
                gainNode: this.state.audioContext.createGain()
            })).then(() => {
                this.state.gainNode.connect(this.state.audioContext.destination);
            }).then(() => {
                this._createWave();
            }).then(() => {
                this.setState({
                    oscillators: Notes.map(note => {
                        var osc = this.state.audioContext.createOscillator();
                        osc.setPeriodicWave(this.state.wave);
                        osc.frequency.value = note.freq,
                        osc.start();
                        return osc;
                    })
                });
            });
        });
        document.addEventListener('mouseup', this._silenceActiveNote);
        document.addEventListener('keydown', this._playNoteFromKeys);
        document.addEventListener('keyup', this._silenceActiveNote);
    }

    render() {
        let whiteNoteCount = 0;
        return (<div className={'keyboard'}>
            {Notes.map((note, i) => {
                if(note.cMaj) {
                    whiteNoteCount++;
                };
                return (<Note data={note} key={i} noteIndex={i} index={whiteNoteCount} playNote={this._playNote}/>);
            })}
        </div>);
    }
}

export default Keyboard;
