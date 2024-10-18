<template>
  <div>
    <div>
      <a href="/">Reload</a>
    </div>
    <div>
      <RouterLink :to="{ name: 'Boot' }">Turn Off</RouterLink>
    </div>
    <div>
      <a @click="toggleFullscreen" :class="{ active: screenfull.isFullscreen }">Fullscreen</a>
    </div>
    <div>
      <label>Virtual buttons</label>
      <a @click="leToggleVirtualButtons(true)" class="active">ON</a>
      <a @click="leToggleVirtualButtons(false)" class="active">OFF</a>
    </div>
    <div>
      <label>Color</label>
      <div v-for="(row, i) in colors" :key="i">
        <a
            v-for="color in row" :key="color.name"
            @click="setColor(color)" class="active"
        >{{ color.name }}</a>
        <!-- :style="{ borderColor: color.foreground, color: color.foreground,
       backgroundColor: color.background }"-->
      </div>
    </div>
    <div>
      <StableColt :hair="hair" :back="back"/>
    </div>
  </div>
</template>

<script>
import {computed, reactive} from 'vue';
import * as screenfull from 'screenfull';
import {HexToHSL, hsl} from '../../lib/colorspace';
import StableColt from '../../components/StableColt.vue';
import {ui} from '../../sound';
import {useStyleStore} from "@/stores/style";
import {useSystemStore} from "@/stores/system";

export default {
  name: 'SettingsExtra',
  components: {StableColt},
  setup() {
    const styleStore = useStyleStore();
    const systemStore = useSystemStore();
    const colors = reactive([
      [
        {
          name: 'Amber',
          foreground: hsl(37, 100, 63, '#ffb642'),
          background: hsl(37, 78, 14, '#402a08'),
        },
        {
          name: 'Blue',
          foreground: hsl(194, 100, 59, '#2ecfff'),
          background: hsl(194, 78, 14, '#083340'),
        },
        {
          name: 'Green',
          foreground: hsl(147, 100, 55, '#1aff80'),
          background: hsl(147, 78, 14, '#084021'),
        },
        {
          name: 'White',
          foreground: hsl(180, 100, 88, '#c0ffff'),
          background: hsl(180, 100, 14, '#004747'),
        },
      ],
      [
        {
          name: 'Alt Amber',
          foreground: hsl(40, 85, 79, '#f7da9e'),
          background: hsl(40, 78, 14, '#402d08'),
        },
        {
          name: 'Alt Blue',
          foreground: hsl(180, 85, 79, '#9ff5f5'),
          background: hsl(180, 78, 14, '#084040'),
        },
        {
          name: 'Alt Green',
          foreground: hsl(145, 85, 79, '#9cf7c2'),
          background: hsl(145, 78, 14, '#08401f'),
        },
        {
          name: 'Alt White',
          foreground: hsl(0, 0, 96, '#f5f5f5'),
          background: hsl(0, 0, 25, '#404040'),
        },
      ],
      [
        {
          name: 'Alt Orange',
          foreground: hsl(20, 100, 50),
          background: hsl(40, 78, 14, '#402d08'),
        },
        {
          name: 'Alt Red',
          foreground: hsl(359, 85, 79, '#f79c9d'),
          background: hsl(359, 78, 14, '#400809'),
        },
        {
          name: 'Alt Violet',
          foreground: hsl(270, 85, 79, '#ca9ff5'),
          background: hsl(270, 78, 14, '#240840'),
        },
      ],
    ]);

    const hair = computed(() => HexToHSL(styleStore.colorFront));
    const back = computed(() => HexToHSL(styleStore.colorBack));
    const screenfullState = computed(() => screenfull);

    const leToggleVirtualButtons = (state) => {
      console.log('commiting toggleHardwareButtons state: ', state);
      // styleStore.commit('toggleHardwareButtons', state);
      systemStore.setHardwareButtons(state);
    };

    const toggleFullscreen = () => {
      ui.play(ui.sounds.nav_fullscreen);
      screenfull.toggle();
    };

    const setColor = (color) => {
      console.log('commiting setColorFront state: ', color);
      // styleStore.commit('setColorFront', color.foreground);
      // styleStore.commit('setColorBack', color.background);
      // styleStore.colorFront = color.foreground;
      // styleStore.colorBack = color.background;
      styleStore.setFrontColor(color.foreground);
      styleStore.setBackColor(color.background);
    };

    return {
      colors,
      hair,
      back,
      screenfull: screenfullState,
      leToggleVirtualButtons,
      toggleFullscreen,
      setColor,
    };
  },
};
</script>

<style scoped>
div {
  margin-top: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
