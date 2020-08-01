<template>
  <el-card class="box-card">
    <div slot="header">
      <span v-text="`维修工单 - ${form.order}`"></span>
    </div>
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      :label-width="labelWidth"
      :inline="true"
    >
      <el-divider content-position="left">工单信息</el-divider>
      <el-form-item label="工单号">
        {{ form.order }}
      </el-form-item>
      <el-form-item label="客户来源" prop="source">
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
              icon="el-icon-delete"
              round
              @click.stop="delSelector('source', item.value)"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修类型" prop="repairTypes">
        <el-select
          v-model="form.repairTypes"
          multiple
          filterable
          allow-create
          default-first-option
          collapse-tags
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
      <el-form-item label="车牌号" prop="numberPlate">
        <number-plate
          :numberPlate.sync="form.numberPlate"
          :handleSelectNumberPlate="handleSelectNumberPlate"
        />
      </el-form-item>
      <el-form-item label="车系" prop="car">
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
              icon="el-icon-delete"
              round
              @click.stop="delSelector('car', item.value)"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="VIN" prop="VIN">
        <el-input
          v-model="form.VIN"
          placeholder="请输入VIN"
          maxlength="17"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="车主姓名" prop="ownerName">
        <el-input
          v-model="form.ownerName"
          placeholder="请输入车主姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="车主手机" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="请输入车主手机"
          maxlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="进场里程" prop="mileage">
        <el-input-number
          v-model="form.mileage"
          :step="1"
          :min="0"
          placeholder="请输入进场里程"
        />
      </el-form-item>
      <el-divider content-position="left">维修项目</el-divider>
      <el-button type="primary" @click.stop="handleAddRepair">
        新增
      </el-button>
      <el-button
        type="danger"
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
            <el-button type="text" @click="handleRemoveItem(scope.row.index)">
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
          <el-button type="info" icon="el-icon-printer" @click="handlePrint">
            打印工单
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-setting"
            @click="drawerVisible = true"
          >
            本地维修历史
          </el-button>
          <el-button
            type="success"
            icon="el-icon-download"
            @click="handleSaveBill"
          >
            保存{{ action }}
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            :disabled="id === ''"
            @click="handleDelBill"
          >
            作废
          </el-button>
          <el-button
            type="success"
            icon="el-icon-wallet"
            :disabled="id === '' || form.finished"
            @click="handleSaveBill(true)"
          >
            {{ form.finished ? "已结算" : "结算" }}
          </el-button>
        </el-button-group>
      </div>
    </el-form>
    <create-repair-dialog
      :addRepairVisible.sync="addRepairVisible"
      :labelWidth="labelWidth"
      :desserts="desserts"
      :notIn="computeDesserts.map(item => item.code)"
      :handleSaveBill="handleSaveBill"
    />
    <el-drawer
      title="本地维修历史"
      :with-header="false"
      :visible.sync="drawerVisible"
      direction="ltr"
      size="70%"
    >
      <query-bills
        v-if="drawerVisible"
        :numberPlate="form.numberPlate"
        :VIN="form.VIN"
        :phone="form.phone"
        :autoQuery="true"
        :drawerVisible.sync="drawerVisible"
      />
    </el-drawer>
  </el-card>
</template>

