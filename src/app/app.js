import React from 'react';
import ReactCanvas, {Surface, Text} from 'react-canvas';
import ReactDOM from 'react-dom';

//import FirstChild from './components/FirstChild';

class App extends React.Component {
    render() {
        var size = {
            width: window.innerWidth,
            height: 50
        }
        var textStyle = {
            top: 10,
            left: 0,
            width: window.innerWidth,
            height: 20,
            lineHeight: 20,
            fontSize: 12
        };
        return (
            <Surface top={0} left={0} width={size.width} height={size.height}>
                <Text style={textStyle}>Yoo</Text>
            </Surface>
        );
    }
}

export default App;
