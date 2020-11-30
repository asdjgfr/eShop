import React from "react";
import { Descriptions, Button, Upload } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

interface iProps extends WithTranslation {}
interface iState {
  action: "save" | "edit";
  loading: boolean;
  imageUrl: string;
}

class Settings extends React.Component<iProps, iState> {
  state: iState = {
    action: "edit",
    imageUrl: "",
    loading: false,
  };
  async handleChangeInfo(action: "save" | "edit") {
    if (action === "save") {
      this.setState({
        action: "edit",
      });
    } else {
      this.setState({
        action: "save",
      });
    }
    this.setState({
      loading: false,
    });
  }
  beforeUpload(file: any) {
    return true;
  }
  handleChangeAvatar(info: any) {}
  render() {
    const { t } = this.props;
    const { action, loading, imageUrl } = this.state;
    return (
      <Descriptions
        bordered
        title={t("systemSettings")}
        extra={
          <Button
            type="primary"
            loading={loading}
            onClick={this.handleChangeInfo.bind(this, action)}
          >
            {t(action)}
          </Button>
        }
      >
        <Descriptions.Item span={3} label={t("avatar")}>
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="/"
            beforeUpload={this.beforeUpload.bind(this)}
            onChange={this.handleChangeAvatar.bind(this)}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Descriptions.Item>
        <Descriptions.Item label={t("alipay")}>支付宝</Descriptions.Item>
        <Descriptions.Item label={t("wechat")}>微信</Descriptions.Item>
        <Descriptions.Item label={t("phoneNumber")}>$80.00</Descriptions.Item>
        <Descriptions.Item label={t("email")}>$80.00</Descriptions.Item>
      </Descriptions>
    );
  }
}

export default withTranslation()(Settings);
