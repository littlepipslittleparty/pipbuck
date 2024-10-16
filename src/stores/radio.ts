import {defineStore} from 'pinia';
import {computed, ref} from 'vue';

export const useRadioStore = defineStore('radio', () => {
    const current_time = ref(0);
    const selected = ref<string | null>(null);
    const tracks = ref({
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
    });

    const selectTrack = (name: string) => {
        selected.value = name;
    };

    const currentOrNull = computed(() => {
        if (selected.value === null) {
            return null;
        }
        return tracks.value[selected.value];
    });

    const currentFile = computed(() => {
        const current = currentOrNull.value;
        if (!current || !current.file) {
            return '';
        }
        if (current.file.startsWith('/') && !current.file.startsWith('//')) {
            return window.location.origin + current.file;
        }
        return current.file;
    });

    const isPlaying = computed(() => currentOrNull.value !== null);

    return {
        current_time,
        selected,
        tracks,
        selectTrack,
        currentOrNull,
        currentFile,
        isPlaying,
    };
});