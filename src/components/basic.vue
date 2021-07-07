<template>
  <div class="in">
    <el-row>
      <el-col :span="8">
        <label style="font-size: 15px">项目:</label>
      </el-col>
      <el-col :span="7">
        <el-select
          v-model="formData.projectId"
          :style="{ width: '100%'}"
          clearable
          placeholder="请选择项目"
        >
          <el-option
            v-for="(item, index) in projectIdOptions"
            :key="index"
            :disabled="item.disabled"
            :label="item.label"
            :value="item.value"
            :style="{ width: '100%'}"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>项目名称:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="formData.name"
          :maxlength="255"
          :style="{ width: '100%' }"
          clearable
          placeholder="请输入项目名称"
          prefix-icon="el-icon-mobile"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>项目英文名称:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="formData.enname"
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
          v-model="formData.copyright"
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
          v-model="formData.record"
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
          v-model="formData.domainRecord"
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
          :action="logoAction"
          :auto-upload="false"
          :before-upload="logoBeforeUpload"
          :file-list="logofileList"
          accept="image/*"
          limit="1"
          list-type="picture"
        >
          <el-button
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
          :action="bannerAction"
          :auto-upload="false"
          :before-upload="bannerBeforeUpload"
          :file-list="bannerfileList"
          accept="image/*"
          limit="1"
          list-type="picture"
        >
          <el-button
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

export default {
  components: {},
  props: [],
  data() {
    return {
      isCollapse: false,
      formData: {
        projectId: undefined,
        name: undefined,
        enname: undefined,
        copyright: undefined,
        record: undefined,
        domainRecord: undefined,
        logo: null,
        banner: null
      },
      rules: {
        projectId: [
          {
            required: true,
            message: '请选择项目',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          }
        ],
        copyright: [
          {
            required: true,
            message: '请输入copyright',
            trigger: 'blur'
          }
        ],
        record: [
          {
            required: true,
            message: '请输入record',
            trigger: 'blur'
          }
        ],
        domainRecord: [
          {
            required: true,
            message: '请输入domainRecord',
            trigger: 'blur'
          }
        ]
      },
      logoAction: 'https://jsonplaceholder.typicode.com/posts/',
      logofileList: [],
      bannerAction: 'https://jsonplaceholder.typicode.com/posts/',
      bannerfileList: [],
      projectIdOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]

    }
  }
}
</script>

<style scoped>

@import "../assets/css/align-center.css";

.in /deep/ .el-input__inner {
  border-radius: 15px;
  width: 220px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
</style>
