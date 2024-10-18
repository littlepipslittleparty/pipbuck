<script setup>
import {ui} from './sound';
import {computed, defineComponent, watch} from "vue";
import vColorizedBg from './lib/vue-colorized/directive';
import {HexToHSL} from "@/lib/colorspace/index";
import {useHead} from "@unhead/vue";
import bgImage from "@/assets/img/bg.png";
import {calcHwBtnPosition, mapButtonPositionToFlex} from "@/lib/app-helper";
// Stores
import {useStyleStore} from "@/stores/style";
import {useSystemStore} from "@/stores/system";
import {useRadioStore} from "@/stores/radio";
// Components
import VirtualButtons from './components/VirtualButtons.vue';
import Favicon from './components/Favicon.vue';
import StableColt from './components/StableColt.vue';

// const scroll = 0.00; // Unused
// const scroll_prevent = null; // Unused
let hardwareButtonPosition = 'right';

const calculateHardwareButtonPosition = () => {
  const orientation = window.screen.msOrientation || (window.screen.orientation || window.screen.mozOrientation || {}).type;
  return calcHwBtnPosition(orientation);
};
// TODO: Wire this to orientation change
// const updateHardwareButtonPosition = () => {
//   hardwareButtonPosition = calculateHardwareButtonPosition();
// };
hardwareButtonPosition = calculateHardwareButtonPosition();


// Computed
const pipbuckSound = (sound) => {
  console.log('pipbuckSound', sound);
  ui.audio.play(sound);
};

// Setup
const styleStore = useStyleStore();
const systemStore = useSystemStore();

// Computed
const showHardwareButtons = computed(() => systemStore.showHardwareButtons);
const colorFront = computed(() => styleStore.colorFront);
const colorBack = computed(() => styleStore.colorBack);
const wrapperFlex = computed(() => mapButtonPositionToFlex(hardwareButtonPosition));
const hair = computed(() => HexToHSL(colorFront.value));
const back = computed(() => HexToHSL(colorBack.value));

// TODO: Use as a text jitter effect on screen change
const shadow = computed(() => {
  const color1 = hair.value;
  const color2 = hair.value;
  color1.s /= 2;
  color2.s /= 2;
  // TODO: Use as a text jitter effect on screen change
  // return `2px 0 ${hsl(color1)}, -2px 0 ${hsl(color1)}`;
  return 'none';
});

const radioStore = useRadioStore();

watch(colorFront, (newColor) => {
  useHead({
    // Theme Color for Chrome, Firefox OS and Opera
    'theme-color': newColor,
    // Color for windows tiles
    'msapplication-TileColor': newColor,
  });
}, { immediate: true });

defineComponent({
  name: 'App',
  directives: {ColorizedBg: vColorizedBg},
});
</script>

<template>
  <div
      id="app"
      :style="{ '--color-front': colorFront, '--color-back': colorBack, 'text-shadow': shadow }"
  >
    <Favicon>
      <StableColt :hair="hair" :back="back"/>
    </Favicon>
    <KeepAlive>
      <audio
          ref="radio"
          :src="radioStore.currentFile"
          autoplay="autoplay"
          autobuffer
          playsinline
          loop="loop"
          preload="auto"
          controls="controls"
          crossorigin="anonymous"
      />
    </KeepAlive> <!-- :crossorigin="currentFile.anonymousCrossorigin"
    @timeupdate="this.updated()" -->
    <div class="outer" :style="{ 'flex-direction': wrapperFlex }">
      <div class="wrapper">
        <div class="effect display-animations"></div>
        <div class="crt">
          <RouterView @pipbuck-play="pipbuckSound"/>
        </div>
        <div
            class="effect display-background"
            v-colorized-bg="{
              src: bgImage,
              hue: hair.h,
            }"
        ></div>
      </div>
      <VirtualButtons
          v-if="showHardwareButtons"
          class="hardware noscroll"
          :position="hardwareButtonPosition"
          @scroll.prevent @wheel.prevent @touchstart.prevent @touchmove.prevent @drag.prevent
          @pipbuck-play="pipbuckSound"
      />
    </div>
  </div>
</template>


<style lang="scss">
@font-face {
  font-family: 'Monofonto';
  src: url('/fonts/monofonto.ttf');
}

*, *:after, *:before { // Minimalist Reset 3
  vertical-align: baseline;
  font-weight: inherit;
  font-family: inherit;
  font-style: inherit;
  font-size: 100%;
  border: 0 none;
  outline: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: black;
  user-select: none;
  font-size: 4.266666667vmin;
  letter-spacing: -0.05em;
  font-family: 'Monofonto', 'Droid Sans', 'Arial Rounded', 'Courier New', 'Courier', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-front);
}

