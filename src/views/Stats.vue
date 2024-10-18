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
      <TopStatElement :text="`LVL ${level}`" is-first/>
      <TopStatElement :text="`HP ${healthPoints}/${maxHealthPoints}`"/>
      <TopStatElement :text="`AP ${actionPoints}/${maxActionPoints}`"/>
      <TopStatElement :text="`XP ${experiencePoints}/${nextLevelXP}`" is-last/>
    </template>
    <router-view/>
  </Menu>
</template>

<script>
import {betterMapGetters, betterMapState} from '../lib/better-vuex-getter';
import Menu from './Menu.vue';
import TopStatElement from "@/components/TopStatElement.vue";

export default {
  name: 'Stats',
  components: {TopStatElement, Menu},
  computed: {
    ...betterMapState('game/PlayerInfo', {
      level: ['XPLevel', Math.floor],
      healthPoints: ['CurrHP', Math.floor],
      maxHealthPoints: ['MaxHP', Math.floor],
      actionPoints: ['CurrAP', Math.floor],
      maxActionPoints: ['MaxAP', Math.floor],
      bottlecaps: ['Caps', Math.floor],
    }),
    ...betterMapGetters('game/PlayerInfo/levelHP', {
      experiencePoints: 'current',
      nextLevelXP: 'next',
    }),
  },
};
</script>

<style scoped lang="scss">

</style>
