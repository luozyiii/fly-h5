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

### 使用useObserverHook实现滚动加载
/src/pages/search.js

### 使用useImgHook实现图片懒加载; 核心API也是IntersectionObserver
```
 * 1、监听图片是否进入可视区域
 * 2、将src属性的值替换为真实的图片地址 data-src
 * 3、停止监听当前的节点
```

