import {defineStore} from 'pinia';
import {ref} from 'vue';

export const usePlayerStore = defineStore(
    'player',
    () => {
        const lvl = ref(6);
        const hp = ref(105);
        const maxHp = ref(120);
        const xp = ref(1758);
        const maxXP = ref(2500);
        const ap = ref(70);
        const maxAP = ref(90);

        // Actions to update the state
        const setLevel = (newLvl: number) => {
            console.log('Set level', newLvl);
            lvl.value = newLvl;
        };

        const setHP = (newHP: number) => {
            console.log('Set HP', newHP);
            hp.value = newHP;
        };

        const setMaxHP = (newMaxHP: number) => {
            console.log('Set Max HP', newMaxHP);
            maxHp.value = newMaxHP;
        };

        const setXP = (newXP: number) => {
            console.log('Set XP', newXP);
            xp.value = newXP;
        };

        const setMaxXP = (newMaxXP: number) => {
            console.log('Set Max XP', newMaxXP);
            maxXP.value = newMaxXP;
        };

        const setAP = (newAP: number) => {
            console.log('Set AP', newAP);
            ap.value = newAP;
        };

        const setMaxAP = (newMaxAP: number) => {
            console.log('Set Max AP', newMaxAP);
            maxAP.value = newMaxAP;
        };

        return {
            lvl,
            hp,
            maxHp,
            xp,
            maxXP,
            ap,
            maxAP,
            // Actions
            setLevel,
            setHP,
            setMaxHP,
            setXP,
            setMaxXP,
            setAP,
            setMaxAP,
        };
    },
    {
        persist: true,
    },
);
