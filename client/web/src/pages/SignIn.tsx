import React from "react";
import { Form, Input, Button, Checkbox, Skeleton, message, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withTranslation, WithTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { WechatOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import store from "@/store";
import { usernameAndPassword, autoSignIn } from "@/lib/validator";
import { signIn } from "@/api/user";
import { sleep } from "@/lib/pubfn";
import { initGetUserMessageCount } from "@/lib/rc.local";
import history from "@/router/history";

interface iProps extends WithTranslation {
  shopInfo?: typeof store.shopInfo;
}
interface iState {
  loading: boolean;
}

@inject("shopInfo")
@observer
class SignIn extends React.Component<iProps, iState> {
  state: iState = {
    loading: false,
  };
  async onFinish(values: any) {
    this.setState({
      loading: true,
    });
    const { username, password, autoSignin } = values;
    autoSignIn("set", autoSignin);
    const si = signIn(username, password);
    const res = await si.data;
    if (res.code === 200) {
      localStorage.setItem("Authorization", res.Authorization);
      await initGetUserMessageCount();
      message.success(res.msg + "1秒后跳转。");
      await sleep(1000);
      history.push("/dashboard/analysis");
    } else {
      this.setState({
        loading: false,
      });
      message.error(res.msg);
    }
  }
  componentDidMount() {
    // 跳转到登录页的时候清除token
    localStorage.removeItem("Authorization");
  }
  render() {
    const { t } = this.props;
    return (
      <Spin spinning={this.state.loading}>
        <div className="sign-in account-bg">
          <div className="sign-in-content">
            <Skeleton
              active
              loading={
                !this.props.shopInfo?.title && !this.props.shopInfo?.titleSuffix
              }
            >
              <header className="sign-in-title">
                <i />
                <span>{this.props.shopInfo?.title}</span>
              </header>
              <p className="sign-in-sub-title">
                {this.props.shopInfo?.titleSuffix}
              </p>
            </Skeleton>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ autoSignin: autoSignIn() }}
              onFinish={this.onFinish.bind(this)}
            >
              <Form.Item
                name="username"
                rules={usernameAndPassword("username", t)}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t("plsEnter") + t("username")}
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
                />
              </Form.Item>
              <Form.Item>
                <div className="justify-between">
                  <Form.Item name="autoSignin" valuePropName="checked">
                    <Checkbox>{t("auto") + t("signIn")}</Checkbox>
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
      </Spin>
    );
  }
}

export default withTranslation()(SignIn);
