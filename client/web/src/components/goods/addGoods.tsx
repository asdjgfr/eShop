import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { withTranslation, WithTranslation } from "react-i18next";
import { priceFormatter } from "@/lib/pubfn";
import Supplier from "@/components/goods/Supplier";
import TypesOfGoods from "@/components/goods/TypesOfGoods";
import Unit from "@/components/goods/Unit";

interface iProps extends WithTranslation {
  visible: boolean;
  toggleVisible: (arg: boolean) => void;
}
interface iState {
  confirmLoading: boolean;
  postData: any;
}

const excludeKeys = ["supplier", "unit", "goodsTypes"];
class AddGoods extends React.Component<iProps, iState> {
  formRef = React.createRef<FormInstance>();
  state: iState = {
    confirmLoading: false,
    postData: {},
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
      noStyle: true,
      rules: [{ required: true }],
      children: (
        <Supplier
          onChangeSupplier={this.handleChangePostData.bind(this)}
          canCreated={true}
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
        />
      ),
    },
    {
      name: "inventory",
      label: "inventory",
      rules: [{ required: true }],
      props: {
        initialValue: 1,
      },
      children: <InputNumber min={1} precision={0} />,
    },
    {
      name: "costPrice",
      label: "costPrice",
      rules: [{ required: true }],
      props: {
        initialValue: 0.0_0,
      },
      children: <InputNumber min={0} precision={2} />,
    },
    {
      name: "sellingPrice",
      label: "sellingPrice",
      rules: [{ required: true }],
      props: {
        initialValue: 0.0_0,
      },
      children: <InputNumber min={0} precision={2} />,
    },
    {
      name: "guidePrice",
      label: "guidePrice",
      rules: [{ required: true }],
      props: {
        initialValue: 0.0_0,
      },
      children: <InputNumber min={0} precision={2} />,
    },
    {
      name: "minPackages",
      label: "minPackages",
      rules: [{ required: true }],
      props: {
        initialValue: 1,
      },
      children: <InputNumber min={1} precision={0} />,
    },
  ];
  handleChangePostData(data: { id: number; name: string }, type: string) {
    const postData: any = {
      ...this.state.postData,
    };
    postData[type] = { id: data.id, name: data.name };
    this.setState({
      postData,
    });
  }
  handleOk() {
    return this.formRef.current
      ?.validateFields()
      .then(() => {
        console.log(this.state.postData);
        this.props.toggleVisible(false);
        this.onReset();
      })
      .catch(function (e) {
        console.log(e);
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
