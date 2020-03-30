import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Cate from './model/CateEnum'
import ItemData from './model/ItemData'
// import DataHelper from './store/DataHelper'
import ActionHelper from './store/ActionHelper'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

// let item1 = new ItemData(-1, Cate.Life, '许愿春招上岸', '我是真的想要上岸鸭')
// let ietm2 = new ItemData(1, Cate.Study, '好好学习前端', '我要学好前端然后冲冲冲')
// let ah = new ActionHelper();
// ah.add(item1);
// ah.edit(ietm2)
// ah.remove(4)
// console.log(ah.memoList);