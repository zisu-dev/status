<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <template v-if="booted">
          <v-card>
            <v-card-title>
              <v-btn icon to="/" nuxt>
                <v-icon>{{ mdiArrowLeft }}</v-icon>
              </v-btn>
              <code>status report for {{ data.monitor.name }}</code>
            </v-card-title>
            <v-divider />
            <v-card-title>
              <div class="text-h4 text-center flex-fill-rest">
                <div>
                  <v-icon :color="colors[data.monitor.status]" size="64">
                    {{ icons[data.monitor.status] }}
                  </v-icon>
                </div>
                <div class="text--primary">
                  <code>{{ titles[data.monitor.status] }}</code>
                </div>
                <div class="text--secondary text-body-2">
                  <code>
                    {{ new Date($fetchState.timestamp).toLocaleTimeString() }}
                  </code>
                </div>
              </div>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-row>
                <v-col cols="3">
                  <ratio-overview :ratio="data.monitor.ratios.r1" type="1d" />
                </v-col>
                <v-divider vertical />
                <v-col cols="3">
                  <ratio-overview :ratio="data.monitor.ratios.r7" type="7d" />
                </v-col>
                <v-divider vertical />
                <v-col cols="3">
                  <ratio-overview :ratio="data.monitor.ratios.r30" type="30d" />
                </v-col>
                <v-divider vertical />
                <v-col cols="3">
                  <ratio-overview :ratio="data.monitor.ratios.r90" type="90d" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <daily-ratios :data="data.monitor.ratios.daily" class="chart" />
            <v-divider />
            <response-times :data="data.monitor.responseTimes" class="chart" />
            <!-- <v-divider />
            <v-card-text>
              {{ data.monitor.logs }}
            </v-card-text> -->
          </v-card>
        </template>
        <template v-else>
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { mdiArrowLeft, mdiCheck, mdiClose, mdiPause } from '@mdi/js'
import Vue from 'vue'

export default Vue.extend({
  name: 'Monitor',
  data: () => ({
    data: {
      global: {},
      monitor: {}
    },
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
    },
    booted: false,
    fetchInterval: null as any,
    mdiArrowLeft
  }),
  async fetch() {
    this.data = await this.$axios.$get(`/status/${this.$route.params.id}`)
    this.$store.set('globalInfo', this.data.global)
    this.booted = true
  },
  mounted() {
    this.fetchInterval = setInterval(() => {
      this.$fetch()
    }, 60 * 1000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.fetchInterval)
    })
  }
})
</script>
