// 定义操作本地存储的数据的类
class DataHelper {
    // 本地存储键名
    dataKey: string;
    // 每一条数据主键名
    primaryKey: string;
    // 传值的时候通过let data = new DataHalper('plData', 'id')
    constructor(strKey: string, idKey: string) {
        this.dataKey = strKey;
        this.primaryKey = idKey
    }
    // 读取数据的方法, 必须返回一个数组
    readData(): any {
        // 将本地存储的数据取出
        let data:string | null = localStorage.getItem(this.dataKey)
        if (data != null) {
            // 如果有数据,进行转化,并返回
            return JSON.parse(data)
        }
        return []
    }
    // 将数据存入本地存储的方法
    saveData(arrData: any[]): void {
        // 将数组进行转化
        let strData:string = JSON.stringify(arrData);
        // 存入本地存储
        localStorage.setItem(this.dataKey, strData);
    }
    // 添加数据到本地存储方法,添加的是每一篇笔记对象ItemData
    addData(newDataObj: any): number {
        let dataArray = this.readData();
        if (dataArray == null) {
            dataArray = [];
        }
        // 自动生成 主键值 (id 值)
        //  如果 数组 长度 > 0，则 将 最后一个 元素的 id 值 取出 + 1 作为 新元素的 id值
        //               <= 0, 则 将 1 作为 新元素的 id 值
        let newId =  dataArray.length > 0 ? dataArray[dataArray.length - 1][this.primaryKey] + 1 : 1;
        newDataObj[this.primaryKey] =newId;

        // 将添加了 主键值 的 对象 追加到数组
        dataArray.push(newDataObj);

        // 将数组 保存到 localStrorage 中
        this.saveData(dataArray);

        // 返回添加了 id 的数据对象
        return newId;
    }
    // 删除数据方法
    removeDataById(id: string | number): boolean {
        // 获取数据
        let arr: any = this.readData();
        // 根据id在数组中找到对应的元素的索引
        let index = arr.findIndex((item : any) => {
            return item[this.primaryKey] === id;
        })
        // 如果找到了
        if (index !== -1) {
            arr.splice(index, 1);
            this.saveData(arr);
            return true
        }
        return false
    }
}

export default DataHelper