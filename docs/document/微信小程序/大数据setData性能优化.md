## 小程序前端分页
### 问题背景：
​        小程序setData性能比较差，通常情况下是进行了全部的数据重新渲染。通过将大量的数据分页，而不是将数据全部重新渲染一次解决性能问题。实际上是形成了一个二维数组，通过改变data变量（双向绑定数据）的内容，而不是改变data变量的指向来实现性能优化。

### 操作步骤:

    1.在需要分页渲染的DOM结构改成双重循环的形式进行渲染
    2.引用paginationMixin
    3.在获取到数据源的位置进行数据处理，并对分页配置数据进行初始化
    4.还需要添加onReachBottom方法
### 案例说明:

​		这里使用百果园+小程序 搜索页进行案例说明(页面路径: /userA/pages/searchGoods/index)

#### 		1.wxml在需要分页渲染的DOM结构改成双重循环的形式

![image.png](https://cdn.nlark.com/yuque/0/2020/png/1087407/1597112695091-c1f209b4-aa57-4b54-9710-e671c2152e2a.png)

#### 		2.引用paginationMixin

```
const paginationMixin = require('../../../mixins/paginationMixin')  //具体路径由具体情况而定

在具体页面page方法中使用mixin
mixins: [paginationMixin]
```

#### 		3.在获取到数据源的位置进行数据处理，并对分页配置数据进行初始化

```
// 数据源赋值给_data中的pagesData
this._data.pagesData = 数据源
// 重置分页配置数据(在数据源更改的地方需要调用)
this.resetPageConfig()
// 加载分页数据(需要传递一个双向绑定数据的变量名,在mixin中会有setData操作,用于渲染页面)
this.loadData("goodsList")
```

#### 		4.添加onReachBottom方法

```
 onReachBottom() {
    this._data.pageNum ++; //翻页操作
    this.loadData("goodsList") // 加载翻页后的数据
  }
```

这里的onReachBottom是指翻页操作，若使用了<scroll-view>则需要使用bindscrolltolotolower



##### 附（paginationMixin代码)：

```
// 前端分页mixin，优化大数据setData性能问题
/**
 * 1.在需要分页渲染的DOM结构改成双重循环的形式进行渲染
 * 2.引用paginationMixin
 * 3.在获取到数据源的位置进行数据处理，并对分页配置数据进行初始化
 * 4.还需要添加onReachBottom方法
 */

module.exports = {
  pageConfig: {
    pageNum: 1,
    pageSize: 20,
    pagesData: [],
    totalPage: 0,
    loadDataToPageNum: 0
  },
  // 重置分页配置
  resetPageConfig(){
    this.pageConfig.pageNum = 1
    const {pageSize, pagesData} = this.pageConfig
    this.pageConfig.totalPage = Math.ceil(pagesData.length / pageSize)
  },
  // 加载分页数据
  loadData(varName) {
    const {pageSize, pageNum, totalPage, pagesData} = this.pageConfig
    const currentPageData = pagesData.slice((pageNum - 1)*pageSize, pageNum * pageSize)
    pageNum === 1 && this.setData({[`${varName}`]: []})
    pageNum <= totalPage && this.setData({
      [`${varName}[${pageNum-1}]`]: currentPageData
    })
  },
  // 根据数组对象的id去查找对应的页码并加载到该页面
  findPageNumByItemId(varName, ItemId){
    const {pageSize, pagesData} = this.pageConfig
    const itemIndex = pagesData.findIndex(item =>{
      return Number(item[varName]) === Number(ItemId)
    })
    console.log('itemIndex', itemIndex)
    if(itemIndex !== -1){
      this.pageConfig.loadDataToPageNum = Math.ceil((itemIndex + 1)/pageSize)
    }
    console.log('loadDataToPageNum', this.pageConfig.loadDataToPageNum)
  },
  // 根据页码连续加载数据到对应的页面
  loadDataToSpecificPage(varName) {
    for(let i=1; i <= this.pageConfig.loadDataToPageNum; i++){
      this.pageConfig.pageNum = i
      this.loadData(varName)
    }
    console.log('allData', this.data[varName])
  }
}
```