<template>
  <el-card class="box-card">
    <div slot="header">
      <span>维修工单</span>
    </div>
    <el-form ref="form" :model="form" :label-width="labelWidth" :inline="true">
      <el-divider content-position="left">工单信息</el-divider>
      <el-form-item label="工单号">
        {{ form.order }}
      </el-form-item>
      <el-form-item label="客户来源">
        <el-select
          v-model="form.source"
          multiple
          filterable
          allow-create
          default-first-option
          collapse-tags
          placeholder="请选择客户来源"
          @visible-change="handleGetSelector('source', $event)"
          :loading="sourceLoading"
        >
          <el-option
            v-for="item in sourceTree"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
            <el-button
              style="float: right;margin-right: 20px"
              type="danger"
              size="small"
              icon="el-icon-delete"
              round
              @click.stop="delSelector('source', item.value)"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修类型">
        <el-select
          v-model="form.repairTypes"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择维修类型"
          @visible-change="handleGetSelector('repair', $event)"
          :loading="repairTypeLoading"
        >
          <el-option
            v-for="item in repairTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.value }}</span>
            <el-button
              style="float: right;margin-right: 20px"
              type="danger"
              size="small"
              icon="el-icon-delete"
              round
              @click.stop="delSelector('repair', item.value)"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <div class="form-inline-100">
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.remarks"
          >
          </el-input>
        </el-form-item>
      </div>
      <el-divider content-position="left">车主车辆信息</el-divider>
      <el-form-item label="车牌号">
        <el-input
          v-model="form.numberPlate"
          placeholder="请输入车牌号"
        ></el-input>
      </el-form-item>
      <el-form-item label="车系">
        <el-select
          v-model="form.car"
          filterable
          allow-create
          default-first-option
          placeholder="请选择车系"
          @visible-change="handleGetSelector('car', $event)"
          :loading="carsLoading"
        >
          <el-option
            v-for="item in cars"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.value }}</span>
            <el-button
              style="float: right;margin-right: 20px"
              type="danger"
              size="small"
              icon="el-icon-delete"
              round
              @click.stop="delSelector('car', item.value)"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="VIN">
        <el-input v-model="form.VIN" placeholder="请输入VIN"></el-input>
      </el-form-item>
      <el-form-item label="车主姓名">
        <el-input
          v-model="form.ownerName"
          placeholder="请输入车主姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="车主手机">
        <el-input v-model="form.phone" placeholder="请输入车主手机"></el-input>
      </el-form-item>
      <el-form-item label="进场里程">
        <el-input
          v-model="form.mileage"
          placeholder="请输入进场里程"
        ></el-input>
      </el-form-item>
      <el-divider content-position="left">维修项目</el-divider>
      <el-button type="primary" size="small" @click.stop="handleAddRepair">
        新增
      </el-button>
      <el-button
        type="danger"
        size="small"
        @click.stop="handleRemoveItem"
        :disabled="!multipleSelection.length"
      >
        删除所选
      </el-button>
      <el-table
        :data="computeDesserts"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column
          v-for="(item, i) in headers"
          :key="i"
          :prop="item.value"
          :label="item.text"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleRemoveItem(scope.row.index)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider content-position="center">
        <h1>
          总计：{{
            computeDesserts.reduce(
              (acc, cur) => Number(acc) + Number(cur.price),
              0
            )
          }}
          &emsp;元
        </h1>
      </el-divider>
      <div class="align-center">
        <el-button-group>
          <el-button size="small" type="info" icon="el-icon-printer">
            打印工单
          </el-button>
          <el-button size="small" type="primary" icon="el-icon-setting">
            本地维修历史
          </el-button>
          <el-button
            size="small"
            type="success"
            icon="el-icon-download"
            @click="handleSaveBill"
          >
            保存{{ action }}
          </el-button>
          <el-button size="small" type="danger" icon="el-icon-delete">
            作废
          </el-button>
          <el-button size="small" type="success" icon="el-icon-wallet">
            结算
          </el-button>
        </el-button-group>
      </div>
    </el-form>
    <create-repair-dialog
      :addRepairVisible.sync="addRepairVisible"
      :labelWidth="labelWidth"
      :desserts="desserts"
    />
  </el-card>
