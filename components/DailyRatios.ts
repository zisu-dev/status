import Vue from 'vue'
import * as echarts from 'echarts'
import { get } from 'vuex-pathify'

export default Vue.extend({
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    chart: null as echarts.ECharts | null
  }),
  computed: {
    theme: get('theme')
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.updateData()
      }
    },
    theme: {
      handler() {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
    new ResizeObserver(() => {
      this.resize()
    }).observe(this.$el)
  },
  methods: {
    init() {
      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = echarts.init(
        this.$el as HTMLElement,
        this.theme === 1 ? 'dark' : 'light'
      )
      this.chart.setOption({
        title: { text: 'Uptime Ratios' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: [] },
        yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
        series: [
          {
            name: 'ratio',
            data: [],
            type: 'line',
            smooth: true,
            connectNulls: true
          }
        ],
        backgroundColor: 'transparent'
      })
      this.updateData()
    },
    updateData() {
      const chart = this.chart
      if (!chart) return
      const now = Date.now()
      const msPerDay = 24 * 60 * 60 * 1000
      const xAxis = this.data
        .map((_, i) => {
          const date = new Date(now - msPerDay * i)
          return date.toLocaleDateString()
        })
        .reverse()
      const yAxis = this.data.map((x: any) => x && x / 1000)
      chart.setOption({
        xAxis: { data: xAxis },
        series: [{ name: 'ratio', data: yAxis }]
      })
    },
    resize() {
      const chart = this.chart
      if (!chart) return
      chart.resize()
    }
  },
  render(h) {
    return h('div')
  }
})
