import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

class Note extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        noteIndex: PropTypes.number.isRequired,
        playNote: PropTypes.func.isRequired
    }

    constructor() {
        super();
        this.state = {
            osc: false
        };
    }

    _playNote = () => {
        this.props.playNote(this.props.noteIndex);
    }

    // pass in audiocontext and waveform as props

    render() {
        return (<div onMouseDown={this._playNote} className={this.props.data.cMaj ? 'whiteNote' : 'blackNote'} style={{left: this.props.index * 64 - 20}}></div>);
    };
};

export default Note;
