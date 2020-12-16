import React from "react";
import { Form, Input, Button, Row, Col, Divider, Menu, Dropdown } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import AddGoods from "@/components/goods/addGoods";
import InventoryManagementList from "@/components/goods/InventoryManagementList";
import ImportExcel from "@/components/ImportExcel";
import { batchAddInventory } from "@/api/inventoryManagement";

interface iProps extends WithTranslation {}
interface iState {
  loading: boolean;
  addVisible: boolean;
  importVisible: boolean;
  importLoading: boolean;
}

let baiCancel = () => {};
class InventoryManagement extends React.Component<iProps, iState> {
  state: iState = {
    loading: false,
    addVisible: false,
    importVisible: false,
    importLoading: false,
  };
  $refs: any = {
    list: undefined,
  };
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
  async handleBatchAddGoods(goods: any[]) {
    this.setState({
      importLoading: true,
    });
    baiCancel();
    const bai = batchAddInventory(goods);
    baiCancel = bai.cancel;
    await bai.data;
    await this.$refs.list?.getList();
    this.handleCloseImportExcel();
  }
  handleCloseImportExcel() {
    this.setState({
      importVisible: false,
      importLoading: false,
    });
  }
  render() {
    const { t } = this.props;
    const { importVisible, addVisible, importLoading } = this.state;
    return (
      <>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
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
                <Menu.Item key="download">
                  <a
                    download={t("inventoryTemplateFilename")}
                    rel="noopener noreferrer"
                    href={`/templateFiles/${t("inventoryTemplateFilename")}`}
                  >
                    {t("downloadTemplate")}
                  </a>
                </Menu.Item>
                <Menu.Item key="batchImport">{t("batchImport")}</Menu.Item>
                <Menu.Item key="export">{t("export")}</Menu.Item>
              </Menu>
            }
          >
            {t("add")}
          </Dropdown.Button>
        </div>
        <InventoryManagementList
          onRef={(ref: any) => {
            this.$refs.list = ref;
          }}
        />
        <AddGoods
          visible={addVisible}
          toggleVisible={this.toggleAddModal.bind(this)}
          listRef={this.$refs.list}
        />
        <ImportExcel
          visible={importVisible}
          title={t("batchImportInventory")}
          buttonText={t("batchImportInventory")}
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onCancel={this.handleCloseImportExcel.bind(this)}
          onOk={this.handleBatchAddGoods.bind(this)}
          loading={importLoading}
        />
      </>
    );
  }
}

export default withTranslation()(InventoryManagement);
