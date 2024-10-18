<template>
  <Menu
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
      <TopStatElement :text="location" is-first/>
      <TopStatElement :text="`${day}.${month}.${year}, ${hour}:${minute}`" is-last/>
    </template>
    <router-view/>
  </Menu>
</template>

<script>
import {betterMapGetters, mapState} from '../lib/better-vuex-getter';
import Menu from './Menu.vue';
import TopStatElement from "@/components/TopStatElement.vue";

export default {
  name: 'Data',
  components: {TopStatElement: TopStatElement, Menu},
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
