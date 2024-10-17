// Init styles pinia store
import { defineStore } from 'pinia';
import { hsl } from "@/lib/colorspace";
import { ref } from 'vue';

export const useStyleStore = defineStore(
  'style',
  () => {
    const colorFront = ref(hsl(37, 100, 63, '#ffb642'));
    const colorBack = ref(hsl(37, 78, 14, '#402a08'));
    const color_hair_bright = '#48f564';
    const color_hair_normal = '#39c64b';
    const color_hair_dark = '#299432';
    const color_outlines = '#09310f';
    const color_body_bright = '#0c5128';
    const color_body_normal = '#08401f';
    const color_body_dark = '#063016';
    const color_bg = '#021709';
    const showHardwareButtons = ref(true);

    // Actions to update the state
    const setFrontColor = (newColor: string) => {
        console.log('Set front color', newColor);
        colorFront.value = newColor;
    };

    const setBackColor = (newColor: string) => {
        console.log('Set back color', newColor);
        colorBack.value = newColor;
    };

    const setHardwareButtons = (state: boolean) => {
        console.log('toggleHardwareButtons');
        showHardwareButtons.value = state
    };

    return {
        colorFront,
        colorBack,
        color_hair_bright,
        color_hair_normal,
        color_hair_dark,
        color_outlines,
        color_body_bright,
        color_body_normal,
        color_body_dark,
        color_bg,
        showHardwareButtons,
        // Actions
        setFrontColor,
        setBackColor,
        setHardwareButtons,
    };
  },
  {
    persist: true,
  },
);
