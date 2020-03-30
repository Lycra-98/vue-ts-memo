import Cate from './CateEnum'
// 一篇文章的内容
class ItemData {
    id! : number;
    cateId! : Cate;
    title!: string;
    content! : string;
    createTime! : string;
    // 传入默认值
    constructor(id: number = -1, cateId: Cate = -1, title: string = '', content: string = '') {
        this.id = id;
        // 分类id应该是枚举类型
        this.cateId = cateId;
        this.title = title;
        this.content = content;
        this.createTime = this.timeFormat(Date.now())
    }
    // 格式化创建时间的方法
    timeFormat(timeSpan: number) : string {
        let data = new Date(timeSpan);
        let str = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes()
        return str
    }
}

export default ItemData
