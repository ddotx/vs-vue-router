<template>
  <TheNavigationVue />
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div> -->
  <div class="container">
    <!-- <router-view :key="$route.path"/> -->
    <!-- <router-view class="view left-sidebar" name="LeftSidebar"></router-view> -->
    <router-view v-slot="{ Component }" class="view left-sidebar" name="LeftSidebar">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
    <router-view v-slot="{ Component }" class="main-view">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue';
export default {
  components: {
    TheNavigationVue: TheNavigation
  }
}
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.container {
  display: flex;
}

.left-sidebar {
  width: 20%;
}

.main-view {
  width: 100%;
}
</style>

