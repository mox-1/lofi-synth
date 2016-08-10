import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './utils/configureStore';
import DevTools from './utils/DevTools';

const store = configureStore();

import Synth from './containers/Synth';

class App extends React.Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <div>
                        <Synth/>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default App;
