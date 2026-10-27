import Vue from 'vue'
import App from './App.vue'
import router from './router'
require('@/assets/styles/style.css')

// Store
import store from './store'
// import pusher from './pusher'

//Vuesax
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)

// Bootstrap Vue
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import VueMoment from 'vue-moment'
 
Vue.use(VueMoment)

//OTP
import OtpInput from "@bachdgvn/vue-otp-input";
Vue.component("v-otp-input", OtpInput);

//Chart
import VueApexCharts from 'vue-apexcharts'
Vue.component('apexchart', VueApexCharts)

//Vue Select
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

// Axios
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8000';
var AUTH_TOKEN = localStorage.getItem('access_token');
if (AUTH_TOKEN){
  axios.defaults.headers.common['Authorization'] = 'Bearer '+AUTH_TOKEN;
}

// Filter
import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp.',
  thousandsSeparator: ',',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '3px'
})

// Adsense 
import Ads from 'vue-google-adsense'
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

// Meta
import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.filter('initial', function (value) {
  if(value){
    value = value.split(' ').map(x => x[0].toUpperCase()).join('').slice(0,2)
    return value
  }
})

Vue.filter('cover', function (value) {
  if(value){
    var url = process.env.VUE_APP_ASSET_BASE_URL || 'http://localhost:8000/'
    value = url+value
    return value
  }
})

Vue.filter('descsnip', function (value) {

  var start = value.indexOf('Sinopsis');
  var end = start + 130;
  return value.slice(start + 21, end) + '...';
})
Vue.filter('titlesnip', function (value) {
  if (value.length > 30) {
    return value.slice(0, 20) + '...';
  } else {
    return value;
  }
})

Vue.mixin({
  methods: {
    openNotification(duration, position = null, color, title, text) {
      this.$vs.notification({
        duration,
        progress: 'auto',
        color,
        position,
        title: title,
        text: text,
      })
    },
  },
})

Vue.component('pagination', require('laravel-vue-pagination'));

Vue.config.productionTip = false

new Vue({
//   pusher,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
