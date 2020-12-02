import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Table,
  Divider,
  Menu,
  Dropdown,
} from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import AddGoods from "@/components/goods/addGoods";

interface iProps extends WithTranslation {}
interface iState {
  loading: boolean;
  addVisible: boolean;
}

class InventoryManagement extends React.Component<iProps, iState> {
  state: iState = {
    loading: false,
    addVisible: false,
  };
  onFormLayoutChange() {}
  handleMenuClick(item: any) {
    switch (item.key) {
      case "add":
        this.toggleAddModal(true);
        break;
      case "batchImport":
        break;
      case "export":
        break;
    }
  }
  toggleAddModal(addVisible: boolean) {
    this.setState({
      addVisible,
    });
  }
  render() {
    const { t } = this.props;
    const { loading, addVisible } = this.state;
    return (
      <>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          onValuesChange={this.onFormLayoutChange.bind(this)}
        >
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label={t("goodsID")}>
                <Input placeholder={t("plsEnter") + t("goodsID")} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={t("goodsName")}>
                <Input placeholder={t("plsEnter") + t("goodsName")} />
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
                <Button type="primary">{t("search")}</Button>
                &emsp;
                <Button type="primary" danger>
                  {t("clear")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Divider />
        <div>
          <Dropdown.Button
            type="primary"
            onClick={this.handleMenuClick.bind(this, { key: "add" })}
            overlay={
              <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="batchImport">{t("batchImport")}</Menu.Item>
                <Menu.Item key="export">{t("export")}</Menu.Item>
              </Menu>
            }
          >
            {t("add")}
          </Dropdown.Button>
        </div>
        <Table
          loading={loading}
          scroll={{ x: "max-content" }}
          columns={[
            {
              title: t("index"),
              dataIndex: "index",
              key: "index",
            },
            {
              title: t("goodsName"),
              dataIndex: "goodsName",
              key: "goodsName",
            },
            {
              title: t("goodsTypes"),
              dataIndex: "goodsTypes",
              key: "goodsTypes",
            },
            {
              title: t("goodsID"),
              dataIndex: "goodsID",
              key: "goodsID",
            },
            {
              title: t("supplier"),
              dataIndex: "supplier",
              key: "supplier",
            },
            {
              title: t("inventory"),
              dataIndex: "inventory",
              key: "inventory",
            },
            {
              title: t("costPrice"),
              dataIndex: "costPrice",
              key: "costPrice",
            },
            {
              title: t("totalCost"),
              dataIndex: "totalCost",
              key: "totalCost",
            },
            {
              title: t("sellingPrice"),
              dataIndex: "sellingPrice",
              key: "sellingPrice",
            },
            {
              title: t("guidePrice"),
              dataIndex: "guidePrice",
              key: "guidePrice",
            },
            {
              title: t("latestPurchasePrice"),
              dataIndex: "latestPurchasePrice",
              key: "latestPurchasePrice",
            },
            {
              title: t("unit"),
              dataIndex: "unit",
              key: "unit",
            },
            {
              title: t("minPackages"),
              dataIndex: "minPackages",
              key: "minPackages",
            },
            {
              title: t("latestStorageTime"),
              dataIndex: "latestStorageTime",
              key: "latestStorageTime",
            },
            {
              title: t("latestTime"),
              dataIndex: "latestTime",
              key: "latestTime",
            },
            {
              title: t("action"),
              dataIndex: "action",
              key: "action",
              render: (foo, item) => {
                return [<Button type="primary">{t("search")}</Button>];
              },
            },
          ]}
          dataSource={[]}
        />
        <AddGoods
          visible={addVisible}
          toggleVisible={this.toggleAddModal.bind(this)}
        />
      </>
    );
  }
}

export default withTranslation()(InventoryManagement);
