<template>
  <Menu
      title="Stats" :titleLink="{ path: '/stats/extra' }"
      :links="[
      { to: { path: '/stats/status' }, label: 'Status' },
      { to: { path: '/stats/special' }, label: 'S.P.E.C.I.A.L.' },
      { to: { path: '/stats/skills' }, label: 'Skills' },
      { to: { path: '/stats/perks' }, label: 'Perks' },
      { to: { path: '/stats/profile' }, label: 'Profile' },
    ]"
  >
    <template v-slot:statistics>
      <TopStatElement :text="lvlText" is-first/>
      <TopStatElement :text="healthText"/>
      <TopStatElement :text="apText"/>
      <TopStatElement :text="xpText" is-last/>
<!--      <TopStatElement :text="`LVL ${level}`" is-first/>-->
<!--      <TopStatElement :text="`HP ${healthPoints}/${maxHealthPoints}`"/>-->
<!--      <TopStatElement :text="`AP ${actionPoints}/${maxActionPoints}`"/>-->
<!--      <TopStatElement :text="`XP ${experiencePoints}/${nextLevelXP}`" is-last/>-->
    </template>
    <router-view/>
  </Menu>
</template>

<script setup>

import TopStatElement from "@/components/TopStatElement.vue";
import {usePlayerStore} from "@/stores/player.ts";
import Menu from "@/views/Menu.vue";

const playerStore = usePlayerStore();
const progress = playerStore.progress;
const health = playerStore.health;

const lvlText = `LVL ${progress.lvl}`;
const healthText = `HP ${health.hp}/${health.maxHp}`;
const apText = `AP ${progress.ap}/${progress.maxAp}`;
const xpText = `XP ${progress.xp}/${progress.nextLvlXp}`;
</script>

<style scoped lang="scss">

</style>
