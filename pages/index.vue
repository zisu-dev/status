<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <template v-if="booted">
          <v-card>
            <v-card-title>
              <div class="text-h4 text-center flex-fill-rest">
                <div>
                  <v-icon :color="colors[info.status]" size="64">
                    {{ icons[info.status] }}
                  </v-icon>
                </div>
                <div>
                  <code>{{ titles[info.status] }}</code>
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
                  <ratio-overview :ratio="info.ratios.r1" type="1d" />
                </v-col>
                <v-divider vertical />
                <v-col cols="3">
                  <ratio-overview :ratio="info.ratios.r7" type="7d" />
                </v-col>
                <v-divider vertical />
                <v-col cols="3">
                  <ratio-overview :ratio="info.ratios.r30" type="30d" />
                </v-col>
                <v-divider vertical />
                <v-col cols="3">
                  <ratio-overview :ratio="info.ratios.r90" type="90d" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <template v-for="(monitor, i) of data.list">
              <template v-if="i">
                <v-divider :key="i" />
              </template>
              <monitor-summary :key="monitor.id" :data="monitor" />
            </template>
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
import { mdiCheck, mdiCircleOutline, mdiClose, mdiPause } from '@mdi/js'
import Vue from 'vue'
import { sync } from 'vuex-pathify'

export default Vue.extend({
  name: 'Index',
  data: () => ({
    data: {
      global: {},
      list: []
    },
    titles: {
      up: 'All system operational',
      degraded: 'Some system down',
      down: 'All system down',
      paused: 'Monitor is paused'
    },
    colors: {
      up: 'success',
      degraded: 'warning',
      down: 'error'
    },
    icons: {
      up: mdiCheck,
      degraded: mdiCircleOutline,
      down: mdiClose,
      paused: mdiPause
    },
    booted: false,
    fetchInterval: null as any
  }),
  async fetch() {
    this.data = await this.$axios.$get('/status/list')
    this.info = this.data.global
    this.booted = true
  },
  computed: {
    info: sync<any>('globalInfo')
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
