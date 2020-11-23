import React from "react";
import { Table } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";

interface iProps extends WithTranslation {}
interface iState {}

class OperationRecord extends React.Component<iProps, iState> {
  render() {
    const { t } = this.props;

    return (
      <>
        <Table
          columns={[
            {
              title: t("operationRecord"),
              dataIndex: "details",
              key: "details",
            },
            {
              title: t("actionTime"),
              dataIndex: "time",
              key: "time",
            },
          ]}
          dataSource={[]}
        />
      </>
    );
  }
}

export default withTranslation()(OperationRecord);
