import {defineStore} from 'pinia';
import {computed, ref} from 'vue';

export type RadioStation = {
  file: string;
  disabled: boolean;
  hidden: boolean;
  position: number;
};

export type NullRadioStation = {
  [ignored in keyof RadioStation]: null;
};

export const useRadioStore = defineStore(
  'radio',
  () => {
    const current_time = ref(0);
    const tracks = ref<{[stationName: string]: RadioStation | NullRadioStation}>({
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
            // seems to have gone 404 :(
            // — but like since 2016 ?!?  https://www.facebook.com/FillydelphiaRadio/posts/hey-guys-its-westj-heregot-some-bad-newsyou-might-have-known-for-a-while-this-mi/1371714502916087/
            file: 'https://fillyradio.com/stream-320k',
            disabled: true,
            hidden: false,
            position: 0,
        },
        'Ponyville FM': {
            file: 'https://dj.bronyradio.com/stream.mp3',
            disabled: false,
            hidden: false,
            position: 0,
        },
        'Brony Radio Germany': {
            file: 'http://radio.bronyradiogermany.com:8000/stream',
            disabled: false,
            hidden: false,
            position: 0,
        },
    });
    const selected = ref<keyof typeof tracks.value | null>(null);

    const selectTrack = (name: keyof typeof tracks.value) => {
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
  },
  {
    persist: true,
  }
);
