<template>
  <v-footer app class="d-flex justify-end text-caption align-center">
    <code>&copy; {{ new Date().getFullYear() }} ZhangZisu</code>
    <v-divider vertical class="mx-2" />
    <div class="text-monospace">
      <v-icon size="16" color="success">{{ mdiCheck }}</v-icon>
      {{ counts.up }}
      <v-icon size="16" color="error">{{ mdiClose }}</v-icon>
      {{ counts.down }}
      <v-icon size="16">{{ mdiPause }}</v-icon>
      {{ counts.paused }}
    </div>
  </v-footer>
</template>

<script lang="ts">
import { mdiCheck, mdiClose, mdiPause } from '@mdi/js'
import Vue from 'vue'
import { get } from 'vuex-pathify'

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      build: BUILD,
      mdiCheck,
      mdiClose,
      mdiPause
    }
  },
  computed: {
    counts: get('globalInfo@counts')
  }
})
</script>
