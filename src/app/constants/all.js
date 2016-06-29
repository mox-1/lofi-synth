export const ActionTypes =  {
    LOAD_PATCHES: 'LOAD_PATCHES',
    ADD_NEW_PATCH: 'ADD_NEW_PATCH',
    EDIT_PATCH: 'EDIT_PATCH'
};

export const controlConstants = {
    DIAL_MINIMUM: -130,
    DIAL_SCALE_PARAM: 2.6,
    NUM_OF_OSC_TYPES: 4,
    VOLUME_FADER_SCALE: 1.29
};

export const filterPanelConstants = {
    HEIGHT: 150,
    WIDTH: 300,
    BEZIER_CONTROL_X_ONE: 250,
    BEZIER_CONTROL_X_TWO: 300,
    BEZIER_END_X: 300,
    BEZIER_END_Y: 200,
    RESONANCE_OFFSET: 130,
    RESONANCE_SCALE: 2,
    FREQUENCY_OFFSET: -250,
    FREQUENCY_SCALE: 2.5
};

export const userPrompts = {
    SUCCESS: 'Patch saved :)',
    CONFIRM: 'Overwrite patch?',
    PROMPT: 'Enter a name for your patch'
};

export const Notes = [
    {
        freq: 146.8,
        cMaj: true
    },
    {
        freq: 155.6,
        cMaj: false
    },
    {
        freq: 164.8,
        cMaj: true
    },
    {
        freq: 174.6,
        cMaj: true
    },
    {
        freq: 185,
        cMaj: false
    },
    {
        freq: 196.0,
        cMaj: true
    },
    {
        freq: 207.7,
        cMaj: false
    },
    {
        freq: 220.0,
        cMaj: true
    },
    {
        freq: 233.1,
        cMaj: false
    },
    {
        freq: 246.9,
        cMaj: true
    },
    {
        freq: 261.6,
        cMaj: true
    },
    {
        freq: 277.2,
        cMaj: false
    },
    {
        freq: 293.7,
        cMaj: true
    },
    {
        freq: 311.1,
        cMaj: false
    },
    {
        freq: 329.6,
        cMaj: true
    },
    {
        freq: 349.2,
        cMaj: true
    },
    {
        freq: 370.0,
        cMaj: false
    },
    {
        freq: 392.0,
        cMaj: true
    },
    {
        freq: 415.3,
        cMaj: false
    },
    {
        freq: 440.0,
        cMaj: true
    },
    {
        freq: 466.2,
        cMaj: false
    },
    {
        freq: 493.9,
        cMaj: true
    },
    {
        freq: 523.3,
        cMaj: true
    },
    {
        freq: 554.4,
        cMaj: false
    },
    {
        freq: 587.3,
        cMaj: true
    }
];

export const keyMap = [
    65,
    81,
    90,
    83,
    87,
    88,
    69,
    68,
    82,
    67,
    70,
    84,
    86,
    89,
    71,
    66,
    85,
    72,
    73,
    78,
    79,
    74,
    77,
    80,
    75
];
