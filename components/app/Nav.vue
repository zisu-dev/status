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
    <v-list-group v-for="group of groups" :key="group.name">
      <template #activator>
        <v-list-item-avatar tile size="24">
          <v-icon :color="colors[group.status]">
            {{ icons[group.name] || icons.default }}
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-monospace">
            {{ group.name }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item
        v-for="monitor of group.monitors"
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
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mdiCursorDefault,
  mdiEye,
  mdiHome,
  mdiRecordCircleOutline,
  mdiServer,
  mdiWeb
} from '@mdi/js'
import { sync } from 'vuex-pathify'

export default Vue.extend({
  name: 'AppNav',
  data() {
    return {
      icons: {
        server: mdiServer,
        website: mdiWeb,
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
    globalInfo: sync<any>('globalInfo'),
    groups() {
      const obj = this.globalInfo.monitors
        .map((x: any) => {
          const [group, name] = x.name.split('::')
          return { ...x, group, name }
        })
        .reduce(
          (acc: any, cur: any) => ({
            ...acc,
            [cur.group]: [...(acc[cur.group] || []), cur]
          }),
          {}
        )
      return Object.keys(obj)
        .map((K) => ({ name: K, monitors: obj[K] }))
        .map((x) => ({
          ...x,
          status: (() => {
            const a = x.monitors.some((x: any) => x.status === 'up')
            const b = x.monitors.some((x: any) => x.status === 'down')
            return a ? (b ? 'degraded' : 'up') : b ? 'down' : 'paused'
          })()
        }))
    }
  }
})
</script>
