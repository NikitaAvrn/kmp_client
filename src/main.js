import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { VueMaskDirective } from 'v-mask'
import VueMeta from 'vue-meta'
import App from './App.vue'
import store from './store'
import router from './router'
import tooltipRightDirective from '@/directives/tooltip-right.directive'
import tooltipLeftDirective from '@/directives/tooltip-left.directive'
import tooltipTopDirective from '@/directives/tooltip-top.directive'
import tooltipBottomDirective from '@/directives/tooltip-bottom.directive'
import upperCaseDirective from '@/directives/uppercase.directive'
import messagePlugin from '@/utils/message.plugin'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import decimalFilter from '@/filters/decimal.filter'
import 'materialize-css/dist/js/materialize.min'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(VueMeta)

Vue.directive('tooltip-right', tooltipRightDirective)
Vue.directive('tooltip-left', tooltipLeftDirective)
Vue.directive('tooltip-top', tooltipTopDirective)
Vue.directive('tooltip-bottom', tooltipBottomDirective)
Vue.directive('uppercase', upperCaseDirective)
Vue.directive('mask', VueMaskDirective)

Vue.filter('date', dateFilter)
Vue.filter('decimal', decimalFilter)
Vue.filter('currency', currencyFilter)

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
