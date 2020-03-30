<template>
  <!-- 便签新增/编辑区 -->
  <div>
    <div class="cover-layer"></div>
    <div id="new-markdown" class="editor-layer">
      <div class="editor-top">
        <input class="editor-title form-control" type="text" placeholder="标题" v-model="memo.title" />
        <div class="dropdown select-category">
          <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <span class="category">{{$store.state.aHelper.getCate(memo.cateId)}}</span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li @click="memo.cateId = 0">
              <a>工作</a>
            </li>
            <li @click="memo.cateId = 1">
              <a>生活</a>
            </li>
            <li @click="memo.cateId = 2">
              <a>学习</a>
            </li>
          </ul>
        </div>
        <ul class="tools">
          <li class="save" @click="saveItem"></li>
          <li class="cancel" @click="closeWin"></li>
        </ul>
      </div>
      <textarea class="text-content form-control" placeholder="内容" v-model="memo.content"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItemData from "../model/ItemData";
@Component
export default class MemoEditor extends Vue {
  memo: ItemData = new ItemData(-1, 0);
  // 关闭新建框
  closeWin() {
    this["$store"].state.showEdit = false;
  }
  // 点击保存将笔记项存到数组及本地存储种
  saveItem() {
    // 验证存储信息
    if (
      this.memo &&
      this.memo.cateId > -1 &&
      this.memo.title.trim().length > 0 &&
      this.memo.content.trim().length > 0
    ) {
      if (this.memo.id <= -1) {
        // 说明是添加操作
        // 存入笔记数组和本地存储中
        this["$store"].state.aHelper.add(this.memo);
        this["$store"].state.showEdit = false;
      } else {
        // 编辑操作
        this["$store"].state.aHelper.edit(this.memo);
        this["$store"].state.showEdit = false;
      }
    } else {
      window.alert("请输入正确格式的便签文本");
    }
  }
  // 在页面加载时自动调用,将传过来的编辑数据赋值给当前memo
  created() {
    this.memo = this["$store"].state.transItem;
  }
}
</script>