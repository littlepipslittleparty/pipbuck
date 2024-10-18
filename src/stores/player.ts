import {defineStore} from 'pinia';
import {ref} from 'vue';

// Progress type
export interface Progress {
    lvl: number;
    xp: number;
    nextLvlXp: number;
    ap: number;
    maxAp: number;
}

// Location type
export interface Location {
    city: string;
    region: string;
    coordinates: {
        longitude: number;
        latitude: number;
    }
}

// Health type
export interface Health {
    hp: number;
    maxHp: number;
    head: number;
    torso: number;
    leftArm: number;
    rightArm: number;
    leftLeg: number;
    rightLeg: number;
}

// Player store
export const usePlayerStore = defineStore(
    'player',
    () => {
        const progress = ref({
            lvl: 5,
            xp: 1758,
            nextLvlXp: 2500,
            ap: 70,
            maxAp: 90,
        });

        const setProgress = (newProgress: Progress) => { // Too lazy to type this out
            console.log('Set progress', newProgress);
            progress.value = newProgress;
        }

        const location = ref({
            city: 'Ponyville',
            region: 'Equestria',
            coordinates: {
                longitude: 0,
                latitude: 0,
            }
        });

        const setLocation = (newLocation: Location) => {
            console.log('Set location', newLocation);
            location.value = newLocation;
        }

        const health = ref({
            hp: 105,
            maxHp: 120,
            head: 10,
            torso: 30,
            leftArm: 15,
            rightArm: 15,
            leftLeg: 20,
            rightLeg: 20,
        });

        const setHealth = (newHealth: Health) => {
            console.log('Set health', newHealth);
            health.value = newHealth;
        }

        return {
            progress,
            setProgress,
            location,
            setLocation,
            health,
            setHealth,
        }
    },
    {
        persist: true,
    },
);
