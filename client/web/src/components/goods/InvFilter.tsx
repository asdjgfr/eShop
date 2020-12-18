import React from "react";
import { DatePicker, Form, Row, Col, Input, Button } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import Supplier from "@/components/goods/Supplier";

interface iProps extends WithTranslation {
  parentRef: any;
}
interface iState {}

const { RangePicker } = DatePicker;
class InvFilter extends React.Component<iProps, iState> {
  state: iState = {};
  async handleSearch() {
    console.log();
    await this.props.parentRef.list?.getList();
  }
  changeData(
    data: { id: number | undefined; name: string },
    type: string,
    item?: any
  ) {
    console.log(data, type, item);
  }
  render() {
    const { t } = this.props;
    return (
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label={t("goodsNameOrID")}>
              <Input placeholder={`${t("plsEnter")}${t("goodsNameOrID")}`} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("supplier")}>
              <Supplier
                onChangeSupplier={this.changeData.bind(this)}
                canCreated={true}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("deliveryAndStorageTime")}>
              <RangePicker
                showTime={{ format: "HH:mm:ss" }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("deliveryTime")}>
              <Input placeholder={`${t("plsEnter")}${t("deliveryTime")}`} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("amountOfGoods")}>
              <Input placeholder={`${t("plsEnter")}${t("amountOfGoods")}`} />
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
