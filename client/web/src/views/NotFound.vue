<template>
  <v-card elevation="2" outlined shaped>
    <v-card-title>抱歉！页面无法访问……</v-card-title>
    <v-card-subtitle> 可能因为： </v-card-subtitle
    ><v-card-subtitle>
      网址有错误>请检查地址是否完整或存在多余字符
    </v-card-subtitle>
    <v-card-subtitle>网址已失效>可能页面已删除等</v-card-subtitle>
    <v-card-actions>
      <v-btn
        v-for="(item, i) in actions"
        :key="i"
        color="blue"
        text
        @click="goTo(item.path)"
      >
        {{ item.title }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { routeTo } from "@/utils/public";

@Component({})
export default class NotFound extends Vue {
  actions = [
    {
      title: "回到首页",
      path: "/",
    },
    {
      title: "返回上一级",
      path: -1,
    },
  ];
  goTo(path: string | -1): void {
    routeTo(path);
  }
}
</script>

<style scoped></style>
