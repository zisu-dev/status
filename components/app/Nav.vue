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
    <v-list-item v-for="(link, i) of links" :key="i" :to="link.to" nuxt>
      <v-list-item-avatar tile size="24">
        <v-icon>{{ link.icon }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-monospace" v-text="link.text" />
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list-group v-for="group of groups" :key="group.name">
      <template #activator>
        <v-list-item-avatar tile size="24">
          <v-icon>{{ icons[group.name] || icons.default }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-monospace">
            {{ group.name }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item v-for="monitor of group.monitors" :key="monitor.monitorId">
        <v-list-item-avatar tile size="24">
          <v-icon>{{ icons[monitor.type] || icons.default }}</v-icon>
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
      links: [
        { to: '/', icon: mdiHome, text: 'Home' }
        //
      ],
      icons: {
        server: mdiServer,
        website: mdiWeb,
        Ping: mdiRecordCircleOutline,
        'HTTP(s)': mdiCursorDefault,
        default: mdiEye
      }
    }
  },
  computed: {
    data: sync<any>('data'),
    groups() {
      const obj = this.data.psp.monitors
        .map((x: any) => {
          const [group, name] = x.name.split('::')
          const { monitorId, statusClass, type } = x
          return { id: monitorId, group, name, status: statusClass, type }
        })
        .reduce(
          (acc: any, cur: any) => ({
            ...acc,
            [cur.group]: [...(acc[cur.group] || []), cur]
          }),
          {}
        )
      return Object.keys(obj).map((K) => ({ name: K, monitors: obj[K] }))
    }
  }
})
</script>
