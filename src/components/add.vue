<template>
  <div id="in" >
    <div id="in2" style="
    justify-content: center;
    text-align: center;
    font-size: larger;
    margin-top: 60px;
    margin-bottom: 40px;
"><label data-v-56e6ce41="">新增项目</label></div>

     <el-row>
      <el-col :span="8">
        <label>项目名称:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="addproject.name"
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
        <label>标识:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="addproject.code"
          :style="{ width: '100%' }"
          clearable
          placeholder="请输入项目标识"
          prefix-icon="el-icon-mobile"
          show-word-limit
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>描述:</label>
      </el-col>
      <el-col :span="7">
        <el-input
          v-model="addproject.description"
          :style="{ width: '100%' }"
          clearable
          placeholder="请输入对项目的简单描述"
          prefix-icon="el-icon-mobile"
          show-word-limit
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <label>来源:</label>
      </el-col>
      <el-col :span="7">
        <el-select
          v-model="addproject.source"
          :style="{ width: '100%' }"
          clearable
          placeholder="请输入对项目来源"
          prefix-icon="el-icon-mobile"
          show-word-limit
        >
          <el-option
            v-for="(item, index) in sourceOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
    </el-row>
    <el-row >
      <el-col :span="7" :offset="8" >
        <el-button type="primary"  @click="synchronizeData">同步数据</el-button>
      </el-col>
    </el-row>
    </div>
  
</template>

<script>
import { addProject } from "../api/config";
export default {
    components: {},
  props: [],
  data() {
    return {
      addproject: {
        name: "",
        code: "",
        description: "",
        source: "",
      },
      rules: {
        name: [],
        code: [],
        description: [],
        source: [],
      },
      sourceOptions: [{
        "label": "0平台同步",
        "value": 1
      }, {
        "label": "1手动创建",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    synchronizeData(){
      addProject(this.addproject).then((response) => {
        console.log(response.data)
      });
    }
  }
}
</script>

<style scoped>


@import "../assets/css/configure.css";
.el-row {
  margin-bottom: 20px;
  vertical-align: middle;
  margin-left: 70px;
}
.el-col{
  display: block;
}
label{
  display: inline-block;
  width: 120px;
  text-align: right;
  vertical-align: -webkit-baseline-middle;
}


</style>