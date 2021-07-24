<template>
  <div class="setting-box">
    <div class="form-wrapper">
      <div v-for="(item, index) in carouselConfig" :key="index" class="form-list">
        <div class="in">
          <el-row>
            <el-col :span="4">
              <div class="button-box">
                <template v-if="index === carouselConfig.length - 1">
                  <el-button
                    circle
                    class="plus"
                    icon="el-icon-plus"
                    size="medium"
                    type="primary"
                    @click="onAddFormItem"
                  />
                </template>
                <template v-if="index">
                  <el-button
                    circle
                    class="del"
                    icon="el-icon-minus"
                    size="medium"
                    type="danger"
                    @click="onDeleteFormItem(index)"
                  />
                </template>
              </div>
            </el-col>
            <el-col :span="20">
              <el-row class="d-flex align-items-center">
                <el-col :span="3">
                  <label>数据表:</label>
                </el-col>
                <el-col :span="4">
                  <el-select
                    v-model="item.resourceId"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="数据表"
                  >
                    <el-option
                      v-for="(resource, resourceIndex) in resourceIdOptions"
                      :key="resourceIndex"
                      :disabled="item.disabled"
                      :label="resource.name"
                      :value="resource.id"
                    />
                  </el-select>
                </el-col>
                <el-col :span="3">
                  <label>图片:</label>
                </el-col>
                <el-col :span="4">
                  <el-upload
                    list-type="picture"
                    :action="carouselAction"
                    :auto-upload="true"
                    :on-success="(resp,file,fileList)=>{carouselSuccess(resp,file,fileList,item)}"
                    :on-remove="carouselRemove"
                  >
                    <el-button
                      v-if="!item.url"
                      size="small"
                      type="primary"
                      icon="el-icon-upload"
                    >点击上传</el-button>
                  </el-upload>
                </el-col>
                <el-col :span="3">
                  <el-checkbox 
                  v-model="useSQL"
                  >使用sql组件</el-checkbox>
                </el-col>
              </el-row>
              <el-row  class="sql">
              <el-col v-if="useSQL==false">
                <el-col :span="4" >
                  <label>SQL数据源:</label>
                </el-col>
                <el-col :span="14">
                  <div class="sql">
                    <el-input v-model="item.sql" />
                  </div>
                </el-col>
              </el-col>
              <el-col v-else-if="useSQL==true">
                 <sql></sql>
             </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resources } from "../api/config";
import sql from "./sqlcomponents.vue";
export default {
  props: ["projectId"],
  data() {
    return {
      useSQL: false,
      carouselAction: "http://101.37.20.199:8080/image",
      carouselConfig: [
        {
          resourceId: "",
          url: "",
          sql: "",
        },
      ],
      resourceIdOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
    };
  },
  components: {
    sql,
  },
  computed: {},
  watch: {
    projectId(n) {
      if (n) {
        this.getResources();
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    carouselSuccess(response, file, fileList, item) {
      item.url = "http://101.37.20.199:22000/" + response.fullPath;
    },
    carouselRemove() {},
    getResources() {
      resources(this.projectId).then((response) => {
        this.resourceIdOptions = response.data;
      });
    },
    onAddFormItem() {
      this.carouselConfig.push({
        resourceId: 123456,
        table: "",
        keyword: "",
        url: "",
        sql: "",
      });
    },
    onDeleteFormItem(index) {
      this.carouselConfig.splice(index, 1);
    },
    },
};
</script>

<style scoped>
@import "../assets/css/align-center.css";
@import "../assets/css/carousel.css";

</style>
