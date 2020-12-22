import React from "react";
import { DatePicker, Form, Row, Col, Input, Button, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { withTranslation, WithTranslation } from "react-i18next";
import Supplier from "@/components/goods/Supplier";
import { searchInventoryList } from "@/api/inventoryManagement";

interface iProps extends WithTranslation {
  parentRef: any;
}
interface iState {
  minAmountOfGoods: number;
  loading: boolean;
}

const { RangePicker } = DatePicker;
let cancel = () => {};
class InvFilter extends React.Component<iProps, iState> {
  formRef = React.createRef<FormInstance>();
  state: iState = {
    minAmountOfGoods: 0,
    loading: false,
  };
  async handleSearch() {
    cancel();
    const sil = searchInventoryList(this.formRef.current?.getFieldsValue());
    cancel = sil.cancel;
    const res = await sil.data;
    console.log(res);
    await this.refreshList();
  }
  async handleReset() {
    this.formRef.current?.resetFields();
    await this.refreshList();
  }
  async refreshList() {
    this.setState({ loading: true });
    await this.props.parentRef.list?.getList();
    this.setState({ loading: false });
  }
  changeForm(current: any) {
    if (!isNaN(current.minAmountOfGoods)) {
      this.setState({
        minAmountOfGoods: current.minAmountOfGoods,
      });
    }
  }
  render() {
    const { t } = this.props;
    const { minAmountOfGoods, loading } = this.state;
    return (
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        onValuesChange={this.changeForm.bind(this)}
        ref={this.formRef}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label={t("goodsNameOrID")} name="goodsNameOrID">
              <Input placeholder={`${t("plsEnter")}${t("goodsNameOrID")}`} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("supplier")}>
              <Supplier canCreated={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("deliveryAndStorageTime")}
              name="deliveryAndStorageTime"
            >
              <RangePicker
                showTime={{ format: "HH:mm:ss" }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t("amountOfGoods")}
              tooltip={t("minMaxAmountOfGoods")}
            >
              <Form.Item
                noStyle={true}
                name="minAmountOfGoods"
                initialValue={0}
              >
                <InputNumber min={0} />
              </Form.Item>
              &nbsp;-&nbsp;
              <Form.Item noStyle={true} name="maxAmountOfGoods">
                <InputNumber min={minAmountOfGoods} />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "center" }}>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                onClick={this.handleSearch.bind(this)}
                loading={loading}
              >
                {t("search")}
              </Button>
              &emsp;
              <Button
                type="primary"
                danger
                onClick={this.handleReset.bind(this)}
                loading={loading}
              >
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
