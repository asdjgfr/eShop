import React from "react";
import { Table } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import { getLogs } from "@/api/log";
import { UAParser } from "ua-parser-js";
import { WarningTwoTone, InfoCircleTwoTone } from "@ant-design/icons";

interface iProps extends WithTranslation {}
interface iLog {
  level: string;
  path: string;
  username: string;
  ip: string;
  description: string;
  time: string;
}
interface iPagination {
  current: number;
  pageSize: number;
  total: number;
}
interface iState {
  loading: boolean;
  logs: iLog[];
  pagination: iPagination;
}
let cancel = () => {};
class OperationRecord extends React.Component<iProps, iState> {
  state: iState = {
    loading: true,
    logs: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  };
  async getLogs(pagination?: any) {
    const page = pagination
      ? pagination.current
      : this.state.pagination.current;
    const pageSize = pagination
      ? pagination.pageSize
      : this.state.pagination.pageSize;
    this.setState({
      loading: true,
    });
    const { t } = this.props;
    cancel();
    const gl = getLogs({
      page,
      pageSize,
    });
    cancel = gl.cancel;
    const res = await gl.data;
    const p = {
      current: page,
      pageSize,
      total: res?.total ?? 0,
    };
    this.setState({
      loading: false,
      logs: Array.isArray(res.logs)
        ? res.logs.map((log: any) => {
            const ua: any = new UAParser(log.ua).getResult();
            return {
              ...log,
              key: Math.random(),
              browser:
                (ua.browser.name ?? t("unknown")) + (ua.browser.version ?? ""),
              cpu: ua.cpu.architecture ?? t("unknown"),
              os: (ua.os.name ?? t("unknown")) + (ua.os.version ?? ""),
            };
          })
        : [],
      pagination: p,
    });
  }
  componentDidMount() {
    this.getLogs();
  }

  render() {
    const { t } = this.props;
    const { logs, loading, pagination } = this.state;
    return (
      <>
        <Table
          columns={[
            {
              title: t("level"),
              dataIndex: "level",
              key: "level",
              render: (level) => {
                let icon = <InfoCircleTwoTone />;
                switch (level) {
                  case "info":
                    icon = <InfoCircleTwoTone />;
                    break;
                  case "warn":
                    icon = <WarningTwoTone twoToneColor="orange" />;
                    break;
                }
                return icon;
              },
            },
            {
              title: t("operationUser"),
              dataIndex: "username",
              key: "username",
            },
            {
              title: t("ip"),
              dataIndex: "ip",
              key: "ip",
            },
            {
              title: t("browserInfo"),
              dataIndex: "browser",
              key: "browser",
            },
            {
              title: t("cpuInfo"),
              dataIndex: "cpu",
              key: "cpu",
            },
            {
              title: t("osInfo"),
              dataIndex: "os",
              key: "os",
            },
            {
              title: t("description"),
              dataIndex: "description",
              key: "description",
            },
            {
              title: t("path"),
              dataIndex: "path",
              key: "path",
            },
            {
              title: t("time"),
              dataIndex: "time",
              key: "time",
            },
          ]}
          dataSource={logs}
          loading={loading}
          pagination={pagination}
          scroll={{ x: "max-content" }}
          onChange={this.getLogs.bind(this)}
        />
      </>
    );
  }
}

export default withTranslation()(OperationRecord);
