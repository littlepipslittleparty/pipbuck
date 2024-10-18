<template>
  <div class="columns">
    <ul class="left-list">
      <li
          v-for="(track, name) in radio.tracks" :key="track.file"
          class="track"
      >
        <a
            :class="{
                active: radio.currentFile === track.file && ! track.disabled,
                disabled: track.disabled,
            }"
            @click="playTrack(name)"
        >{{ name }}</a>
      </li>
    </ul>
    <div class="right-content">
      <Oscilloscope
          class="oscilloscope"
          :color="style.colorFront"
          :fftSize="fftSize"
          :fftEach="fftEach"
          :rounded="rounded"
          :squared="squared"
          :zigzagg="zigzagg"
          :canvasHeight="128"
          :canvasWidth="128"
          :audio-element="audioElement"
      />
    </div>
  </div>
</template>

<script setup>
import Oscilloscope from '../../components/Oscilloscope.vue';
import {useRadioStore} from "@/stores/radio";
import {useStyleStore} from "@/stores/style";
import {computed, defineComponent, getCurrentInstance,} from "vue";

const rounded = true;
const squared = false;
const zigzagg = false;
const fftSize = 32;
const fftEach = 3;

const radio = useRadioStore();
const style = useStyleStore();

const self = getCurrentInstance();

const audioElement = computed(() => {
  // https://stackoverflow.com/a/79100101/3423324#vue-3-get-access-to-parent
  return self.parent.parent.parent.parent.parent.refs.radio;
});

const playTrack = (name) => {
  console.log('<radio-element>', audioElement.value);
  console.log('file', radio.selected, '->', name);
  if (radio.selected !== null && radio.selected !== name) {
    // is already playing something else.
    // turn off
    console.log('pause', name);
    radio.selectTrack(null);
    audioElement.value.pause();
  } else {
    // is not playing
    // load track
    console.log('play', name);
    radio.selectTrack(name);
    audioElement.value.load();
  }
};

defineComponent({
  name: 'Radio',
});
</script>

<style scoped lang="scss">
.columns {
  //margin-left: 10vmin;
  //margin-right: 10vmin;
  padding-left: 5vmin;
  padding-right: 3vmin;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

ul.left-list {
  text-align: left;

  li {
    margin-top: 1rem;
  }
}

.right-content {
}

.oscilloscope {
  max-width: 50vmin;
  max-height: 50vmin;
}
</style>
