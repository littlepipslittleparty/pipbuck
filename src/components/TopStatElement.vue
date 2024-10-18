<script setup lang="ts">
// TODO: Figure out how to set `top: 50%` offset from parent and rename the class to StatElement to be more generic
import {defineProps} from 'vue';

const props = defineProps<{
  isLast?: boolean;
  isFirst?: boolean;
  text: string;
}>();

</script>

<template>
  <div
      class="stat"
      :class="{
        'no-left-margin': props.isFirst ?? false,
        'no-right-border': props.isLast ?? false,
      }"
  >
    {{ props.text }}
  </div>
</template>

<style scoped lang="scss">
$border-width: 0.75vmin;

.stat {
  top: 50%;
  flex-grow: 1;
  display: block;
  justify-content: space-between;
  margin-left: calc($border-width * 1.5);

  // right border is fading
  border: none;
  border-top-width: calc(#{$border-width} - 0.25px);
  border-top-style: solid;
  // prepare for creating a top border per :before
  position: relative;
  margin-top: -$border-width; // space for border top
  padding: 0.5vmin 2vmin 0.5vmin 1vmin;

  &::after {
    position: absolute;
    content: "";
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    //margin-right: -$border-width;  // space for border top

    border-right-width: $border-width;
    border-right-style: solid;
    border-right-color: var(--color-front);
    border-image: linear-gradient(to bottom, var(--color-front), rgba(0, 0, 0, 0)) 1 100%;
  }

  &.ammunition {
    flex-grow: 2;
  }
}

.no-left-margin {
  margin-left: 0;
}

.no-right-border {
  &::after {
    display: none;
  }
}
</style>