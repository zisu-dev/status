<template>
  <v-card flat color="transparent">
    <v-card-title>
      <v-icon :color="colors[data.status]">{{ icons[data.status] }}</v-icon>
      <nuxt-link :to="'/' + data.id" class="ml-3">
        <code>{{ data.name }}</code>
      </nuxt-link>
      <v-spacer />
      <ratio-overview type="30d" :ratio="data.ratios.r30" dense />
      <ratio-overview type="90d" :ratio="data.ratios.r90" dense />
    </v-card-title>
    <daily-ratios :data="data.ratios.daily" class="chart-small" />
  </v-card>
</template>

<script lang="ts">
import { mdiCheck, mdiClose, mdiPause } from '@mdi/js'
import Vue from 'vue'
import RatioOverview from './RatioOverview.vue'

export default Vue.extend({
  name: 'MonitorSummary',
  components: { RatioOverview },
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
