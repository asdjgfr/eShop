import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Modal, Upload, Spin, Result, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import XLSX from "xlsx";

interface iProps extends WithTranslation {
  title: string;
  accept: string;
  buttonText?: string;
  visible: boolean;
  onOk?: (formatList: any[]) => void;
  onCancel?: () => void;
  loading: boolean;
}
interface iState {
  spinLoading: boolean;
  visible: boolean;
  current: number;
  percent: number;
  fileList: any[];
  formatList: any[];
}

const { Dragger } = Upload;
class ImportExcel extends React.Component<iProps, iState> {
  state = {
    spinLoading: false,
    visible: false,
    current: 0,
    percent: 0,
    fileList: [],
    formatList: [],
  };
  async handleOk() {
    if (this.props.onOk) {
      await this.props.onOk(this.state.formatList.flat(2));
    }
    this.reset();
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
      this.reset();
    }
  }
  reset() {
    this.setState({
      spinLoading: false,
      visible: false,
      current: 0,
      percent: 0,
      fileList: [],
      formatList: [],
    });
  }
  handleChange(file: any, fileList: any) {
    this.formatExcel();
    this.setState({
      fileList: fileList.map((file: any) => ({
        uid: file.uid,
        name: file.name,
        finished: false,
        file,
      })),
    });
    return false;
  }
  formatExcel = debounce(async () => {
    this.setState({
      spinLoading: true,
    });
    const { fileList } = this.state;
    const formatList = [];
    const len = fileList.length;
    for (let i = 0; i < len; i++) {
      const { file } = fileList[i];
      const fileReader = new FileReader();
      const workbook = await new Promise((resolve) => {
        fileReader.onload = (ev) => {
          try {
            resolve(
              Object.values(
                XLSX.read(ev.target?.result, {
                  type: "binary",
                }).Sheets
              ).map((sheet) => XLSX.utils.sheet_to_json(sheet))
            );
          } catch (e) {
            resolve([]);
          }
        };
        fileReader.readAsBinaryString(file);
      });
      this.setState({
        percent: Number((((i + 1) / len) * 100).toFixed(2)),
      });
      formatList.push(workbook);
    }
    this.setState({
      spinLoading: false,
      percent: 0,
    });
    this.setState({
      formatList,
    });
  }, 400);
  handleClear() {
    this.setState({
      formatList: [],
    });
  }
  componentDidUpdate(
    prevProps: Readonly<iProps>,
    prevState: Readonly<iState>,
    snapshot?: any
  ) {
    if (this.props.visible !== this.state.visible) {
      this.setState({
        visible: this.props.visible,
      });
    }
  }
  render() {
    const { visible, percent, spinLoading, formatList } = this.state;
    const { title, t, accept, loading } = this.props;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this, false)}
        confirmLoading={loading}
      >
        <Spin tip={percent + "%"} spinning={spinLoading}>
          {formatList.length ? (
            <Result
              status="success"
              title={`${t("resolvedSuccessfully")} ${formatList.length} ${t(
                "files"
              )} ${formatList.reduce(
                (pre: number, cur: any[]) => cur.flat(1).length + pre,
                0
              )} ${t("data")}`}
              extra={
                <Button
                  type="primary"
                  danger={true}
                  onClick={this.handleClear.bind(this)}
                >
                  {t("clear")}
                </Button>
              }
            />
          ) : (
            <>
              <Dragger
                multiple={true}
                beforeUpload={this.handleChange.bind(this)}
                accept={accept}
                fileList={[]}
                itemRender={() => null}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">{t("clickOrDragFile")}</p>
              </Dragger>
            </>
          )}
        </Spin>
      </Modal>
    );
  }
}

export default withTranslation()(ImportExcel);
