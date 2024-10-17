<template>
  <div class="columns">
    <ul class="left-list">
      <li
        v-for="(track, name) in radio.tracks" :key="track.file"
        class="track" :class="{ disabled: track.disabled }"
        v-if="!track.disabled"
      >
        <a
          :class="{ active: radio.currentFile === track.file }"
          @click="playTrack(name)"
        >{{ name }}</a>
      </li>
    </ul>
    <div class="right-content">
      <oscilloscope
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

<script>
import Oscilloscope from '../../components/Oscilloscope.vue';
import {useRadioStore} from "@/stores/radio";
import {useStyleStore} from "@/stores/style";

export default {
  name: 'radio',
  components: { Oscilloscope },
  setup() {
    const radio = useRadioStore();
    const style = useStyleStore();
    return {
      radio,
      style,
    };
  },
  data() {
    return {
      rounded: true,
      squared: false,
      zigzagg: false,
      fftSize: 32,
      fftEach: 3,
    };
  },
  computed: {
    audioElement() {
      return this.$parent.$parent.$parent.$refs.radio;
    },
  },
  methods: {
    playTrack(name) {
      console.log('<radio-element>', this.audioElement);
      console.log('file', this.radio.selected, name);
      if (this.radio.selected !== null && this.radio.selected !== name) {
        // is already playing something else.
        // turn off
        console.log('pause', name);
        this.radio.selectTrack(null);
        this.audioElement.pause();
      } else {
        // is not playing
        // load track
        console.log('play', name);
        this.selectTrack(name);
        this.audioElement.load();
      }
    },
  },
};
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
