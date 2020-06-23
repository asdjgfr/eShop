<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-card class="box-card">
      <div slot="header">
        <span>维修工单</span>
      </div>
      <div>
        <el-divider content-position="left">工单信息</el-divider>
      </div>
    </el-card>
  </el-form>
  <!--  <v-card outlined>-->
  <!--    <v-subheader>维修工单</v-subheader>-->
  <!--    <v-divider></v-divider>-->
  <!--    <v-form ref="form" v-model="valid" lazy-validation>-->
  <!--      <v-container>-->
  <!--        <v-subheader>工单信息</v-subheader>-->
  <!--        <v-row>-->
  <!--          <v-col cols="12" md="3">-->
  <!--            <v-text-field-->
  <!--              label="工单号"-->
  <!--              required-->
  <!--              v-model="order"-->
  <!--              append-icon="fa fa-search"-->
  <!--              @click:append="handleSearchOrder"-->
  <!--              :readonly="true"-->
  <!--            >-->
  <!--            </v-text-field>-->
  <!--          </v-col>-->
  <!--          <v-col cols="12" md="3">-->
  <!--            <v-autocomplete-->
  <!--              v-model="source"-->
  <!--              :items="sourceTree"-->
  <!--              light-->
  <!--              no-data-text="没有找到历史来源"-->
  <!--              prepend-icon="fa fa-plus"-->
  <!--              @click:prepend="handleAddSource"-->
  <!--              @change="handleChangeSource"-->
  <!--              label="客户来源"-->
  <!--            ></v-autocomplete>-->
  <!--          </v-col>-->
  <!--          <v-col cols="12" md="3">-->
  <!--            <v-select-->
  <!--              v-model="repairType"-->
  <!--              :items="repairTypes"-->
  <!--              label="维修类型"-->
  <!--              multiple-->
  <!--            >-->
  <!--              <template v-slot:selection="{ item, index }">-->
  <!--                <v-chip v-if="index < 3">-->
  <!--                  <span>{{ item }}</span>-->
  <!--                </v-chip>-->
  <!--                <span v-if="index === 3" class="grey&#45;&#45;text caption"-->
  <!--                  >(+{{ repairType.length - 3 }} 以及更多)</span-->
  <!--                >-->
  <!--              </template>-->
  <!--            </v-select>-->
  <!--          </v-col>-->
  <!--          <v-col cols="12" md="12">-->
  <!--            <v-textarea v-model="remarks" label="备注"></v-textarea>-->
  <!--          </v-col>-->
  <!--        </v-row>-->
  <!--        <v-subheader>车主车辆信息</v-subheader>-->
  <!--        <v-row>-->
  <!--          <v-col cols="12" md="3">-->
  <!--            <v-text-field-->
  <!--              label="车牌号"-->
  <!--              required-->
  <!--              v-model="numberPlate"-->
  <!--              @click:append="handleSearchOrder"-->
  <!--            >-->
  <!--            </v-text-field>-->
  <!--          </v-col>-->
  <!--          <v-col cols="12" md="3">-->
  <!--            <v-select v-model="car" :items="cars" label="车系"> </v-select>-->
  <!--          </v-col>-->
  <!--          <v-col cols="12" md="3">-->
  <!--            <v-text-field label="VIN" required v-model="VIN"> </v-text-field>-->
  <!--          </v-col>-->
  <!--          <v-col cols="12" md="3">-->
  <!--            <v-text-field label="车主姓名" required v-model="ownerName">-->
  <!--            </v-text-field>-->
  <!--          </v-col>-->
  <!--          <v-col cols="12" md="3">-->
  <!--            <v-text-field-->
  <!--              label="车主手机"-->
  <!--              :counter="11"-->
  <!--              required-->
  <!--              v-model="phone"-->
  <!--            >-->
  <!--            </v-text-field>-->
  <!--          </v-col>-->
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
import { v1 as uuidv1 } from "uuid";
export default {
  name: "RepairWorkOrder",
  data() {
    return {
      headers: [
        {
          text: "序号",
          value: "index"
        },
        { text: "配件代码", value: "code" },
        { text: "配件名称", value: "name", sortable: false },
        { text: "数量", value: "count" },
        { text: "单价", value: "unitPrice" },
        { text: "折扣（%）", value: "discount" },
        { text: "金额", value: "price" },
        { text: "操作", value: "action", sortable: false }
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
      valid: true,
      dialog: false,
      remarks: "",
      order: "",
      source: "",
      tmpSource: "",
      numberPlate: "",
      VIN: "",
      car: "",
      ownerName: "",
      phone: "",
      mileage: "",
      cars: ["a"],
      repairType: [],
      sourceTree: [],
      repairTypes: ["a", "a3", "a2", "a1"],
      form: { uuidv1 }
    };
  },
  computed: {},
  methods: {
    handleSearchOrder() {
      alert();
    },
    handleAddSource() {
      alert(this.tmpSource);
    },
    handleChangeSource(val) {
      this.tmpSource = val;
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
