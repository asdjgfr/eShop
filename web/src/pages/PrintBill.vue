<template>
  <div class="print-bill">
    <header>机动车维修清单</header>
    <ul class="bill-info">
      <li v-for="(item, i) in billInfo" :key="i">
        <span v-text="item.label"></span>：
        <span v-if="!Array.isArray(item.value)" v-text="item.value"></span>
        <span v-else v-text="item.value.join('，')"></span>
      </li>
    </ul>
    <hr />
    <div>
      <header class="bill-sub-header">维修材料（单位：元）</header>
      <el-table :data="tableData">
        <el-table-column
          v-for="(item, i) in tableHeader"
          :prop="item.prop"
          :label="item.label"
          :key="i"
        />
      </el-table>
      <footer class="bill-sub-footer">
        合计：&emsp;应收金额：<span v-text="receivable"></span
        >元&emsp;&emsp;实收金额：<span v-text="receipts"></span>元
      </footer>
    </div>
    <hr />
    <div>
      <header class="bill-sub-header">托修方支付费用更换的旧配件</header>
      <ul class="bill-confirm">
        <li>▢&nbsp;旧件已确认，并由托修方收回；</li>
        <li>▢&nbsp;旧件已确认，托修方声明放弃；</li>
        <li>▢&nbsp;无旧配件；</li>
      </ul>
    </div>
    <hr />
    <footer class="bill-footer">
      <div>客户签名：</div>
      <div class="bill-sign-date">
        <span>日期：</span>
        <span>年</span>
        <span>月</span>
        <span>日</span>
      </div>
    </footer>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "PrintBill",
  data() {
    return {
      id: "",
      printData: {},
      billInfo: [
        {
          label: "承修门店",
          key: "company.name",
          value: ""
        },
        {
          label: "门店地址",
          key: "company.address",
          value: ""
        },
        {
          label: "门店电话",
          key: "company.phones",
          value: ""
        },
        {
          label: "车牌号码",
          key: "numberPlate",
          value: ""
        },
        {
          label: "车系",
          key: "car",
          value: ""
        },
        {
          label: "送修人",
          key: "ownerName",
          value: ""
        },
        {
          label: "车辆识别号",
          key: "VIN",
          value: ""
        },
        {
          label: "出厂里程",
          key: "mileage",
          value: ""
        },
        {
          label: "电话",
          key: "phone",
          value: ""
        },
        {
          label: "结束时间",
          key: "updatedAt",
          value: ""
        }
      ],
      tableHeader: [
        {
          label: "配件名称",
          prop: "name"
        },
        {
          label: "配件号",
          prop: "code"
        },
        {
          label: "配件单价",
          prop: "sellingPrice"
        },
        {
          label: "配件数量",
          prop: "count"
        },
        {
          label: "配件金额",
          prop: "price"
        },
        {
          label: "优惠率（%）",
          prop: "discount"
        }
      ],
      tableData: [],
      receivable: 0,
      receipts: 0
    };
  },
  created() {
    this.initData(this.$route.query.id);
  },
  methods: {
    async initData(id) {
      window.globalLoading({
        text: "生成工单中，请稍后。。。",
        spinner: "el-icon-loading"
      });
      const res = await api.customerReception.queryBill({ id });
      if (res.code === 0) {
        const { data } = res;
        this.billInfo.forEach(item => {
          const { key } = item;
          switch (key) {
            case "company.name":
              this.$set(item, "value", data["company"].name);
              break;
            case "company.address":
              this.$set(item, "value", data["company"].address);
              break;
            case "company.phones":
              this.$set(item, "value", data["company"]["phones"]);
              break;
            case "updatedAt":
              this.$set(item, "value", this.$_localTime(data["updatedAt"]));
              break;
            default:
              this.$set(item, "value", data[key]);
              break;
          }
        });
        this.tableData = data.maintenanceItems;
        this.receipts = data.receipts;
        this.receivable = data.receivable;
        const c = await this.confirm();
        if (c) {
          window.print();
        }
      } else {
        alert("未查找到对应工单，窗口即将关闭！");
        window.close();
      }
    },
    confirm() {
      return new Promise(resolve => {
        this.$confirm("工单生成完成, 是否立即打印？", "提示", {
          confirmButtonText: "打印",
          cancelButtonText: "取消，Ctrl+P可再次调出打印预览。",
          type: "warning"
        })
          .then(() => {
            setTimeout(() => {
              resolve(true);
            }, 500);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消打印！"
            });
            resolve(false);
          });
      });
    }
  }
};
</script>

<style lang="scss" src="../css/print.scss"></style>
