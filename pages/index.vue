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
              </div>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-row>
                <v-col cols="3">
                  <div class="text-center text-monospace">
                    <v-icon :color="colors[ratioClass(info.ratios.r1)]">
                      {{ icons[ratioClass(info.ratios.r1)] }}
                    </v-icon>
                    <div>{{ formatRatio(info.ratios.r1) }}%</div>
                    <div>
                      <span>1d</span>
                    </div>
                  </div>
                </v-col>
                <v-divider vertical />
                <v-col cols="3">
                  <div class="text-center text-monospace">
                    <v-icon :color="colors[ratioClass(info.ratios.r7)]">
                      {{ icons[ratioClass(info.ratios.r7)] }}
                    </v-icon>
                    <div>{{ formatRatio(info.ratios.r7) }}%</div>
                    <div>
                      <span>3d</span>
                    </div>
                  </div>
                </v-col>
                <v-divider vertical />
                <v-col cols="3">
                  <div class="text-center text-monospace">
                    <v-icon :color="colors[ratioClass(info.ratios.r30)]">
                      {{ icons[ratioClass(info.ratios.r30)] }}
                    </v-icon>
                    <div>{{ formatRatio(info.ratios.r30) }}%</div>
                    <div>
                      <span>30d</span>
                    </div>
                  </div>
                </v-col>
                <v-divider vertical />
                <v-col cols="3">
                  <div class="text-center text-monospace">
                    <v-icon :color="colors[ratioClass(info.ratios.r90)]">
                      {{ icons[ratioClass(info.ratios.r90)] }}
                    </v-icon>
                    <div>{{ formatRatio(info.ratios.r90) }}%</div>
                    <div>
                      <span>90d</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
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
import {
  mdiAlert,
  mdiCheck,
  mdiCircle,
  mdiCircleOutline,
  mdiClose,
  mdiPause
} from '@mdi/js'
import Vue from 'vue'
import { sync } from 'vuex-pathify'
export default Vue.extend({
  name: 'Index',
  data: () => ({
    data: {
      global: {}
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
      down: 'error',
      0: 'success',
      1: 'success',
      2: 'warning',
      3: 'warning',
      4: 'error'
    },
    icons: {
      up: mdiCheck,
      degraded: mdiCircleOutline,
      down: mdiClose,
      paused: mdiPause,
      0: mdiCheck,
      1: mdiCircle,
      2: mdiCircleOutline,
      3: mdiAlert,
      4: mdiClose
    },
    booted: false
  }),
  async fetch() {
    this.data = await this.$axios.$get('/status/list')
    this.info = this.data.global
    this.booted = true
  },
  computed: {
    info: sync<any>('globalInfo')
  },
  methods: {
    formatRatio(ratio: number) {
      return (ratio / 1000).toFixed(3)
    },
    ratioClass(ratio: number) {
      if (ratio === 100000) return 0
      if (ratio >= 95000) return 1
      if (ratio >= 90000) return 2
      if (ratio >= 1000) return 3
      return 4
    }
  }
})
</script>
