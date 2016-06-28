import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

class Header extends Component {
    render() {
        return (
            <div className={'header'}>
                <div className={'patch-selector'} >
                    <div onClick={this.props.incrementActivePatch}>+</div>
                    <div onClick={this.props.decrementActivePatch}>-</div>
                </div>
                <div className={'screen'}>{this.props.title}</div>
                <div onClick={this.props.newPatch}>NEW</div>
                <div onClick={this.props.savePatch}>SAVE</div>
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    incrementActivePatch: PropTypes.func.isRequired,
    decrementActivePatch: PropTypes.func.isRequired,
    newPatch: PropTypes.func.isRequired,
    savePatch: PropTypes.func.isRequired
};

export default Header;
