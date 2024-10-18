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
    parts: { // 0.0 - 1.0
        head: number;
        body: number;
        legFrontLeft: number;
        legFrontRight: number;
        legHindLeft: number;
        legHindRight: number;
    }
}

// Player store
export const usePlayerStore = defineStore(
    'player',
    () => {
        const profile = ref({
            name: 'Littlepip',
        });

        const setProfile = (newProfile: {name: string}) => {
            console.log('Set profile', newProfile);
            profile.value = newProfile;
        }

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
            parts: {
                head: 0.8,
                body: 0.9,
                legFrontLeft: 0.7,
                legFrontRight: 0.7,
                legHindLeft: 0.6,
                legHindRight: 0.6,
            }
        });

        const setHealth = (newHealth: Health) => {
            console.log('Set health', newHealth);
            health.value = newHealth;
        }

        return {
            profile,
            setProfile,
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
