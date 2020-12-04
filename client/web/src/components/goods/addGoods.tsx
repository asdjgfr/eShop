import React from "react";
import { Modal, Form, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { withTranslation, WithTranslation } from "react-i18next";
import { priceFormatter } from "@/lib/pubfn";
import GoodsName from "@/components/goods/GoodsName";
import Supplier from "@/components/goods/Supplier";
import TypesOfGoods from "@/components/goods/TypesOfGoods";
import Unit from "@/components/goods/Unit";
import { IInventoryData, addInventory } from "@/api/inventoryManagement";

interface iProps extends WithTranslation {
  visible: boolean;
  toggleVisible: (arg: boolean) => void;
}

interface iState {
  confirmLoading: boolean;
  postData: IInventoryData;
}

const excludeKeys = ["supplier", "unit", "goodsTypes"];

let cancel = () => {};
const max = 100000000;
class AddGoods extends React.Component<iProps, iState> {
  formRef = React.createRef<FormInstance>();
  state: iState = {
    confirmLoading: false,
    postData: {
      name: "",
      inventory: 1,
      costPrice: 0,
      sellingPrice: 0,
      guidePrice: 0,
      minPackages: 1,
      supplier: { id: undefined, name: "" },
      goodsTypes: { id: undefined, name: "" },
      unit: { id: undefined, name: "" },
    },
  };
  $refs: any = {
    supplier: undefined,
    goodsTypes: undefined,
    unit: undefined,
  };
  formItems = [
    {
      name: "name",
      label: "goodsName",
      rules: [{ required: true }],
      children: (
        <GoodsName
          onChangeGoodsName={this.handleChangePostData.bind(this)}
          canCreated={true}
        />
      ),
    },
    {
      name: "supplier",
      label: "supplier",
      noStyle: true,
      rules: [{ required: true }],
      children: (
        <Supplier
          onChangeSupplier={this.handleChangePostData.bind(this)}
          canCreated={true}
          onRef={(ref: any) => {
            this.$refs.supplier = ref;
          }}
        />
      ),
    },
    {
      name: "goodsTypes",
      label: "goodsTypes",
      noStyle: true,
      rules: [{ required: true }],
      children: (
        <TypesOfGoods
          onChangeGoodsType={this.handleChangePostData.bind(this)}
          canCreated={true}
          onRef={(ref: any) => {
            this.$refs.goodsTypes = ref;
          }}
        />
      ),
    },
    {
      name: "unit",
      label: "unit",
      rules: [{ required: true }],
      noStyle: true,
      children: (
        <Unit
          onChangeUnit={this.handleChangePostData.bind(this)}
          canCreated={true}
          onRef={(ref: any) => {
            this.$refs.unit = ref;
          }}
        />
      ),
    },
    {
      name: "inventory",
      label: "newInventory",
      rules: [{ required: true }],
      props: {
        initialValue: 1,
        tooltip: this.props.t("newInventoryTooltip"),
      },
      children: <InputNumber min={1} max={max} precision={0} />,
    },
    {
      name: "costPrice",
      label: "costPrice",
      rules: [{ required: true }],
      props: {
        initialValue: 0.0_0,
      },
      children: <InputNumber min={0} max={max} precision={2} />,
    },
    {
      name: "sellingPrice",
      label: "sellingPrice",
      rules: [{ required: true }],
      props: {
        initialValue: 0.0_0,
      },
      children: <InputNumber min={0} max={max} precision={2} />,
    },
    {
      name: "guidePrice",
      label: "guidePrice",
      rules: [{ required: true }],
      props: {
        initialValue: 0.0_0,
      },
      children: <InputNumber min={0} max={max} precision={2} />,
    },
    {
      name: "minPackages",
      label: "minPackages",
      rules: [{ required: true }],
      props: {
        initialValue: 1,
      },
      children: <InputNumber min={1} max={max} precision={0} />,
    },
  ];
  handleChangePostData(
    data: { id: number; name: string },
    type: string,
    item?: any
  ) {
    const postData: any = {
      ...this.state.postData,
    };
    if (type === "name") {
      if (data.id !== -1) {
        const { current } = this.formRef;

        current?.setFieldsValue({
          guidePrice: item.guidePrice,
          minPackages: item.minPackages,
          sellingPrice: item.sellingPrice,
          costPrice: item.costPrice,
        });
        this.$refs.supplier?.updateVal(current, item.supplierID);
        this.$refs.goodsTypes?.updateVal(
          this.formRef.current,
          item.goodsTypesID
        );
        this.$refs.unit?.updateVal(this.formRef.current, item.unitID);
      }
      postData.name = data.name;
    } else {
      postData[type] = { id: data.id, name: data.name };
    }
    this.setState({
      postData,
    });
  }
  handleOk() {
    cancel();
    return new Promise(async (resolve, reject) => {
      try {
        await this.formRef.current?.validateFields();
        const ai = addInventory(this.state.postData);
        cancel = ai.cancel;
        const res = await ai.data;
        resolve(res);
        this.props.toggleVisible(false);
        this.onReset();
      } catch (e) {
        reject(e);
      }
    });
  }
  handleCancel() {
    this.props.toggleVisible(false);
    this.onReset();
  }
  onReset() {
    this.formRef.current?.resetFields();
  }
  handleValueChange(changedValues: any, allValues: any) {
    const postData: any = {
      ...this.state.postData,
    };
    for (const [key, value] of Object.entries(allValues)) {
      if (!excludeKeys.some((k) => k === key)) {
        postData[key] = value;
      }
    }
    this.setState({
      postData,
    });
  }
  render() {
    const { visible, t } = this.props;
    const { confirmLoading } = this.state;
    return (
      <Modal
        title={t("addInventory")}
        visible={visible}
        onOk={this.handleOk.bind(this)}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel.bind(this)}
      >
        <Form
          ref={this.formRef}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onValuesChange={this.handleValueChange.bind(this)}
        >
          {this.formItems.map((item: any, i) => (
            <Form.Item
              name={item.name}
              key={i}
              label={t(item.label)}
              rules={item.rules}
              {...(item.props ?? {})}
            >
              {item.children}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    );
  }
}

export default withTranslation()(AddGoods);
