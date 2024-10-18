import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useSystemStore = defineStore(
    'system',
    () => {
        const showHardwareButtons = ref(true);
        // Previously 'game/PlayerInfo'
        const date = ref({
            day: 23,
            month: 10,
            year: 2077,
        });

        // Previously 'game/PlayerInfo/time'
        const time = ref({
            hours: 12,
            minutes: 0,
            seconds: 0,
        });

        // Actions to update the state
        const setHardwareButtons = (state: boolean) => {
            console.log('Set hardware buttons', state);
            showHardwareButtons.value = state
        };

        const setDate = (newDate: { day: number, month: number, year: number }) => {
            console.log('Set date', newDate);
            date.value = newDate;
        };

        const setTime = (newTime: { hours: number, minutes: number, seconds: number }) => {
            console.log('Set time', newTime);
            time.value = newTime;
        }

        return {
            showHardwareButtons,
            date,
            time,
            // Actions
            setHardwareButtons,
            setDate,
            setTime,
        };
    },
    {
        persist: true,
    },
);
