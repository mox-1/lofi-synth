import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {FilterPanelConstants} from '../constants/all';

class FilterPanel extends React.Component {

    _paintCurve = (ctx, res) => {
        const {
            HEIGHT,
            BEZIER_CONTROL_X_ONE,
            BEZIER_CONTROL_X_TWO,
            BEZIER_END_X,
            BEZIER_END_Y,
            RESONANCE_OFFSET,
            RESONANCE_SCALE
        } = FilterPanelConstants;
        let y = HEIGHT / 2;
        let resonanceStart = (res + RESONANCE_OFFSET) / RESONANCE_SCALE;
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.bezierCurveTo(
            BEZIER_CONTROL_X_ONE,
            y,
            BEZIER_CONTROL_X_TWO,
            y - resonanceStart,
            BEZIER_END_X,
            BEZIER_END_Y
        );
        ctx.stroke();
    }

    componentWillReceiveProps(nextProps) {
        var context = ReactDOM.findDOMNode(this).getContext('2d');
        context.clearRect(0, 0, 600, 300);
        context.translate((nextProps.frequency - this.props.frequency) * FilterPanelConstants.FREQUENCY_SCALE, 0);
        this._paintCurve(context, nextProps.resonance);
    }

    componentDidMount() {
        var context = ReactDOM.findDOMNode(this).getContext('2d');
        context.translate(FilterPanelConstants.FREQUENCY_OFFSET + this.props.frequency * FilterPanelConstants.FREQUENCY_SCALE, 0);
        context.strokeStyle = '#FF0000';
        this._paintCurve(context, this.props.resonance);
    }

    render() {
        return (
            <canvas className={'canvas-style'} width={FilterPanelConstants.WIDTH} height={FilterPanelConstants.HEIGHT}></canvas>
        );
    }
}

FilterPanel.propTypes = {
    resonance: PropTypes.number.isRequired,
    frequency: PropTypes.number.isRequired
};

export default FilterPanel;
