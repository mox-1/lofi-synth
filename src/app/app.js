import React from 'react';
import {Surface, Group, Shape} from 'react-art';
import ReactDOM from 'react-dom';
import Synth from './containers/Synth';

class App extends React.Component {
    render() {
        return (
            <div>
                <Synth/>
            </div>
        );
    }
}

export default App;