<script>
import api from "@/api/index";
import createRepairDialog from "@/pages/customerReception/createRepairDialog";
import QueryBills from "@/components/QueryBills";
import NumberPlate from "@/components/NumberPlate";
export default {
  name: "RepairWorkOrder",
  inject: ["reload", "labelWidth"],
  components: { createRepairDialog, QueryBills, NumberPlate },
  data() {
    return {
      id: "",
      addRepairVisible: false,
      drawerVisible: false,
      headers: [
        {
          text: "序号",
          value: "index"
        },
        { text: "配件代码", value: "code" },
        { text: "配件名称", value: "name" },
        { text: "数量", value: "count" },
        { text: "单价", value: "sellingPrice" },
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
      rules: {
        source: [
          { required: true, message: "请选择客户来源", trigger: "change" }
        ],
        repairTypes: [
          { required: true, message: "请选择维修类型", trigger: "change" }
        ],
        numberPlate: [
          { required: true, message: "请输入车牌号", trigger: "change" }
        ],
        car: [{ required: true, message: "请选择车系", trigger: "change" }],
        VIN: [
          { required: true, message: "请输入VIN", trigger: "change" },
          { min: 17, max: 17, message: "输入17位VIN", trigger: "change" }
        ],
        ownerName: [
          { required: true, message: "请输入车主姓名", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { min: 11, max: 11, message: "输入11位手机号", trigger: "change" }
        ],
        mileage: [
          { required: true, message: "请输入进场里程", trigger: "change" }
        ]
      },
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
        mileage: 0,
        finished: false
      }
    };
  },
  computed: {
    computeDesserts() {
      return this.desserts.map((item, i) => ({
        ...item,
        index: i + 1,
        price: this.$_math.format(
          item.count * item.sellingPrice * (item.discount / 100),
          {
            notation: "fixed",
            precision: 2
          }
        )
      }));
    }
  },
  watch: {
    $route() {
      this.initBill();
    }
  },
  created() {
    this.initBill();
  },
  methods: {
    async handlePrint() {
      const saveBill = await this.handleSaveBill();
      if (saveBill === false) {
        return saveBill;
      }
      let routeData = this.$router.resolve({
        path: "/print-bill",
        query: { id: saveBill.id }
      });
      window.open(routeData.href, "_blank");
    },
    handleSelectNumberPlate(select) {
      Object.keys(select.item).forEach(key => {
        this.$set(this.form, key, select.item[key]);
      });
    },
    initBill() {
      const { id } = this.$route.query;
      if (id) {
        this.id = id;
        this.handleLoadBill(id);
        this.action = "修改";
      }
    },
    async handleLoadBill(id) {
      window.globalLoading({
        lock: true,
        fullscreen: true,
        text: "查询中，请稍后。。。",
        spinner: "el-icon-loading"
      });
      const res = await api.customerReception.queryBill({ id });
      if (res.code === 0) {
        this.initData(res.data);
      }
    },
    initData(data) {
      const { form } = this;
      Object.keys(form).forEach(key => {
        this.$set(form, key, data[key]);
      });
      this.desserts = data.maintenanceItems;
    },
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
            value: r["name"],
            label: r["name"]
          }));
        }
      }
    },
    async delSelector(type, name) {
      let res = {};
      let dataSource = "";
      switch (type) {
        case "source":
          res = await api.customerReception.delCustomerSource({ name });
          dataSource = "sourceTree";
          break;
        case "repair":
          res = await api.customerReception.delRepairType({ name });
          dataSource = "repairTypes";
          break;
        case "car":
          res = await api.customerReception.delCar({ name });
          dataSource = "cars";
          break;
      }

      if (res.code === 0) {
        this.$message({
          type: "success",
          message: res.msg
        });
        this.$_.remove(this[dataSource], function(type) {
          return type.value === name;
        });
        this.$forceUpdate();
      }
    },
    handleAddRepair() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.addRepairVisible = true;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleRemoveItem(index) {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (isNaN(Number(index))) {
            this.multipleSelection
              .sort((s1, s2) => s2.index - s1.index)
              .forEach(item => {
                this.desserts.splice(item.index - 1, 1);
              });
          } else {
            this.desserts.splice(index - 1, 1);
          }
          this.handleSaveBill();
        }
      });
    },
    handleSaveBill(finished = false) {
      finished = finished === true;
      if (finished) {
        const c = confirm("确认结账？");
        if (!c) {
          return false;
        }
      }
      return new Promise(resolve => {
        this.$refs.form.validate(async valid => {
          if (valid) {
            const { id } = this;
            window.globalLoading({
              lock: true,
              fullscreen: true,
              text: "保存中，请稍后。。。",
              spinner: "el-icon-loading"
            });
            const res = await api.customerReception.saveBill(
              this.$_.cloneDeep({
                ...this.form,
                maintenanceItems: this.desserts,
                id,
                finished
              })
            );
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.$set(this.form, "finished", finished);
            } else {
              this.$message.error(res.msg);
            }
            if (id === "") {
              await this.$router.push({
                path: "/dashboard/customer-reception",
                query: { id: res.data }
              });
            }
            resolve({ id: res.data });
          } else {
            this.$message.error("请填写必填信息！");
            resolve(false);
          }
        });
      });
    },
    async handleDelBill() {
      const c = confirm("删除后不可恢复！确认删除？");
      if (!c) {
        return false;
      }
      const { id } = this;
      window.globalLoading({
        text: "删除中，请稍后。。。",
        spinner: "el-icon-loading"
      });
      const res = await api.customerReception.delBill({
        id
      });

      if (res.code === 0) {
        this.$message.success(res.msg);
        await this.$router.push({
          path: "/dashboard/customer-reception"
        });
        this.reload();
      }
    }
  }
};
</script>

<style scoped></style>
