import React from "react";
import { Select, Spin, Empty, Form, Row, Col, Input, Button } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import GoodsName from "@/components/goods/GoodsName";

interface iProps extends WithTranslation {
  parentRef: any;
}
interface iState {}
class InvFilter extends React.Component<iProps, iState> {
  state: iState = {};
  async handleSearch() {
    console.log();
    await this.props.parentRef.list?.getList();
  }
  changeData(data: { id: number; name: string }, type: string, item: any) {
    console.log(data, type, item);
  }
  changeForm(item: any) {
    console.log(item);
  }
  render() {
    const { t } = this.props;
    return (
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        onChange={this.changeForm}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label={t("goodsID")}>
              <Input placeholder={t("plsEnter") + t("goodsID")} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("goodsName")}>
              <GoodsName
                onChangeGoodsName={this.changeData.bind(this)}
                canCreated={false}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
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
              <Button type="primary" onClick={this.handleSearch.bind(this)}>
                {t("search")}
              </Button>
              &emsp;
              <Button type="primary" danger>
                {t("clear")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default withTranslation()(InvFilter);
