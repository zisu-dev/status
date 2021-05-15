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
        title: { text: 'Response Times' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: [] },
        yAxis: { type: 'value', axisLabel: { formatter: '{value} ms' } },
        series: [
          {
            name: 'latency',
            data: [],
            type: 'line',
            smooth: true,
            markPoint: {
              data: [
                { type: 'max', name: 'max' },
                { type: 'min', name: 'min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'avg' }]
            }
          }
        ],
        backgroundColor: 'transparent'
      })
      this.updateData()
    },
    updateData() {
      const chart = this.chart
      if (!chart) return
      const xAxis = this.data.map((x: any) => x.datetime)
      const yAxis = this.data.map((x: any) => x.value)
      chart.setOption({
        xAxis: { data: xAxis },
        series: [{ name: 'latency', data: yAxis }]
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
