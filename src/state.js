/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable */ // <- we'll throw out vuex anyway.

import {createStore} from 'vuex';
import VuexPersistence from 'vuex-persist';
import {hsl} from './lib/colorspace';
import game from './data/generators/Root';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    strictMode: process.env.NODE_ENV !== 'production',
    key: 'pipbuck-gamedata',
});

const radio = {
    debug: process.env.NODE_ENV !== 'production',
    strict: process.env.NODE_ENV !== 'production',
    state: {
        current_time: 0, // audio.currentTime = 60;
        selected: null,
        // current: computed
        tracks: {
            null: {
                file: null,
                disabled: null,
                hidden: null,
                position: null,
            },
            'Galaxy News Radio': {
                file: '/audio/radio/gnr.mp3',
                disabled: false,
                hidden: false,
                position: 0,
            },
            'Diamond City Radio': {
                file: '/audio/radio/dcr.mp3',
                disabled: false,
                hidden: false,
                position: 0,
            },
            'Test Track': {
                file: '/audio/radio/test.mp3',
                disabled: false,
                hidden: false,
                position: 0,
            },
            'Fillydelphia Radio': {
                file: 'https://fillyradio.com/stream-320k',
                disabled: false,
                hidden: false,
                position: 0,
            },
        },
    },
    mutations: {
        selectTrack(state, name) {
            state.selected = name;
        },
    },
    getters: {
        /**
         * returns the file or null
         * @return {null|{file: string, disabled: string, hidden: string, position: string}}
         */// eslint-disable-next-line no-unused-vars
        currentOrNull: (state, getters) => {
            if (state.selected === null) {
                return null;
            }
            return getters.current;
        },

        currentFile(state, getters) {
            if (getters.current.file == null) {
                return '';
            }
            if (
                getters.current.file.length >= 1 && getters.current.file[0] === '/' // starts with slash
                && getters.current.file.length >= 2 && getters.current.file[1] !== '/' // but not double
            ) {
                // is relative path
                return window.location.origin + getters.current.file;
            }
            return getters.current.file;
        },

        /**
         * returns the file or object filled with null
         * @return {{file: null|string, disabled: null|string,
         *           hidden: null|string, position: null|string}}
         */// eslint-disable-next-line no-unused-vars
        current: (state, getters) => state.tracks[state.selected],

        isPlaying: (state, getters) => {
            if (getters.currentOrNull === null) {
                return false;
            }
            return true;
        },
    },
};

const store = createStore({
    debug: process.env.NODE_ENV !== 'production',
    strict: process.env.NODE_ENV !== 'production',
    plugins: [vuexLocal.plugin],
    modules: {
        radio: {
            ...radio,
            namespaced: true,
        },
        game: {
            ...game,
            namespaced: true,
        },
    },
    state: {
        colorFront: hsl(37, 100, 63, '#ffb642'),
        colorBack: hsl(37, 78, 14, '#402a08'),
        // colorFront: '#a0f8c5', // '#9ef8bd',
        // colorBack: '#08401f',

        // color_hair_bright: '#9ef8bd',
        // color_hair_normal: '#1bff80',
        // color_outlines: '#1bff80',

        color_hair_bright: '#48f564',
        color_hair_normal: '#39c64b',
        color_hair_dark: '#299432',

        color_outlines: '#09310f',

        color_body_bright: '#0c5128',
        color_body_normal: '#08401f',
        color_body_dark: '#063016',

        color_bg: '#021709',

        showHardwareButtons: true,
        // colorFront2: '#1bff80',
        // colorBack2: '#1d2c24',
    },
    mutations: {
        RESTORE_MUTATION: (state) => {
            console.log('RESTORE_MUTATION');
        },
        setColorFront(state, color) {
            state.colorFront = color;
        },
        setColorBack(state, color) {
            state.colorBack = color;
        },
        toggleHardwareButtons(state, value) {
            console.log('mutating toggleHardwareButtons state: ', value);
            state.showHardwareButtons = value;
        },
    },
    getters: {},
});

export default store;
