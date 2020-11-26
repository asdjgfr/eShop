import React from "react";
import { Table } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import { getLogs } from "@/api/log";
import { UAParser } from "ua-parser-js";

interface iProps extends WithTranslation {}
interface iLog {
  level: string;
  path: string;
  username: string;
  ip: string;
  description: string;
  time: string;
}
interface iState {
  page: number;
  logs: iLog[];
}
let cancel = () => {};
class OperationRecord extends React.Component<iProps, iState> {
  state: iState = {
    page: 1,
    logs: [],
  };
  async getLogs() {
    const { t } = this.props;
    cancel();
    const gl = getLogs({ page: this.state.page, pageSize: 20 });
    cancel = gl.cancel;
    const res = await gl.data;

    const logs = this.state.logs;
    res.logs.forEach((log: any) => {
      const ua: any = new UAParser(log.ua).getResult();
      logs.push({
        key: Math.random(),
        ...log,
        browser: (ua.browser.name ?? t("unknown")) + (ua.browser.version ?? ""),
        cpu: ua.cpu.architecture ?? t("unknown"),
        os: (ua.os.name ?? t("unknown")) + (ua.os.version ?? ""),
      });
    });

    this.setState({
      logs,
    });
  }
  componentDidMount() {
    this.getLogs();
  }

  render() {
    const { t } = this.props;
    const { logs } = this.state;
    console.log(logs);
    return (
      <>
        <Table
          columns={[
            {
              title: t("level"),
              dataIndex: "level",
              key: "level",
            },
            {
              title: t("path"),
              dataIndex: "path",
              key: "path",
            },
            {
              title: t("username"),
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
              title: t("time"),
              dataIndex: "time",
              key: "time",
            },
          ]}
          dataSource={logs}
        />
      </>
    );
  }
}

export default withTranslation()(OperationRecord);
