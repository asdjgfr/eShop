<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-card class="box-card">
      <div slot="header">
        <span>维修工单</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :label-width="labelWidth"
        :inline="true"
      >
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
            placeholder="输入并回车可新增"
            @visible-change="handleGetSourceTree"
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
                @click.stop="delCustomerSource(item.value)"
              />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修类型">
          <el-select
            v-model="form.repairType"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="输入并回车可新增"
          >
            <el-option
              v-for="item in repairType"
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
                @click.stop
              />
            </el-option>
          </el-select>
        </el-form-item>
        <div class="form-inline-100">
          <el-form-item label="维修类型">
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
        <el-form-item label="维修类型">
          <el-input
            v-model="form.numberPlate"
            placeholder="请输入车牌号"
          ></el-input>
        </el-form-item>
        <el-form-item label="车系">
          <el-input v-model="form.car" placeholder="请输入车系"></el-input>
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
          <el-input
            v-model="form.phone"
            placeholder="请输入车主手机"
          ></el-input>
        </el-form-item>
        <el-form-item label="进场里程">
          <el-input
            v-model="form.mileage"
            placeholder="请输入进场里程"
          ></el-input>
        </el-form-item>
        <el-divider content-position="left">维修项目</el-divider>
        <el-button type="primary" size="small">新增</el-button>
        <el-button type="danger" size="small">删除所选</el-button>
        <el-table :data="desserts">
          <el-table-column type="selection"> </el-table-column>
          <el-table-column
            v-for="(item, i) in headers"
            :key="i"
            :prop="item.value"
            :label="item.text"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template>
              <el-button type="text" size="small">
                编辑
              </el-button>
              <el-button type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-divider content-position="center">
          <h1>总计：100 &emsp;元</h1>
        </el-divider>
        <div class="align-center">
          <el-button-group>
            <el-button size="small" type="info" icon="el-icon-printer">
              打印工单
            </el-button>
            <el-button size="small" type="primary" icon="el-icon-setting">
              本地维修历史
            </el-button>
            <el-button size="small" type="success" icon="el-icon-download">
              保存
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
    </el-card>
  </el-form>
  <!--  <v-card outlined>-->
  <!--    <v-subheader>维修工单</v-subheader>-->

  <!--        <v-subheader>车主车辆信息</v-subheader>-->
  <!--        <v-row>-->

  <!--          <v-col cols="12" md="3">-->
  <!--            <v-text-field label="进场里程" required v-model="mileage">-->
  <!--            </v-text-field>-->
  <!--          </v-col>-->
  <!--        </v-row>-->
  <!--        <v-subheader>-->
  <!--          维修项目-->
  <!--        </v-subheader>-->
  <!--        <div><v-btn small color="primary">新增</v-btn></div>-->
  <!--        <v-data-table :headers="headers" :items="desserts" class="elevation-1">-->
  <!--          <template v-slot:item.index="{ item }">-->
  <!--            {{ item.index }}-->
  <!--          </template>-->
  <!--          <template v-slot:item.price="{ item }">-->
  <!--            {{ item.count * item.unitPrice * item.discount }}-->
  <!--          </template>-->
  <!--          <template v-slot:item.count="{ item }">-->
  <!--            <v-text-field-->
  <!--              v-model="item.count"-->
  <!--              append-icon="fa fa-plus"-->
  <!--              prepend-icon="fa fa-minus"-->
  <!--            >-->
  <!--              {{ item.count }}-->
  <!--            </v-text-field>-->
  <!--          </template>-->
  <!--          <template v-slot:item.action="{ item }">-->
  <!--            <v-btn small color="error" @click="removeItem(item)">-->
  <!--              删除-->
  <!--            </v-btn>-->
  <!--          </template>-->
  <!--        </v-data-table>-->
  <!--      </v-container>-->
  <!--    </v-form>-->
  <!--    <v-dialog v-model="dialog" persistent max-width="290">-->
  <!--      <v-card>-->
  <!--        <v-card-title class="headline">是否删除</v-card-title>-->
  <!--        <v-card-text>删除后不可恢复！</v-card-text>-->
  <!--        <v-card-actions>-->
  <!--          <v-spacer></v-spacer>-->
  <!--          <v-btn small color="error" @click="removeItem(null, true)">-->
  <!--            删除-->
  <!--          </v-btn>-->
  <!--          <v-btn small @click="dialog = false">取消</v-btn>-->
  <!--        </v-card-actions>-->
  <!--      </v-card>-->
  <!--    </v-dialog>-->
  <!--  </v-card>-->
</template>

<script>
import api from "@/api/index";
export default {
  name: "RepairWorkOrder",
  data() {
    return {
      labelWidth: window.labelWidth,
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
      desserts: [
        {
          index: 1,
          code: 123,
          name: "阿萨德客家话",
          count: 111,
          unitPrice: 52020,
          discount: 70,
          tooltip: false
        },
        {
          index: 1,
          code: 123,
          name: "阿萨德客家话",
          count: 222,
          unitPrice: 52020,
          discount: 70,
          tooltip: false
        }
      ],
      sourceLoading: true,
      dialog: false,
      tmpSource: "",
      cars: ["a"],
      repairType: [
        {
          value: "Beijing",
          label: "北京"
        }
      ],
      sourceTree: [],
      numberPlates: ["a", "a3", "a2", "a1"],
      repairTypes: ["a", "a3", "a2", "a1"],
      form: {
        order: new Date().getTime(),
        source: [],
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
  computed: {},
  methods: {
    async handleGetSourceTree(bool) {
      if (bool) {
        this.sourceLoading = true;
        const res = await api.customerReception.getCustomerSource();
        this.sourceLoading = false;
        if (res.code === 0) {
          this.sourceTree = res.data.map(s => ({
            value: s["id"],
            label: s["name"]
          }));
        }
      }
    },
    async delCustomerSource(id) {
      const res = await api.customerReception.delCustomerSource({ id });
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: res.msg
        });
        const { sourceTree } = this;
        const index = sourceTree.findIndex(s => s.value === id);
        index > -1 && sourceTree.splice(index, 1);
      }
    },
    removeItem(item, confirm = false) {
      if (confirm) {
        const { selectItem, desserts } = this;
        desserts.splice(
          desserts.findIndex(s => s.index === selectItem.index),
          1
        );
        this.dialog = false;
      } else {
        this.selectItem = item;
        this.dialog = true;
      }
    }
  }
};
</script>

<style scoped></style>
