import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import {
  Modal,
  Steps,
  Upload,
  Divider,
  Typography,
  Space,
  Checkbox,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import XLSX from "xlsx";

interface iProps extends WithTranslation {
  title: string;
  accept: string;
  buttonText?: string;
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}
interface iState {
  loading: boolean;
  visible: boolean;
  isUTF8: boolean;
  current: number;
  fileList: any[];
}

const { Text } = Typography;
const { Dragger } = Upload;
const { Step } = Steps;
class ImportExcel extends React.Component<iProps, iState> {
  state = {
    isUTF8: true,
    loading: false,
    visible: false,
    current: 0,
    fileList: [],
  };
  handleOk() {
    if (this.props.onOk) {
      this.props.onOk();
    }
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.setState({
        loading: false,
      });
      this.props.onCancel();
    }
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
    const { fileList } = this.state;
    const xlsArr = [];
    for (let i = 0; i < fileList.length; i++) {
      const { file } = fileList[i];
      const fileReader = new FileReader();
      const workbook = await new Promise((resolve) => {
        fileReader.onload = (ev) => {
          try {
            resolve(
              Object.values(
                XLSX.read(
                  ev.target?.result,
                  this.state.isUTF8
                    ? {
                        type: "binary",
                      }
                    : { type: "binary", codepage: 936 }
                ).Sheets
              ).map((sheet) => XLSX.utils.sheet_to_json(sheet))
            );
          } catch (e) {
            resolve([]);
          }
        };
        fileReader.readAsBinaryString(file);
      });

      xlsArr.push(workbook);
    }
    console.log(xlsArr);
  }, 400);
  handleToggleUTF8(e: any) {
    this.setState({
      isUTF8: !e.target.checked,
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
    const { visible, current, fileList } = this.state;
    const { title, t, accept } = this.props;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk.bind(this)}
        onCancel={this.handleCancel.bind(this, false)}
      >
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
        <Checkbox
          checked={!this.state.isUTF8}
          onChange={this.handleToggleUTF8.bind(this)}
        >
          {t("tryEncodeUTF8")}
        </Checkbox>
        <Divider />
        <Steps direction="vertical" size="small" current={current}>
          <Step
            title={t("selectedFiles")}
            description={
              <Space direction="vertical">
                {fileList.map((file: any) => (
                  <Text key={file.uid}>{file.name}</Text>
                ))}
              </Space>
            }
          />
          <Step title="In Progress" />
          <Step title="Waiting" />
        </Steps>
      </Modal>
    );
  }
}

export default withTranslation()(ImportExcel);
