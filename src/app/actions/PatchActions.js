import {ActionTypes} from '../constants/all';

export function loadPatches() {
    return {
        type: ActionTypes.LOAD_PATCHES
    };
}

export function addNewPatch(data) {
    return {
        type: ActionTypes.ADD_NEW_PATCH,
        payload: data
    };
}

export function editPatch(data, i) {
    return {
        type: ActionTypes.EDIT_PATCH,
        payload: {
            data: data,
            index: i
        }
    };
}