</template>

<script>
import api from "@/api/index";
import createRepairDialog from "@/pages/customerReception/createRepairDialog";
export default {
  name: "RepairWorkOrder",
  components: { createRepairDialog },
  data() {
    return {
      labelWidth: window.labelWidth,
      addRepairVisible: false,
      headers: [
        {
          text: "序号",
          value: "index"
        },
        { text: "配件代码", value: "code" },
        { text: "配件名称", value: "name" },
        { text: "数量", value: "count" },
        { text: "单价", value: "unitPrice" },
        { text: "折扣（%）", value: "discount" },
        { text: "金额", value: "price" }
      ],
      desserts: [],
      sourceLoading: true,
      repairTypeLoading: true,
      carsLoading: true,
      cars: [],
      repairTypes: [],
      sourceTree: [],
      multipleSelection: [],
      action: "工单",
      form: {
        order: `JY${new Date().getTime()}`,
        source: [],
        repairTypes: [],
        remarks: "",
        numberPlate: "",
        car: "",
        VIN: "",
        ownerName: "",
        phone: "",
        mileage: ""
      }
    };
  },
  computed: {
    computeDesserts() {
      return this.desserts.map((item, i) => ({
        ...item,
        index: i + 1,
        price: this.$math.format(
          item.count * item.unitPrice * (item.discount / 100),
          {
            notation: "fixed",
            precision: 2
          }
        )
      }));
    }
  },
  methods: {
    async handleGetSelector(type, bool) {
      if (bool) {
        let res = {};
        let dataSource = "";
        switch (type) {
          case "source":
            this.sourceLoading = true;
            res = await api.customerReception.getCustomerSource();
            dataSource = "sourceTree";
            this.sourceLoading = false;
            break;
          case "repair":
            this.repairTypeLoading = true;
            res = await api.customerReception.getRepairTypes();
            dataSource = "repairTypes";
            this.repairTypeLoading = false;
            break;
          case "car":
            this.carsLoading = true;
            res = await api.customerReception.getCars();
            dataSource = "cars";
            this.carsLoading = false;
            break;
        }

        if (res.code === 0) {
          this[dataSource] = res.data.map(r => ({
            value: r["id"],
            label: r["name"]
          }));
        }
      }
    },
    async delSelector(type, id) {
      let res = {};
      let dataSource = "";
      switch (type) {
        case "source":
          res = await api.customerReception.delCustomerSource({ id });
          dataSource = "sourceTree";
          break;
        case "repair":
          res = await api.customerReception.delRepairType({ id });
          dataSource = "repairTypes";
          break;
        case "car":
          res = await api.customerReception.delCar({ id });
          dataSource = "cars";
          break;
      }

      if (res.code === 0) {
        this.$message({
          type: "success",
          message: res.msg
        });
        this.$_.remove(this[dataSource], function(type) {
          return type.value === id;
        });
        this.$forceUpdate();
      }
    },
    handleAddRepair() {
      this.addRepairVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleRemoveItem(index) {
      if (isNaN(Number(index))) {
        this.multipleSelection
          .sort((s1, s2) => s2.index - s1.index)
          .forEach(item => {
            this.desserts.splice(item.index - 1, 1);
          });
      } else {
        this.desserts.splice(index - 1, 1);
      }
    },
    async handleSaveBill() {
      const loading = this.$loading({
        lock: true,
        fullscreen: true,
        text: "保存中，请稍后。。。",
        spinner: "el-icon-loading"
      });
      const res = await api.customerReception.saveBill(
        this.$_.cloneDeep({ ...this.form, maintenanceItems: this.desserts })
      );
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: res.msg
        });
      } else {
        this.$message.error(res.msg);
      }
      loading.close();
    }
  }
};
</script>

<style scoped></style>
