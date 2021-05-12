<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">
            {{ data }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { sync } from 'vuex-pathify'
export default Vue.extend({
  name: 'Index',
  data: () => ({
    data: {
      global: {}
    }
  }),
  async fetch() {
    this.data = await this.$axios.$get('/status/list')
    this.globalInfo = this.data.global
  },
  computed: {
    globalInfo: sync<any>('globalInfo')
  }
})
</script>
