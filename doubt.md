### 疑问
1、umi-plugin-react api.onOptinchange is not function

A：旧项目 升级 umi umi-plugin-react
https://umijs.org/zh-CN/docs/upgrade-to-umi-3#%E5%8D%87%E7%BA%A7-umi-plugin-react-%E4%B8%BA-umijspreset-react

新项目直接用umi3 脚手架搭建

2、npm包 http-server or serve 区别

3、Cannot find module 'react/jsx-runtime' or its corresponding type declarations.ts(2307) 
vs code 报语法警告

A: 重启vscode即可

4、引入antd

A：.umirc.ts 文件增加配置
antd: {}

5、非受控组件和受控组件? 半受控组件？
[link](https://antd-course.ulivz.com/goozth.html#%E9%9D%9E%E5%8F%97%E6%8E%A7%E7%BB%84%E4%BB%B6)

A：对于这种不能直接控制状态的组件，我们称之为“非受控组件”；

6、如何开发的时候关闭mock?然后代理真实测试环境服务器
(1).env 文件里 设置 MOCK=none 就可以关闭
(2)、[proxy](https://umijs.org/zh-CN/config#proxy)
在.umirc.ts 增加 proxy 配置
```
proxy: {
  '/api': {
    target: 'http://jsonplaceholder.typicode.com/',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
},
```





