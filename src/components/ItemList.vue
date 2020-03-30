<template>
    <div id="memos" class="container">
        <MemoItem v-for="item in filterCate()" :key="item.id" :memo="item" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ItemData from '../model/ItemData'
import MemoItem from './MemoItem.vue'

@Component({
    components: {
        MemoItem
    }
})
export default class ItemList extends Vue {
    // 笔记数组数据
    itemList: ItemData[] = this['$store'].state.aHelper.memoList;
    filterCate() {
        if (this['$store'].state.filterCateId === -1) {
            return this.itemList
        } else {
            return this.itemList.filter((ele: any) => {
                return ele.cateId === this['$store'].state.filterCateId
            })
        }
    }
}
</script>