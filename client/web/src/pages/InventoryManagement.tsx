import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";

interface iProps extends WithTranslation {}
interface iState {
  loading: boolean;
}

class InventoryManagement extends React.Component<iProps, iState> {
  state: iState = {
    loading: false,
  };
  onFormLayoutChange() {}
  render() {
    const { t } = this.props;
    const { loading } = this.state;
    return (
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        onValuesChange={this.onFormLayoutChange.bind(this)}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label={t("itemID")}>
              <Input placeholder={t("plsEnter") + t("itemID")} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("itemName")}>
              <Input placeholder={t("plsEnter") + t("itemName")} />
            </Form.Item>
          </Col>
          <Col span={6}>
            {" "}
            <Form.Item label={t("supplier")}>
              <Input placeholder={t("plsEnter") + t("supplier")} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("storageTime")}>
              <Input placeholder={t("plsEnter") + t("storageTime")} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("deliveryTime")}>
              <Input placeholder={t("plsEnter") + t("deliveryTime")} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("amountOfGoods")}>
              <Input placeholder={t("plsEnter") + t("amountOfGoods")} />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "center" }}>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default withTranslation()(InventoryManagement);
