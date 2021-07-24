<template>
  <div class="setting-box">
    <el-row>
      <el-col :span="8" style="margin-top: 50px">
        <label>项目名称:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="basicConfig.titleCn"
          :maxlength="255"
          :style="{ width: '100%' }"
          placeholder="请输入项目名称"
          prefix-icon="el-icon-mobile"
          style="margin-top: 50px"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>项目英文名称:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="basicConfig.titleEn"
          :style="{ width: '100%' }"
          clearable
          placeholder="请输入项目英文名称"
          prefix-icon="el-icon-mobile"
          show-word-limit
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>版权:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="basicConfig.copyright"
          :style="{ width: '100%' }"
          clearable
          placeholder="请输入版权信息"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>record:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="basicConfig.record"
          :style="{ width: '100%' }"
          clearable
          placeholder="请输入record"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>domainRecord:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="basicConfig.domainRecord"
          :style="{ width: '100%' }"
          clearable
          placeholder="请输入domainRecord"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>logo:</label>
      </el-col>
      <el-col :span="7">
        <el-upload
          ref="logo"
          :action="action"
          :auto-upload="true"
          :on-success="logoSuccess"
          :on-remove="logoRemove"
          accept="image/*"
          list-type="picture"
        >
          <el-button
            v-if="!basicConfig.logoUrl"
            icon="el-icon-upload"
            size="middle"
            type="text"
            >上传图片
          </el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>banner:</label>
      </el-col>
      <el-col :span="7">
        <el-upload
          ref="banner"
          :action="action"
          :auto-upload="true"
          :on-success="bannerSuccess"
          :on-remove="bannerRemove"
          accept="image/*"
          list-type="picture"
        >
          <el-button
            v-if="!basicConfig.bannerUrl"
            icon="el-icon-upload"
            size="middle"
            type="text"
            >上传图片
          </el-button>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { projects } from "../api/config";

export default {
  components: {},
  props: [],
  data() {
    return {
      projectId: "",
      basicConfig: {
        titleCn: "",
        titleEn: "",
        copyright: "",
        record: "",
        domainRecord: "",
        logoUrl: "",
        bannerUrl: "",
      },
      rules: {
        projectId: [
          {
            required: true,
            message: "请选择项目",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur",
          },
        ],
        copyright: [
          {
            required: true,
            message: "请输入copyright",
            trigger: "blur",
          },
        ],
        record: [
          {
            required: true,
            message: "请输入record",
            trigger: "blur",
          },
        ],
        domainRecord: [
          {
            required: true,
            message: "请输入domainRecord",
            trigger: "blur",
          },
        ],
      },
      action: "http://101.37.20.199:8080/image",
      projectIdOptions: [
        {
          name: "选项一",
          id: 1,
        },
        {
          name: "选项二",
          id: 2,
        },
      ],
    };
  },
  created() {
    projects().then((response) => {
      this.projectIdOptions = response.data;
    });
    console.log(this.projectId);
  },
  methods: {
    changeProject(value) {
      this.$emit("change-project", value);
    },
    dataTest: function () {
      console.log(this.basicConfig);
    },
    logoSuccess: function (response, file, fileList) {
      this.basicConfig.logoUrl =
        "http://101.37.20.199:22000/" + response.fullPath;
    },
    logoRemove() {
      this.basicConfig.logoUrl = "";
    },
    bannerSuccess: function (response, file, fileList) {
      this.basicConfig.bannerUrl =
        "http://101.37.20.199:22000/" + response.fullPath;
    },
    bannerRemove() {
      this.basicConfig.bannerUrl = "";
    },
  },
};
</script>

<style scoped>
@import "../assets/css/align-center.css";
@import "../assets/css/basic.css";

</style>
