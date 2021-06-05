<template>
  <v-app-bar app :color="colors[status]">
    <v-app-bar-nav-icon aria-label="menu" @click="main = !main" />
    <v-btn
      text
      x-large
      class="text-none pa-1"
      href="/"
      @click.stop.prevent="$router.push('/')"
    >
      <div>
        <div class="text-h6" style="line-height: unset">
          <code>zisu.dev</code>
        </div>
        <div class="text-caption" style="line-height: unset">
          <code>status</code>
        </div>
      </div>
    </v-btn>
    <v-spacer />
    <v-btn
      icon
      href="https://github.com/zisu-dev/status"
      target="_blank"
      rel="noopener"
    >
      <v-icon>{{ mdiGithub }}</v-icon>
    </v-btn>
    <v-btn icon aria-label="settings" @click="settings = !settings">
      <v-icon>{{ mdiCog }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCog, mdiGithub } from '@mdi/js'
import { get, sync } from 'vuex-pathify'

export default Vue.extend({
  name: 'App',
  data() {
    return {
      colors: {
        up: '#2ecc71c0',
        down: '#e74c3cc0'
      },
      mdiCog,
      mdiGithub
    }
  },
  computed: {
    settings: sync('drawers@settings'),
    main: sync('drawers@main'),
    status: get('globalInfo@status')
  }
})
</script>

<style>
.theme--dark .site-title {
  color: #fff;
}
.theme--light .site-title {
  color: #000;
}
</style>
