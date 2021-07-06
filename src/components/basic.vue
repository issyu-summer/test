<template>
  <div class="basic-wrapper">
    <table>
      <tr>
        <td>新闻</td>
        <td>--</td>
        <td>--</td>
      </tr>
      <tr>
        <td>title</td>
        <td>--</td>
        <td>--</td>
      </tr>
      <tr>
        <td>detail</td>
        <td>--</td>
        <td>--</td>
      </tr>
    </table>
    <div class="abc">
      <el-form-item label="项目" prop="projectId">
        <el-select
          v-model="formData.projectId"
          placeholder="请选择项目"
          clearable
          :style="{ width: '100%' }"
        >
          <el-option
            v-for="(item, index) in projectIdOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input 
          v-model="formData.name"
          placeholder="请输入项目名称"
          :maxlength="255"
          show-word-limit
          clearable
          prefix-icon="el-icon-mobile"
          :style="{ width: '100%' }"

        ></el-input>
      </el-form-item>
      <el-form-item label="项目英文名称" prop="enname">
        <el-input 
          v-model="formData.enname"
          placeholder="请输入项目英文名称"
          :maxlength="255"
          show-word-limit
          clearable
          prefix-icon="el-icon-mobile"
          :style="{ width: '100%' }"

        ></el-input>
      </el-form-item>
      <el-form-item label="版权信息" prop="copyright">
        <el-input
          v-model="formData.copyright"
          placeholder="请输入版权信息"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="record" prop="record">
        <el-input
          v-model="formData.record"
          placeholder="请输入record"
          clearable
          :style="{ width: '100%' }"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="domainRecord" prop="domainRecord">
        <el-input
          v-model="formData.domainRecord"
          placeholder="请输入domainRecord"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="logo" prop="logo" required>
        <el-upload
          ref="logo"
          :file-list="logofileList"
          :action="logoAction"
          :auto-upload="false"
          :before-upload="logoBeforeUpload"
          list-type="picture"
          accept="image/*"
          limit="1"
        >
          <el-button size="small" type="primary" icon="el-icon-upload"
            >点击上传</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="banner" prop="banner" required>
        <el-upload
          ref="banner"
          :file-list="bannerfileList"
          :action="bannerAction"
          :auto-upload="false"
          :before-upload="bannerBeforeUpload"
          list-type="picture"
          accept="image/*"
          limit="1"
        >
          <el-button size="small" type="primary" icon="el-icon-upload"
            >点击上传</el-button
          >
        </el-upload>
      </el-form-item>
      <!-- <div class="in">

      </div> -->
    </div>
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
        banner: null,
      },
      rules: {
        projectId: [
          {
            required: true,
            message: '请选择项目',
            trigger: 'change',
          },
        ],
        name: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur',
          },
        ],
        copyright: [
          {
            required: true,
            message: '请输入copyright',
            trigger: 'blur',
          },
        ],
        record: [
          {
            required: true,
            message: '请输入record',
            trigger: 'blur',
          },
        ],
        domainRecord: [
          {
            required: true,
            message: '请输入domainRecord',
            trigger: 'blur',
          },
        ],
      },
      logoAction: 'https://jsonplaceholder.typicode.com/posts/',
      logofileList: [],
      bannerAction: 'https://jsonplaceholder.typicode.com/posts/',
      bannerfileList: [],
      projectIdOptions: [
        {
          label: '选项一',
          value: 1,
        },
        {
          label: '选项二',
          value: 2,
        },
      ],

    };
  },
};
</script>

<style scoped>
.el-menu-admin:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
}
.el-header {
  background-color: rgb(68, 149, 255);
}
.el-main {
  background-color: #f20;
}
.toggle {
  font-size: 36px;
  color: #989898;
  cursor: pointer;
  line-height: 30px;
}

.basic-wrapper {
  width: 600px;
  display: flex;
}
.abc /deep/ .el-input__inner {
	width: 220px;
	border-top: 0px;
	border-left: 0px;
	border-right-width: 0px;
	border-bottom-width: 1px;
	/*outline: medium;*/
}

table {
  border-collapse: collapse;
  margin-right: 60px;
}

table td {
  min-width: 50px;
  border: 1px solid #ccc;
}
</style>
