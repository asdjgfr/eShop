import React from "react";
import { Form, Input, Button, Checkbox, Skeleton, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withTranslation, WithTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { WechatOutlined } from "@ant-design/icons";
import { inject } from "mobx-react";
import Store from "@/store";
import { usernameAndPassword, autoComplete } from "@/lib/validator";
import { signIn } from "@/api/user";
import { sleep } from "@/lib/pubfn";

interface iProps extends WithTranslation {
  store?: typeof Store;
}
interface iState {}

@inject("history")
class SignIn extends React.Component<iProps, iState> {
  async onFinish(values: any) {
    const { username, password, remember } = values;
    autoComplete("set", remember);
    const res = await signIn(username, password);
    if (res.code === 200) {
      localStorage.setItem("Authorization", res.Authorization);
      message.success(res.msg);
      await sleep(1000);
      this.props.store?.history.push("/shop/shop-list");
    } else {
      message.error(res.msg);
    }
  }
  render() {
    const { t } = this.props;
    const remember = autoComplete();
    return (
      <div className="sign-in">
        <div className="sign-in-content">
          <Skeleton
            active
            loading={
              !this.props.store?.shopInfo.title &&
              !this.props.store?.shopInfo.titleSuffix
            }
          >
            <header className="sign-in-title">
              <i style={{ backgroundImage: 'url("/logo192.png")' }} />
              <span>{this.props.store?.shopInfo.title}</span>
            </header>
            <p className="sign-in-sub-title">
              {this.props.store?.shopInfo.titleSuffix}
            </p>
          </Skeleton>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish.bind(this)}
          >
            <Form.Item
              name="username"
              rules={usernameAndPassword("username", t)}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("plsEnter") + t("username")}
                autoComplete={remember}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={usernameAndPassword("password", t)}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("plsEnter") + t("password")}
                autoComplete={remember}
              />
            </Form.Item>
            <Form.Item>
              <div className="justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>{t("remember") + t("password")}</Checkbox>
                </Form.Item>
                <Link to="/user/forget-password">
                  {t("forget") + t("password")}
                </Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                {t("signIn")}
              </Button>
            </Form.Item>
            <Form.Item>
              <div className="justify-between">
                <span>
                  {t("otherSignInMethods")}
                  <WechatOutlined
                    className="margin-l-r-8 click-item"
                    title={t("wechat")}
                  />
                </span>
                <Link to="/user/signUp">{t("signUp")}</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default withTranslation()(SignIn);
