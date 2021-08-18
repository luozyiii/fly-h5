import { Toast } from 'antd-mobile';

export default function Http({
  url,
  method = 'post',
  headers = {},
  body = {},
  setLoading,
  setResult,
}) {
  setLoading && setLoading(true);

  const token = localStorage.getItem('token');

  let defaultHeader = {
    'Content-type': 'application/json',
  };

  defaultHeader = token ? { ...defaultHeader, token } : defaultHeader;

  let params;
  let urlParams = '';
  if (method.toUpperCase() === 'GET') {
    Object.keys(body).forEach((key) => {
      urlParams += key + '=' + body[key] + '&';
    });
    if (urlParams) {
      urlParams = urlParams.substring(0, urlParams.length - 1);
      urlParams = '?' + urlParams;
    }
    params = undefined;
  } else {
    params = {
      headers: {
        ...defaultHeader,
        ...headers,
      },
      method,
      body: JSON.stringify(body),
    };
  }

  return new Promise((resolve, reject) => {
    fetch(`/api${url}${urlParams}`, params)
      .then((res) => res.json())
      .then((res) => {
        // console.log('res:', res);
        if (res.status === 200) {
          resolve(res.data);
          setResult && setResult(res.data);
        } else {
          if (res.status === 1001) {
            location.href = '/login?from=' + location.pathname;
            localStorage.clear();
          }
          Toast.fail(res.errMsg);
          reject(res.errMsg);
        }
      })
      .catch((err) => {
        Toast.fail(err);
        reject(err);
      })
      .finally(() => {
        setLoading && setLoading(false);
      });
  });
}
