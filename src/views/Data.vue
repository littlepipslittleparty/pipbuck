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
      <TopStatElement :text="playerStore.location.city" is-first/>
      <TopStatElement :text="dateStr" is-last/>
    </template>
    <router-view/>
  </Menu>
</template>

<script setup>
import {useSystemStore} from "@/stores/system";
import {usePlayerStore} from "@/stores/player";
import {defineComponent} from "vue";
import TopStatElement from "@/components/TopStatElement.vue";
import Menu from "@/views/Menu.vue";

const systemStore = useSystemStore();
const playerStore = usePlayerStore();

const date = systemStore.date;
const time = systemStore.time;

const timeStr = `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`;
const dateStr = `${date.day}.${date.month}.${date.year}, ${timeStr}`;

defineComponent({
  name: 'Data',
});
</script>

<style scoped>

</style>
