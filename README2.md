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

### 通过 umi 运行时配置，对页面进行登陆验证

- 用户信息用localStorage存储

- 运行时配置, 用户鉴权  /src/app.js
```
// /src/app.js

import { history } from 'umi';

// 运行时配置： 用户登录鉴权
export function onRouteChange(route) {
  // console.log(route);
  const nowPath = route.routes[0].routes.filter(
    (item) => item.path === route.location.pathname,
  );
  // console.log(nowPath);
  const isLogin = localStorage.getItem('username');
  if (nowPath.length === 1 && nowPath[0].auth && !isLogin) {
    history.push({
      pathname: '/login',
      query: {
        from: route.location.pathname, // 记录之前页面路由
      },
    });
  }
}

// 获取url参数, 跳转回之前页面
import { urlGet } from 'project-libs'
urlGet('from')

```

### 首页优化
- header 组件加载的时候render方法被执行了多次; 如何优化?

```
// 使用 memo 方法 优化
import React, { memo } from 'react';

export default memo(Header)
```
优化后仅执行一次

- search 组件优化后
```
export default memo(Search); // 优化后也执行了多次，这是因为props值变化导致； header组件没有props 值传入

// last 最后
// memo 第二个参数
function areEqual(prevProps, nextProps) {
  console.log(prevProps, nextProps);
  // true 可以渲染; 优化后剩下3次
  if (
    prevProps.citys === nextProps.citys &&
    prevProps.citysLoading === nextProps.citysLoading
  ) {
    return true;
  } else {
    return false;
  }
}

export default memo(Search, areEqual);

```

- hot 组件优化
渲染了2次 ： props?.house 从 无 到 有， 渲染了2次

### 订单页面优化-骨架屏
- 原理
（1）通过伪元素实现骨架样式
（2）制作布局组件，添加骨架样式
（3）替换默认Loading效果

- 添加骨架屏样式
/src/global.css

- 编写骨架屏组件 OrderSkeletons

- 将ActivityIndicator 替换成 OrderSkeletons

## 项目安全

### XSS 常见攻击方式与解决思路
- XSS跨站脚本攻击：在web页面注入脚本，使用JavaScript窃取用户信息
- SQL注入攻击：将用户传入的数据作为参数，使用字符串拼接的方式查到SQL查询中
- CSRF跨域请求伪造：伪造用户请求向网站发起恶意请求
- 海量接口请求：通过短时间内向服务器发起海量的请求，耗尽服务器资源，使服务器崩溃

#### XSS 攻击手段
- DOM-based型攻击：利用dom本身的缺陷，进行攻击。
```javascript
<img src="1" onerror="javascript:alert('xss')">
```
- 存储型：表单提交的数据存在恶意代码，被保存到目标网站的服务器中
- 反射型：恶意代码没有保存在目标网站，通过引诱用户点击一个链接到目标网站的恶意链接来实施攻击

### XSS防御手段
- 过滤：对用户的输入进行过滤，移除用户输入的Style节点、Script节点、IFrame等节点
- 编码：HTML Entity编码
- cookie：将重要的cookie设置成http only这样就不能通过js获取cookie

### SQL 注入防御手段
- 验证输入类型：比如根据id查询数据，那么变量必须是整型
- 转义特殊字段：比如引号、分号和横线等，在执行CURD前都需要进行转义

### CSRF攻击手段
浏览器 => Web A(安全) => 浏览器 => Web B(危险) => Web A

1、浏览并登陆网站A；
2、通过验证，生成cookie
3、用户访问网站B
4、网站B携带cookie访问网站A

### CSRF防御手段
- 使用token：服务器发送给客户端一个token，客户端请求接口带上该token，服务器验证token是否有效，有效就允许访问，否则拒绝访问。
- Referer验证：Referer指的是页面请求来源，意思是：只接受本站的请求，服务器才做响应；如果不是，就拦截
```javascript
// egg-allowHosts

```

### 接口防御手段
- 服务限流：服务器在一定时间段内只接受一定量的请求，超出限制则拒绝执行
```javascript
// egg-interfaceLimit
接口限流思路：3秒内最多允许3个接口请求
1、设置计数器，每次请求加1；保存起始时间
2、超过3秒，计数器大于3，则提示请求频繁；计数器清零，起始时间修改为当前时间
3、超过3秒，计数器小于3，计数器清零，起始时间修改为当前时间
```

- 接口缓存：将常用的接口进行缓存，减少对数据库的查询
```javascript
// egg-interfaceCache
接口思路：
1，接口地址作为redis中的key
2，查询redis，有缓存，返回返回接口
3，没有缓存，将接口返回结果保存到redis中
```

## 部署
- ngnix
```javascript
// 将nginx代码拷贝到服务器
scp -rp nginx root@112.74.201.142:/home/fly

// nginx 服务部署,映射本地目录到nginx容器
docker run -d -p 8080:80 --name docker_nginx \
  -v /home/fly/nginx/logs:/var/log/nginx \
  -v /home/fly/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
  -v /home/fly/nginx/conf.d:/etc/nginx/conf.d \
  -v /home/fly/nginx/html:/usr/share/nginx/html \
  f0b8a9a54136(镜像ID)

// 前端打包后上传到 /home/fly/nginx/html 即可

```

 

