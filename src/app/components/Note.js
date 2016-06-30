import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

const Note = ({data, playNote, index, noteIndex, playing}) => {

    var _playNote = () => {
        playNote(noteIndex);
    };
    return (
        <div
            onMouseDown={_playNote}
            className={(data.cMaj ? 'white-note' : 'black-note') + (playing ? ' pressed' : '')}
            style={{left: index * 64 - 20}}
        >
        </div>
    );
};

Note.propTypes = {
    data: PropTypes.object.isRequired,
    playNote: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    noteIndex: PropTypes.number.isRequired,
    playing: PropTypes.bool.isRequired
};

export default Note;
