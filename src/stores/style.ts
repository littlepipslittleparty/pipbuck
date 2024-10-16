// Init styles pinia store
import { defineStore } from 'pinia';
import { hsl } from "@/lib/colorspace";

export const useStyleStore = defineStore('style', () => {
    const colorFront = 'hsl(37, 100%, 63%)'; // replacement for hsl(37, 100, 63, '#ffb642') as it doesn't work with pinia
    const colorBack = 'hsl(37, 78%, 14%)'; // replacement for hsl(37, 78, 14, '#402a08') as it doesn't work with pinia
    const color_hair_bright = '#48f564';
    const color_hair_normal = '#39c64b';
    const color_hair_dark = '#299432';
    const color_outlines = '#09310f';
    const color_body_bright = '#0c5128';
    const color_body_normal = '#08401f';
    const color_body_dark = '#063016';
    const color_bg = '#021709';
    const showHardwareButtons = true;

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
    };
});