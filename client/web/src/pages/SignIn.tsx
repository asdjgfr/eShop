import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withTranslation, WithTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { WechatOutlined } from "@ant-design/icons";

interface iProps extends WithTranslation {}
interface iState {}

class SignIn extends React.Component<iProps, iState> {
  onFinish(values: any) {
    console.log(values);
  }
  render() {
    const { t } = this.props;
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
              rules={[
                {
                  required: true,
                  message: t("plsEnter") + t("username") + t("!"),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("plsEnter") + t("username")}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t("plsEnter") + t("password") + t("!"),
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("plsEnter") + t("password")}
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
