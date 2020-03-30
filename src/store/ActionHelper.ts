import DataHelper from "./DataHelper";
import ItemData from "../model/ItemData";
import Cate from '@/model/CateEnum';
// 将本地存储的数据进行操作,转化为笔记对象数组操作
class ActionHelper {
  // 负责数据处理
  dataHelper: DataHelper = new DataHelper('memoData', 'id');
  // 笔记列表,将本地存储的Obejct转化为ItemData类
  memoList!: ItemData[];
  constructor() {
    // 将转化后的笔记数组赋值给memoList
    this.memoList = this.readData()
  }
  // 将本地存储的Obejct数组转化为ItemData类数组的方法
  readData(): ItemData[] {
    // 取出本地存储的数据,要么是空数组要么存着Object
    let arrObj = this.dataHelper.readData();
    let arrItem = arrObj.map((ele: any) => {
      // 创建笔记类
      let item = new ItemData();
      item.id = ele.id;
      item.cateId = ele.cateId;
      item.title = ele.title;
      item.content = ele.content;
      item.createTime = ele.createTime;
      return item
    });
    return arrItem;
  }
  // 业务操作
  // 新增笔记
  add(item: ItemData): number{
    // 现加该数据存到本地存储,将id存起来
    let itemId = this.dataHelper.addData(item);
    // 将该对象添加到笔记数组种
    this.memoList.push(item)
    // 将数组存入本地
    this.dataHelper.saveData(this.memoList);
    // 返回添加的笔记项id
    return itemId
  }
  // 修改笔记
  edit(item: ItemData): void {
    // 根据id在笔记数组种找到对应的对应笔记项
    let memoItem: ItemData | undefined  = this.memoList.find((ele: any) => ele.id === item.id)
    // 将传进来的笔记项的值赋值给根据id找到的笔记项
    if (memoItem) {
      memoItem.cateId = item.cateId;
      memoItem.title = item.title;
      memoItem.content = item.content;
      // 修好后存入本地存储
      this.dataHelper.saveData(this.memoList)
    }
  }
  // 删除笔记
  remove(id: number): void {
    // 根据id找到对应的笔记数组里的笔记项索引
    let itemIndex: number = this.memoList.findIndex((ele: any) => ele.id === id)
    if (itemIndex !== -1) {
      // 删除数组该索引项对应的笔记
      this.memoList.splice(itemIndex, 1)
      this.dataHelper.saveData(this.memoList)
    }
  }

  // 返回枚举代表的文字
  getCate(cateId: Cate): string {
    const cateArr: string[] = ['工作', '生活', '学习']
    return cateArr[cateId]
  }
}

export default ActionHelper
