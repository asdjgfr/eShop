import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { inject } from "mobx-react";
import Store from "@/store";

interface iProps {
  store?: Store;
}
interface iState {}

@inject("store")
class SignIn extends React.Component<iProps, iState> {
  onFinish(values: any) {
    console.log(values);
  }
  render() {
    console.log(this.props.store?.i18n.test);
    return (
      <div className="sign-in">
        <div className="sign-in-content">
          <header className="sign-in-title">
            <i />
            <span>123</span>
          </header>
          <p className="sign-in-sub-title">副标题</p>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish.bind(this)}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名！" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码！" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                忘记密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              或 <a href="">注册</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignIn;
