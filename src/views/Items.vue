<template>
  <Menu
      title="Items" :titleLink="{ path: '/items/extra' }"
      :links="[
      { to: { path: '/items/weapons' }, label: 'Weapons' },
      { to: { path: '/items/apparel' }, label: 'Apparel' },
      { to: { path: '/items/aid' }, label: 'Aid' },
      { to: { path: '/items/misc' }, label: 'Misc' },
      { to: { path: '/items/ammo' }, label: 'Ammo' },
    ]"
  >
    <template v-slot:statistics>
      <TopStatElement :text="`Wg ${weight}/${maxWeight}`" is-first/>
      <TopStatElement :text="`HP ${healthPoints}/${maxHealthPoints}`"/>
      <TopStatElement :text="`DR ${damageResistance}`"/>
      <TopStatElement :text="`Caps ${bottlecaps}`" is-last/>
    </template>
    <RouterView/>
  </Menu>
</template>

<script>
// TODO: Rewrite to pinia
import {betterMapGetters, betterMapState} from '../lib/better-vuex-getter';
import Menu from './Menu.vue';
import TopStatElement from "@/components/TopStatElement.vue";

export default {
  name: 'Items',
  components: {TopStatElement, Menu},
  computed: {
    ...betterMapState('game/PlayerInfo', {
      healthPoints: ['CurrHP', Math.floor],
      maxHealthPoints: ['MaxHP', Math.floor],
      weight: ['CurrWeight', Math.floor],
      maxWeight: ['MaxWeight', Math.floor],
      bottlecaps: ['Caps', Math.floor],
    }),
    ...betterMapGetters('game/PlayerInfo/health', {
      damageResistance: 'totalDamageResistance',
    }),
  },
};
</script>

<style scoped lang="scss">

</style>
