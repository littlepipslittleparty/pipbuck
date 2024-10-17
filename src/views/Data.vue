<template>
  <MenuGui
    title="Data" :titleLink="{ path: '/settings' }"
    :links="[
      { to: { path: '/data/local_map' }, label: 'Local Map' },
      { to: { path: '/data/world_map' }, label: 'World Map' },
      { to: { path: '/data/quests' }, label: 'Quests' },
      { to: { path: '/data/notes' }, label: 'Notes' },
      { to: { path: '/data/radio' }, label: 'Radio' },
    ]"
  >
    <template v-slot:statistics>
      <div class="stat location">{{ location }}</div>
      <div class="stat">{{ day }}.{{ month }}.{{ year }}, {{ hour }}:{{ minute }}</div>
    </template>
    <router-view />
  </MenuGui>
</template>

<script>
import { mapState, betterMapGetters } from '../lib/better-vuex-getter';
import MenuGui from './MenuGui.vue';

export default {
  name: 'Data',
  components: { MenuGui },
  computed: {
    ...mapState([
      'showHardwareButtons',
    ]),
    location() {
      return this.$store.state.game.Map.CurrWorldspace;
    },
    ...mapState('game/PlayerInfo', {
      day: 'DateDay',
      month: 'DateMonth',
    }),
    ...betterMapGetters('game/PlayerInfo/time', {
      minute: 'minutes',
      hour: 'hours',
      year: 'halfYear',
    }),
  },
};
</script>

<style scoped>

</style>
