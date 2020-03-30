<template>
    <div class="memo-container">
    <div class="memo">
      <div class="mark"></div>
      <div class="memo-heading">
        <h5 class="title">{{memo.title}}</h5>
        <ul class="tools">
          <li class="edit" @click="editItem"></li>
          <li class="delete" @click="removeItem"></li>
        </ul>
      </div>
      <h6 class="memo-info">
        <span class="timeStamp">{{memo.createTime}}</span>
        <span class="category">分类: {{$store.state.aHelper.getCate(memo.cateId)}}</span>
      </h6>
      <div class="content">
        <div class="text">{{memo.content}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop ,Vue } from 'vue-property-decorator';
import ItemData from '../model/ItemData';
@Component
export default class MemoItem extends Vue {
    // 通过父组件将每一个笔记项传过来
    @Prop() memo!: ItemData
    // 删除方法
    removeItem(): void{
        // 询问用户是否要删除该笔记
        if (!window.confirm(`是否确定删除标题为${this.memo.title}的笔记`)) return
        // 确定删除了
        this['$store'].state.aHelper.remove(this.memo.id)
    }
    // 点击编辑按钮
    editItem(): void {
        // 点击编辑按钮需要将该笔记对象传到vuex中
        // 但是不是直接传该笔记对象,需要创建一个对象副本,不然就是传的内存地址,修改值回直接印象itemList组件中的笔记项
        let newEditItem = JSON.parse(JSON.stringify(this.memo))
        // 传到vuex中的transItem中
        this['$store'].commit('edit', newEditItem)
    }
}
</script>