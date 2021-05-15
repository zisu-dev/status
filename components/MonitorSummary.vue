<template>
  <v-card flat color="transparent">
    <v-card-title>
      <nuxt-link :to="'/' + data.id">
        <code>{{ data.name }}</code>
      </nuxt-link>
    </v-card-title>
    <daily-ratios :data="data.ratios.daily" class="chart" />
  </v-card>
</template>

<script lang="ts">
import { mdiCheck, mdiClose, mdiPause } from '@mdi/js'
import Vue from 'vue'

export default Vue.extend({
  name: 'MonitorSummary',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    titles: {
      up: 'up',
      down: 'down'
    },
    colors: {
      up: 'success',
      degraded: 'warning',
      down: 'error'
    },
    icons: {
      up: mdiCheck,
      down: mdiClose,
      paused: mdiPause
    }
  })
})
</script>
