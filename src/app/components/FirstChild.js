import React from 'react';
import ReactCanvas, {Surface, ListView, Gradient, Text} from 'react-canvas';

class FirstChild extends React.Component {

    render() {
        var surfaceWidth = window.innerWidth;
        var surfaceHeight = window.innerHeight;
        return (
            <Surface
                width={surfaceWidth}
                height={surfaceHeight}
                left={0}
                top={0}
            />
        );
    }
}

export default FirstChild;
