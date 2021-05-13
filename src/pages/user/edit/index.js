import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';
import { useLocation } from 'umi';

function Edit(props) {
  const { query } = useLocation();
  const { getFieldProps, validateFields } = props.form;
  const {
    user: { avatar, phone, sign, getUserAsync, editUserAsync },
  } = useStoreHook();
  const [files, setFiles] = useState([{ url: avatar }]);

  const handleChange = (files) => {
    // console.log('files:', files);
    if (files[0]?.file?.size / 1024 / 1024 > 1) {
      Toast.fail('图片大小不能大于1M');
      return;
    }
    setFiles(files);
  };

  const handleSubmit = () => {
    if (!files.length) {
      Toast.fail('请上传图片');
      return;
    }
    validateFields((error, value) => {
      console.log(error, value);
      if (error) {
        Toast.fail('请将信息补充完整');
        return;
      } else {
        editUserAsync({
          avatar: files[0].url,
          phone: value.tel,
          sign: value.sign,
        });
      }
    });
  };

  useEffect(() => {
    getUserAsync({ id: query?.id });
  }, []);

  // fix重新刷新头像加载失败的问题
  useEffect(() => {
    // console.log('刷新');
    setFiles([{ url: avatar }]);
  }, [avatar]);

  return (
    <div className="user-edit">
      <List>
        <ImagePicker
          files={files}
          selectable={files.length < 1}
          onChange={handleChange}
        />
        <InputItem
          {...getFieldProps('tel', {
            rules: [{ required: true }],
            initialValue: phone,
          })}
          placeholder="电话"
        />
        <InputItem
          {...getFieldProps('sign', {
            rules: [{ required: true }],
            initialValue: sign,
          })}
          placeholder="签名"
        />
      </List>
      <Button
        type="warning"
        style={{ marginTop: '20px' }}
        onClick={handleSubmit}
      >
        修改
      </Button>
    </div>
  );
}
export default createForm()(Edit);
