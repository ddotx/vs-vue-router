<template>
  <div id="nav">
    <!-- <router-link id="logo" to="/">Vue School Travel App</router-link>
    <router-link v-for="destination in destinations" :key="destination.id"
      :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug } }">
      {{ destination.name }}
    </router-link>
    <router-link :to="{ name: 'protected' }">Dashboard</router-link> -->
    <AppLink id="logo" to="/">Vue School Travel App</AppLink>
    <AppLink v-for="destination in destinations" :key="destination.id"
      :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug } }">
      {{ destination.name }}
    </AppLink>
    <AppLink :to="{ name: 'protected' }">Dashboard</AppLink>
    <AppLink to="https://vueschool.io">Vue School</AppLink>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import router from '../router';
export default {
  data() {
    return {
      destinations: sourceData.destinations
    };
  },
  components: { router }
}
</script>