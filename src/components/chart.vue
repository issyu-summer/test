<template>
  <div class="form-wrapper">
    <div v-for="(item, index) in formData" :key="index" class="form-list">
      <div class="button-box">
        <template v-if="index === formData.length -1">
          <el-button @click="onAddFormItem" type="primary" size="medium" icon="el-icon-plus"></el-button>
        </template>
        <template v-if="index">
          <el-button @click="onDeleteFormItem(index)" type="danger" size="medium" icon="el-icon-minus"></el-button>
        </template>
      </div>
      <el-form ref="elForm" :model="formData[index]" :rules="rules" size="medium" label-width="100px" class="form-box">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="数据表" prop="selectTable">
              <el-select v-model="formData.selectTable" placeholder="请选择数据表" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in selectTableOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="横轴" prop="Xaxis">
              <el-select v-model="formData.Xaxis" placeholder="请选择作为横轴的字段" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in XaxisOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="纵轴" prop="Yaxis">
              <el-select v-model="formData.Yaxis" placeholder="请选择作为纵轴的元素" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in YaxisOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <sqlcon></sqlcon>
        </el-form-item>
        <el-row v-if="index === formData.length -1" :gutter="24">
          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import sqlcon from './sqlconponents.vue'
export default {
  components: {
    sqlcon
  },
  props: [],
  data() {
    return {
      formData: [
        {
          selectTable: undefined,
          Xaxis: undefined,
          Yaxis: undefined,
          sqlsen: undefined,
        }
      ],
      rules: {
        selectTable: [{
          required: true,
          message: '请选择数据表',
          trigger: 'change'
        }],
        Xaxis: [{
          required: true,
          message: '请选择作为横轴的字段',
          trigger: 'change'
        }],
        Yaxis: [{
          required: true,
          message: '请选择作为纵轴的元素',
          trigger: 'change'
        }],
      },
      selectTableOptions: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      XaxisOptions: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      YaxisOptions: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      sqlsen: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        // if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    onAddFormItem() {
      this.formData.push({
        reourceId: undefined,
        column: undefined,
        order: undefined,
        sqlsen: undefined,
      });
    },
    onDeleteFormItem(index) {
      this.formData.splice(index, 1);
    }
  }
}
</script>

<style>
.form-wrapper {
    /* width: 100%; */
    width: 600px;
  }
  .form-list {
      width: 100%;
      margin-bottom: 30px;
      box-sizing: border-box;
      display: flex;
  }
  .button-box {
    width: 140px;
    text-align: right;
    padding-top: 10px;
    flex-shrink: 0;
  }

  .form-box {
    padding: 10px;
  }
</style>
