import React, {PropTypes} from 'react';
import {Surface, Shape, Path, Transform, Group} from 'react-art';
import ReactDOM from 'react-dom';

class FilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 150
        };
    }

    _paintCurve = (ctx) => {
        let y = this.state.height/2;
        let resonanceStart = (this.props.resonance + 130)/2;
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.bezierCurveTo(250, y, 300, y - resonanceStart, 300, 200);
        ctx.stroke();
    }

    componentWillReceiveProps(nextProps) {
        var context = ReactDOM.findDOMNode(this).getContext('2d');
        context.clearRect(0, 0, 600, 300);
        context.translate((nextProps.frequency - this.props.frequency) * 2.5, 0);
        this._paintCurve(context);
    }

    componentDidMount() {
        var context = ReactDOM.findDOMNode(this).getContext('2d');
        context.translate(-250 + this.props.frequency * 2.5, 0);
        context.strokeStyle = "#FF0000";
        this._paintCurve(context);
    }

    render() {
        let surfaceStyle = {
            position: 'absolute',
            border: '8px solid #6b6363',
            'border-style': 'double',
            top: 25,
            left: '35%',
            backgroundImage: 'url(\'images/graph_background.png\')',
            backgroundSize: 'cover'
        };

        return (
            <canvas style={surfaceStyle} width={300} height={this.state.height}></canvas>
        );
    }
}

FilterPanel.propTypes = {
    resonance: PropTypes.number.isRequired,
    frequency: PropTypes.number.isRequired
};

export default FilterPanel;
