<template>
  <!-- 菜单栏 -->
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand">
          <img height="40" src="../assets/logo.png" />
        </a>
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          aria-expanded="false"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse navbar-right">
        <ul class="nav navbar-nav">
          <li class="add dropdown">
            <a class="create-new dropdown-toggle" data-toggle="dropdown">新建</a>
            <ul class="dropdown-menu">
              <li>
                <a @click="showWin">文本便签</a>
              </li>
            </ul>
          </li>
          <li class="categories dropdown">
            <a class="current-category dropdown-toggle" data-toggle="dropdown">
              全部
              <span class="count badge">{{doFilter(-1)}}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="total" @click="doFilterById(-1)">
                <a>
                  全部
                  <span class="count badge">{{doFilter(-1)}}</span>
                </a>
              </li>
              <li class="divider"></li>
              <li  @click="doFilterById(0)">
                <a>
                  工作
                  <span class="count badge">{{doFilter(0)}}</span>
                </a>
              </li>
              <li  @click="doFilterById(1)">
                <a>
                  生活
                  <span class="count badge">{{doFilter(1)}}</span>
                </a>
              </li>
              <li @click="doFilterById(2)">
                <a>
                  学习
                  <span class="count badge">{{doFilter(2)}}</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ItemData from '../model/ItemData';
@Component
export default class MenuBar extends Vue {
  // 展示新建文本框
  showWin() {
    this['$store'].state.transItem = new ItemData(-1, 0);
    this['$store'].state.showEdit = true
  }
  // 根据分类id不同返回不同的数组长度
  doFilter(cid: number): number {
    if (cid === -1) {
      return this['$store'].state.aHelper.memoList.length
    } else {
      return this['$store'].state.aHelper.memoList.filter((ele: any) => ele.cateId === cid).length
    }
  }
  // 根据分类id显示不同笔记数组列表
  doFilterById(cid: number): void {
    this['$store'].commit('filterCate', cid)
  }
}
</script>