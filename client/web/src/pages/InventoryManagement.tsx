import React from "react";
import { Form, Input, Button, Row, Col, Divider, Menu, Dropdown } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import AddGoods from "@/components/goods/addGoods";
import InventoryManagementList from "@/components/goods/InventoryManagementList";
import ImportExcel from "@/components/ImportExcel";

interface iProps extends WithTranslation {}
interface iState {
  loading: boolean;
  addVisible: boolean;
  importVisible: boolean;
}

class InventoryManagement extends React.Component<iProps, iState> {
  state: iState = {
    loading: false,
    addVisible: false,
    importVisible: false,
  };
  onFormLayoutChange() {}
  handleMenuClick(item: any) {
    switch (item.key) {
      case "add":
        this.toggleAddModal(true);
        break;
      case "batchImport":
        this.toggleImportModal(true);
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
  toggleImportModal(importVisible: boolean) {
    this.setState({
      importVisible,
    });
  }
  render() {
    const { t } = this.props;
    const { importVisible, addVisible } = this.state;
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
        <InventoryManagementList />
        <AddGoods
          visible={addVisible}
          toggleVisible={this.toggleAddModal.bind(this)}
        />
        <ImportExcel
          visible={importVisible}
          title={t("batchImportInventory")}
          buttonText={t("batchImportInventory")}
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv"
        />
      </>
    );
  }
}

export default withTranslation()(InventoryManagement);
