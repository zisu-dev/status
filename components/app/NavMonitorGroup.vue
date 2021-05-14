<template>
  <v-list-group>
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
    <app-nav-monitor-group
      v-for="subgroup of group.groups"
      :key="subgroup.name"
      :group="subgroup"
    />
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
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mdiCursorDefault,
  mdiEye,
  mdiRecordCircleOutline,
  mdiServer,
  mdiWeb
} from '@mdi/js'

export default Vue.extend({
  name: 'AppNavMonitorGroup',
  props: {
    group: {
      type: Object,
      required: true
    }
  },
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
      }
    }
  }
})
</script>