// Dirty fix after moving to setup script. Somewhy the color in stats is defaulting to black
div {
  color: var(--color-front);
}

#app {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
}

a {
  color: var(--color-front);
  text-decoration: none;

  border: transparent 0.5vmin solid;
  padding: 0.75vmin 1vmin;

  &.active, &.router-link-exact-active {
    border: var(--color-front) 0.75vmin solid;
    background-color: rgba(255, 225, 255, 0.1);

  }

  &.disabled {
    opacity: 0.5;
  }
}

ul li {
  list-style: none;
}
</style>
<style scoped lang="scss">
.outer {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column-reverse;
}

.wrapper {
  //width: 100%;
  //height: 100%;
  height: 100vmin;
  width: 133vmin;
  overflow: hidden;
  position: relative;
}

.crt {
  justify-content: flex-start;
  // overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  //height: 84.77508651vmin;
  //left: 0;
  //top: 0;
  //position: absolute;
}

.hardware {
  // min-width: 15.22491349vw;
  // min-height: 15.22491349vh;
  //width: 100%;
  flex-grow: 1;
}

;
#nav {
  padding: 30px;

  a {
    padding-top: 2px;
    padding-bottom: 2px;
    padding-right: 4px;
    padding-left: 4px;
    font-weight: bold;

    &.router-link-exact-active {

    }
  }
}

audio {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 30;
  display: none;
}
</style>

<!-- effects -->
<style lang="scss" scoped>

.effect {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.display-background {
  z-index: -1;

  background-size: 100% 100%;
  background-repeat: no-repeat;

  filter: blur(5px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.display-beam {
  background: radial-gradient(
          rgba(0, 255, 0, .3) 0%,
          rgba(0, 255, 0, 0) 70%);
  border-radius: 50%;
  top: 2.5vh;
  right: -14vw;

  width: 100vw;
  height: 15vh;
  // margin-top: -14px;
  // margin-left: -1100px;
  z-index: 1;
}

.display-animations::before {
  content: " ";
  position: absolute;
  width: 100vw;
  height: 40vh;
  left: 0;
  right: 0;
  background: linear-gradient(
          to top,
          rgba(255, 255, 255, 0.2) 0%,
          rgba(255, 255, 255, 0.144) 11%,
          rgba(255, 255, 255, 0.124) 31%,
          rgba(255, 255, 255, 0.102) 35%,
          rgba(255, 255, 255, 0.028) 61%,
          rgba(255, 255, 255, 0.008) 79%,
          rgba(255, 255, 255, 0.000) 100%
  );
  // ~0:06 run time, ~0:02 screen time
  animation: scanline 6300ms infinite linear;
  border-radius: 50% / 5%;
}

@keyframes scanline {
  0% { // 0%
    top: -40%;
    opacity: 0;
  }
  6% { // 20%
    opacity: 0.2;
  }
  15% { // 50%
    opacity: 0.3;
  }
  24% { // 80%
    opacity: 0.2;
  }
  30% { // 100%
    top: 100%;
    opacity: 0;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.wrapper::before {
  // the display lines
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: linear-gradient(
          rgba(18, 16, 16, 0) 50%,
          rgba(0, 0, 0, 0.25) 50%
  ), linear-gradient(
          90deg,
          rgba(255, 0, 0, 0.06),
          rgba(0, 255, 0, 0.02),
          rgba(0, 0, 255, 0.06)
  );
  z-index: 2;
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}

.crt::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(18, 16, 16, 0.1);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% {
    opacity: 0.27861;
  }
  5% {
    opacity: 0.34769;
  }
  10% {
    opacity: 0.23604;
  }
  15% {
    opacity: 0.90626;
  }
  20% {
    opacity: 0.18128;
  }
  25% {
    opacity: 0.83891;
  }
  30% {
    opacity: 0.65583;
  }
  35% {
    opacity: 0.67807;
  }
  40% {
    opacity: 0.26559;
  }
  45% {
    opacity: 0.84693;
  }
  50% {
    opacity: 0.96019;
  }
  55% {
    opacity: 0.08594;
  }
  60% {
    opacity: 0.20313;
  }
  65% {
    opacity: 0.71988;
  }
  70% {
    opacity: 0.53455;
  }
  75% {
    opacity: 0.37288;
  }
  80% {
    opacity: 0.71428;
  }
  85% {
    opacity: 0.70419;
  }
  90% {
    opacity: 0.7003;
  }
  95% {
    opacity: 0.36108;
  }
  100% {
    opacity: 0.24387;
  }
}

</style>
