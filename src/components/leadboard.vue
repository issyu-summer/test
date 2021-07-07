<template>
  <div class="form-wrapper">
    <div v-for="(item, index) in formData" :key="index" class="form-list">
      <div class="in">
        <el-row>
          <el-col :span="4">
            <div class="button-box">
              <template v-if="index === formData.length -1">
                <el-button circle class="plus" icon="el-icon-plus" size="medium" type="primary" @click="onAddFormItem" />
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
          <el-col :span="2">
            <label>数据表:</label>
          </el-col>
          <el-col :span="3">
            <el-select v-model="item.reourceId" :style="{width: '100%'}" clearable placeholder="数据表">
              <el-option
                v-for="(item, index) in reourceIdOptions"
                :key="index"
                :disabled="item.disabled"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="3">
            <label>排序字段:</label>
          </el-col>
          <el-col :span="3">
            <el-select v-model="item.column" :style="{width: '100%'}" clearable placeholder="字段名">
              <el-option
                v-for="(item, index) in columnOptions"
                :key="index"
                :disabled="item.disabled"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="2">
            <label>升/降序</label>
          </el-col>
          <el-col :span="4">
            <el-radio-group v-model="item.order" size="medium">
              <el-radio
                v-for="(item, index) in orderOptions"
                :key="index"
                :disabled="item.disabled"
                :label="item.value"
              >{{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <sqlcon />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import sqlcon from './sqlconponents'

export default {

  components: {
    sqlcon
  },
  props: [],
  data() {
    return {
      formData: [
        {
          reourceId: undefined,
          column: undefined,
          order: undefined,
          sqlsen: undefined
        }
      ],
      rules: {
        reourceId: [{
          required: true,
          message: '请选择数据表',
          trigger: 'change'
        }],
        column: [{
          required: true,
          message: '请选择字段名',
          trigger: 'change'
        }],
        order: [{
          required: true,
          message: '升/降序不能为空',
          trigger: 'change'
        }],
        sqlsen: []
      },
      reourceIdOptions: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      columnOptions: [{
        'label': '选项一',
        'value': 1
      }, {
        'label': '选项二',
        'value': 2
      }],
      orderOptions: [{
        'label': '升序',
        'value': 1
      }, {
        'label': '降序',
        'value': 2
      }]
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        // if (!valid) return;
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
        sqlsen: undefined
      })
    },
    onDeleteFormItem(index) {
      this.formData.splice(index, 1)
    }
  }
}

</script>

<style scoped>

.in /deep/ .el-input__inner {
  border-radius: 15px;
  width: 100px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  /*outline: medium;*/
}

.el-row {
  width: 900px;
  height: 30px;
}

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
  width: 100px;
  padding-top: 5px;
  flex-shrink: 0;
}

.plus, .del {
  padding: 10px 10px;
}

.form-box {
  padding: 10px;
}
</style>
