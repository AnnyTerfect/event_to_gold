import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/graph.js'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title.js'

Vue.component('v-chart', ECharts)

import VueWordCloud from 'vuewordcloud'

Vue.component(VueWordCloud.name, VueWordCloud)

import Loading from './components/Loading.vue'
Vue.component('loading', Loading)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')