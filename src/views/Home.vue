<!-- <template>
    <div class="home">
        <h1>@ Home</h1>
        <div class="destinations">
            <router-link
            v-for="destination in destinations"
            :key="destination.id"
            :to="destination.slug"
        >
            <h2>{{ destination.name }}</h2>
            <img :src="`/images/${destination.image}`" :alt="destination.name" />
        </router-link>
        </div>

    </div>
</template> -->
<template>
  <div class="home">
    <h1>All Destinations</h1>
    <button @click="triggerRouterError">Trigger Router Error</button>
    <button @click="addDynamicRoute">Add Dynamic Route</button>
    <router-link to="/dynamic">Visit Dynamic Route</router-link>
    <div class="destinations">
      <router-link v-for="destination in destinations" :key="destination.id"
        :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug } }">
        <h2>{{ destination.name }}</h2>
        <img :src="`/images/${destination.image}`" :alt="destination.name" />
      </router-link>
    </div>
  </div>
</template>

<script>
import sourceData from '../data.json'
import { isNavigationFailure, NavigationFailureType } from 'vue-router'
export default {
  data() {
    return {
      destinations: sourceData.destinations
    }
  },
  methods: {
    async triggerRouterError() {
      const navigationFailure = await this.$router.push('/')
      if (isNavigationFailure(navigationFailure, NavigationFailureType.duplicated)) {
        // ? duplicated
        // * => nav was prevented because we're already on the requested route
        // ? aborted
        // * => false was returned inside of a navigation guard to the navigation
        // ? cancelled
        // * => nav was cancelled because a new nav happened before the current nav finished
        console.log(navigationFailure.to)
        console.log(navigationFailure.from)
      } else {
        console.log('No navigation failure')
      }
    },
    addDynamicRoute() {
      this.$router.addRoute({
        path: '/dynamic',
        name: 'dynamic',
        component: () => import("@/views/Login.vue")
      })
    }
  }
}
</script>