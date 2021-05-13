import { history } from 'umi';

// 运行时配置： 用户登录鉴权
export function onRouteChange(route) {
  // console.log(route);
  const nowPath = route.routes[0].routes.filter(
    (item) => item.path === route.location.pathname,
  );
  // console.log(nowPath);
  const isLogin = localStorage.getItem('token');
  if (nowPath.length === 1 && nowPath[0].auth && !isLogin) {
    history.push({
      pathname: '/login',
      query: {
        from: route.location.pathname, // 记录之前页面路由
      },
    });
  }
}
