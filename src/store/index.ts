import Vue from 'vue'
import Vuex from 'vuex'
import ActionHelper from './ActionHelper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 笔记列表数据类
    aHelper: new ActionHelper(),
    // 编辑框的显示和隐藏
    showEdit: false,
    // 传递修改的笔记对象数据
    transItem: null,
    // 筛选分类id
    filterCateId: -1
  },
  mutations: {
    // 点击编辑传过来的数据对象
    edit(state:any, editItem:any): void{
      state.showEdit = true;
      state.transItem = editItem;
    },
    // 根据点击修改筛选分类id
    filterCate(state:any, cid:number): void{
      state.filterCateId = cid;
    }
  }
})
