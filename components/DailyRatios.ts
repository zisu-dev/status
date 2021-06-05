import Vue from 'vue'
import * as echarts from 'echarts'
import { get } from 'vuex-pathify'

function normalizeMin(min: number) {
  if (min >= 99) return 99
  if (min >= 95) return Math.floor(min)
  return Math.floor(min / 5) * 5
}

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
        title: {
          text: 'Uptime Ratios',
          left: 'center',
          textStyle: {
            fontFamily:
              "'Cascadia Code', 'Roboto Mono', 'Courier New', Courier, monospace",
            fontSize: 12
          }
        },
        tooltip: { trigger: 'axis' },
        grid: { top: 20, bottom: 20, left: 50, right: 80 },
        xAxis: { type: 'category', data: [] },
        yAxis: {
          type: 'value',
          min: (value: any) => normalizeMin(value.min),
          max: 100,
          axisLabel: { formatter: '{value}%' }
        },
        series: [
          {
            name: 'ratio',
            data: [],
            type: 'line',
            smooth: true,
            connectNulls: true
          }
        ],
        visualMap: {
          top: 0,
          right: 0,
          pieces: [
            {
              gte: 0,
              lt: 50,
              color: '#e74c3c'
            },
            {
              gte: 50,
              lt: 95,
              color: '#f39c12'
            },
            {
              gte: 95,
              lt: 99,
              color: '#1abc9c'
            },
            {
              gte: 99,
              lt: 100,
              color: '#2ecc71'
            },
            {
              gte: 100,
              lte: 100,
              color: '#27ae60'
            }
          ]
        },
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
