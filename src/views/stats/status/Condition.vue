<template>
  <div class="page-inner">
    <StatsPony
        class="img" :face-name="'auto'"
        :mane="front"
        :body="front"
        :eyes="front"
        :bars="front"
        :white="front"
        :hp="{ head, body, legFrontLeft, legFrontRight, legHindLeft, legHindRight }"
    />
    <div class="player">{{ name }} - Level {{ level }}</div>
  </div>
</template>

<script setup>
import StatsPony from "@/components/StatsPony.vue";
import {usePlayerStore} from "@/stores/player";
import {useStyleStore} from "@/stores/style";

const styleStore = useStyleStore();
const front = styleStore.colorFront;

const playerStore = usePlayerStore();
const { head, body, legFrontLeft, legFrontRight, legHindLeft, legHindRight } = playerStore.health.parts;
const name = playerStore.profile.name;
const level = playerStore.progress.lvl;
</script>

<style scoped>
.page-inner {
  height: 100%;
}

.img {
  max-width: 60vw;
  max-height: 70vh;
}
</style>
