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
