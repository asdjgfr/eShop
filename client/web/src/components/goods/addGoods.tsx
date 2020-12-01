import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { withTranslation, WithTranslation } from "react-i18next";
import { priceFormatter } from "@/lib/pubfn";
import Supplier from "@/components/goods/Supplier";

interface iProps extends WithTranslation {
  visible: boolean;
  toggleVisible: (arg: boolean) => void;
}
interface iState {
  confirmLoading: boolean;
  postData: {
    supplier: {
      id: number | undefined;
      name: string;
    };
  };
}

class AddGoods extends React.Component<iProps, iState> {
  formRef = React.createRef<FormInstance>();
  state: iState = {
    confirmLoading: false,
    postData: {
      supplier: {
        id: undefined,
        name: "",
      },
    },
  };
  formItems = [
    {
      name: "name",
      label: "goodsName",
      rules: [{ required: true }],
      children: <Input />,
    },
    {
      name: "supplier",
      label: "supplier",
      rules: [{ required: true }],
      children: (
        <Supplier onChangeSupplier={this.handleChangeSupplier.bind(this)} />
      ),
    },
    {
      name: "typesOfGoods",
      label: "typesOfGoods",
      rules: [{ required: true }],
      children: <Input />,
    },
    {
      name: "unit",
      label: "unit",
      rules: [{ required: true }],
      children: <Input />,
    },
    {
      name: "inventory",
      label: "inventory",
      rules: [{ required: true }],
      children: <InputNumber min={0} />,
    },
    {
      name: "costPrice",
      label: "costPrice",
      rules: [{ required: true }],
      children: <InputNumber min={0} step={0.01} />,
    },
    {
      name: "sellingPrice",
      label: "sellingPrice",
      rules: [{ required: true }],
      children: <InputNumber min={0} step={0.01} />,
    },
    {
      name: "guidePrice",
      label: "guidePrice",
      rules: [{ required: true }],
      children: <InputNumber min={0} step={0.01} />,
    },
    {
      name: "minPackages",
      label: "minPackages",
      rules: [{ required: true }],
      children: <InputNumber min={1} step={0} />,
    },
  ];
  handleChangeSupplier(data: { id: number; name: string }) {
    this.setState({
      postData: {
        ...this.state.postData,
        supplier: { id: data.id, name: data.name },
      },
    });
  }
  handleOk() {
    this.props.toggleVisible(false);
    this.onReset();
  }
  handleCancel() {
    this.props.toggleVisible(false);
    this.onReset();
  }
  onReset() {
    this.formRef.current?.resetFields();
  }
  handleValueChange(changedValues: any, allValues: any) {
    console.log(changedValues, allValues);
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
          name="control-ref"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onValuesChange={this.handleValueChange.bind(this)}
        >
          {this.formItems.map((item: any, i) => (
            <Form.Item
              key={i}
              name={item.name}
              label={t(item.label)}
              rules={item.rules}
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
