## 前端界面开发及功能优化

### 底部导航组件MenuBar开发
antd-mobile TabBar 的二次封装

- 目录
/src/components/MenuBar

- 字体图标
```
// 安装
yarn add react-icons

// 引用
import { BsHouseDoorFill } from 'react-icons/bs';

```

- PropTypes
类型检查

### 首页开发

- 将flex布局 mixin
/src/assets/mixin.less

- 对主页面进行解耦,组件化
主页细分为 header search hot 三个组件模块

- dayjs 处理时间
```
yarn add dayjs
```

### 首页mock 数据
- 使用自定义useHttpHook 发送请求，mock/home.js 返回数据

### 搜索页面
- antd-mobild SearchBar、ActivityIndicator 组件
- /mock/house.js 接口延迟3s返回

### Intersection Observer
[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。

- intersectionRatio 
(0~1): 0 不在可视区域 1 完全在可视区域

- isIntersecting(true/false)
是否在可视区域

- 抽象成hook useObserverHook

跳转到首页报错？？？
Uncaught TypeError: Failed to execute 'unobserve' on 'IntersectionObserver': parameter 1 is not of type 'Element'.

增加节点的判断 即可不报错
```
if (observer && node) {}
```

- 滚动加载
```
/**
* 技术要点：借助一个元素的是否在可视区域，从而实现列表的滚动加载；核心API IntersectionObserver
* 1、监听loading是否展示出来
* 2、修改分页数据
* 3、监听分页数据的修改，发送接口，请求下一页的数据
* 4、监听loading的变化，拼装数据
*/
```

### 使用useObserverHook实现滚动加载
/src/pages/search.js

### 使用useImgHook实现图片懒加载; 核心API也是IntersectionObserver
```
 * 1、监听图片是否进入可视区域
 * 2、将src属性的值替换为真实的图片地址 data-src
 * 3、停止监听当前的节点
```

### 优化-提取公共组件，使用枚举，引入project-libs
- ShowLoading

- 枚举 enums
/src/emums 定义一些常量

- project-libs 
[project-libs](https://github.com/cpagejs/project-libs)
 是一个常用函数集锦的工具库，包括浏览器、函数式、常用验证、cookie、数组处理等函数。

 ```
 yarn add project-libs

 ```

 ### 民宿详情页面界面开发
 - 页面解耦 分Banner/Info/Lists/Footer 子组件

 - 滑动组件 [react-awesome-swiper](https://github.com/limingziqiang/react-awesome-swiper)
 ```
 // 内容里面样式有要求
 <AwesomeSwiper>
  <div className="swiper-warpper">
    <div className="swiper-slide">
      内容
    </div>
    <div className="swiper-slide">
      内容
    </div>
  </div>
  <div className="swiper-pagination"></div>
</AwesomeSwiper>
 ```
 
- 弹窗组件优化
```
componentWillReceiveProps(nextProps) {
  this.setState({
    showModal: nextProps.show,
  });
}
```

- 滚动加载评论
```
/**
* 1，监听loading是否展示出来
* 2，触发reload，修改分页
* 3，监听reload变化，重新请求接口
* 4，拼装数据
*/
```

- 不同组件的通信（使用think-react-store）

### 订单页面的开发

- 页面解耦，共用订单列表页Lists, 列表项单独为一个展示的子组件Item
- 单一组件通信，不需要引用think-react-store
- 滚动加载
```
/**
* 1、页面初始化的时候请求接口
* 2、监听loading组件是否展示出来
* 3、修改page，pageNum + 1，挨次重新请求接口
* 4、拼装数据，然后page
*/
```

### 我的
- rc-form 处理表单数据
```
// 安装
yarn add rc-form

// 使用
import { createForm } from 'rc-form';

function Edit() { }

export default createForm()(Edit);
```

### 登录和注册页面开发
```
/login
/register
```