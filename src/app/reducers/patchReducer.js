import {ActionTypes} from '../constants/all';

const initialState = [];

export default function patchReducer(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.LOAD_PATCHES:
            return [
                {
                    title: 'Classic Piano',
                    params: {
                        oscType: 'sawtooth',
                        attack: 10,
                        sustain: 0,
                        delay: 50,
                        release: 90,
                        frequency: 67,
                        resonance: 97
                    }
                },
                {
                    title: 'FM synth',
                    params: {
                        oscType: 'sine',
                        attack: 90,
                        sustain: 4,
                        delay: 76,
                        release: 45,
                        frequency: 70,
                        resonance: 3
                    }
                },
                {
                    title: 'Distort',
                    params: {
                        oscType: 'square',
                        attack: 1,
                        sustain: 3,
                        delay: 21,
                        release: 60,
                        frequency: 31,
                        resonance: 56
                    }
                },
                {
                    title: 'Chill',
                    params: {
                        oscType: 'sine',
                        attack: 44,
                        sustain: 1,
                        delay: 56,
                        release: 50,
                        frequency: 100,
                        resonance: 1
                    }
                }
            ];
        case ActionTypes.EDIT_PATCH:
            return state.map((patch, i) => {
                if (i === action.payload.index) {
                    return action.payload.data;
                } else {
                    return patch;
                }
            });
        case ActionTypes.ADD_NEW_PATCH:
            var newState = state.slice();
            newState.push(action.payload);
            return newState;
        default:
            return state;
    }
}
