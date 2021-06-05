<template>
  <v-list nav dense>
    <v-list-item href="https://zisu.dev/" target="_blank">
      <v-list-item-avatar tile size="24">
        <v-img :src="require('~/assets/logo.svg')" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-monospace">zisu.dev</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list-item nuxt to="/">
      <v-list-item-avatar tile size="24">
        <v-icon :color="colors[globalInfo.status]">{{ mdiHome }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-monospace">Overview</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <app-nav-monitor-group
      v-for="subgroup of globalInfo.monitors.groups"
      :key="subgroup.name"
      :group="subgroup"
    />
    <v-list-item
      v-for="monitor of globalInfo.monitors.monitors"
      :key="monitor.monitorId"
      :to="'/' + monitor.id"
      nuxt
    >
      <v-list-item-avatar tile size="24">
        <v-icon :color="colors[monitor.status]">
          {{ icons[monitor.type] || icons.default }}
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-monospace" v-text="monitor.name" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mdiCursorDefault,
  mdiEye,
  mdiHome,
  mdiRecordCircleOutline
} from '@mdi/js'
import { sync } from 'vuex-pathify'

export default Vue.extend({
  name: 'AppNav',
  data() {
    return {
      icons: {
        Ping: mdiRecordCircleOutline,
        'HTTP(s)': mdiCursorDefault,
        default: mdiEye
      },
      colors: {
        up: 'success',
        degraded: 'warning',
        down: 'error',
        paused: ''
      },
      mdiHome
    }
  },
  computed: {
    globalInfo: sync<any>('globalInfo')
  }
})
</script>
