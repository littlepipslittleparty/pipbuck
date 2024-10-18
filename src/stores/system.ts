import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useSystemStore = defineStore(
    'system',
    () => {
        const showHardwareButtons = ref(true);
        const date = ref({
            day: 23,
            month: 10,
            year: 2077,
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

        return {
            showHardwareButtons,
            date,
            // Actions
            setHardwareButtons,
            setDate,
        };
    },
    {
        persist: true,
    },
);
