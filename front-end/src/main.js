// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入配置了全局拦截器后的 axios
import axios from './http'
// 导入 moment.js 用来格式化 UTC 时间为本地时间
import moment from 'moment'
// Import Bootstrap css and js files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './assets/icon-line/css/simple-line-icons.css' // icon in text
import './assets/icon-material/material-icons.css' //alert icon
import './assets/icon-awesome/css/font-awesome.min.css' // 编辑器上的按钮图标是使用 font-awesome 字体图标
// 自定义 css 文件
import './assets/core.css' //profil font
import './assets/custom.css' // profil border and button style
import VueToasted  from 'vue-toasted'

Vue.use(VueToasted, {
  // 主题样式 primary/outline/bubble
  theme: 'bubble',
  // 显示在页面哪个位置
  position: 'top-center',
  // 显示多久时间（毫秒）
  duration: 2000,
  // 支持哪个图标集合
  iconPack : 'material', // set your iconPack, defaults to material. material|fontawesome|custom-class
  // 可以执行哪些动作
  action: {
    text: 'Cancel',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  },

});

Vue.config.productionTip = false

// 将 $axios 挂载到 prototype 上，在组件中可以直接使用 this.$axios 访问
Vue.prototype.$axios = axios
// 将 $moment 挂载到 prototype 上，在组件中可以直接使用 this.$moment 访问
Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})