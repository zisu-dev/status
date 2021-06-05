<template>
  <div v-if="dense" class="d-flex flex-row align-center mx-1">
    <v-icon :color="colors[ratioClass]">
      {{ icons[ratioClass] }}
    </v-icon>
    <div class="text--primary text-caption">
      <code>{{ ratioStr }}%</code>
    </div>
    <div class="text-caption text--secondary">
      <code>({{ type }})</code>
    </div>
  </div>
  <div v-else class="text-center">
    <v-icon :color="colors[ratioClass]">
      {{ icons[ratioClass] }}
    </v-icon>
    <div class="text--primary">
      <code>{{ ratioStr }}%</code>
    </div>
    <div class="text-caption text--secondary">
      <code>{{ type }}</code>
    </div>
  </div>
</template>

<script lang="ts">
import {
  mdiAlert,
  mdiCheck,
  mdiCircle,
  mdiCircleOutline,
  mdiClose
} from '@mdi/js'
import Vue from 'vue'
export default Vue.extend({
  name: 'RatioOverview',
  props: {
    ratio: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    dense: {
      type: Boolean
    }
  },
  data: () => ({
    colors: {
      0: 'success',
      1: 'success',
      2: 'warning',
      3: 'warning',
      4: 'error'
    },
    icons: {
      0: mdiCheck,
      1: mdiCircle,
      2: mdiCircleOutline,
      3: mdiAlert,
      4: mdiClose
    }
  }),
  computed: {
    ratioClass() {
      if (this.ratio === 100000) return 0
      if (this.ratio >= 95000) return 1
      if (this.ratio >= 90000) return 2
      if (this.ratio >= 1000) return 3
      return 4
    },
    ratioStr() {
      return (this.ratio / 1000).toFixed(3)
    }
  }
})
</script>
