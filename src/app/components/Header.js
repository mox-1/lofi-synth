import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';

const Header = ({incrementActivePatch, decrementActivePatch, title, newPatch, savePatch}) =>
    <div className={'header'}>
        <div className={'screen'}>{title}
            <div className={'patch-selector'} >
                <div onClick={incrementActivePatch} className={'arrow-up'}></div>
                <div onClick={decrementActivePatch} className={'arrow-down'}></div>
            </div>
            <div onClick={savePatch} className={'save-patch'}></div>
            <div onClick={newPatch} className={'add-patch'}>+</div>
        </div>
    </div>;

Header.propTypes = {
    title: PropTypes.string.isRequired,
    incrementActivePatch: PropTypes.func.isRequired,
    decrementActivePatch: PropTypes.func.isRequired,
    newPatch: PropTypes.func.isRequired,
    savePatch: PropTypes.func.isRequired
};

export default Header;
