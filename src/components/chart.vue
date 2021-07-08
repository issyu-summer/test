<template>
  <div class="form-wrapper">
    <div v-for="(item, index) in chartInfo" :key="index" class="form-list">
      <div class="chart">
        <el-row>
          <el-col :span="4">
            <div class="button-box">
              <template v-if="index === chartInfo.length -1">
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
            <el-select
              :key="index"
              v-model="item.resourceId"
              :style="{width: '100%'}"
              clearable
              placeholder="数据表"
              @change="changeResourceId($event, index)"
            >
              <el-option
                v-for="(item, index) in resourceIdOptions"
                :key="index"
                :disabled="item.disabled"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="2">
            <label>横轴:</label>
          </el-col>
          <el-col :span="3">
            <el-select v-model="item.xAxis" :style="{width: '100%'}" clearable placeholder="横轴">
              <el-option
                v-for="(item, index) in xAxisOptions[index]"
                :key="index"
                :disabled="item.disabled"
                :label="item.COLUMN_NAME"
                :value="item.COLUMN_NAME"
              />
            </el-select>
          </el-col>
          <el-col :span="2">
            <label>纵轴:</label>
          </el-col>
          <el-col :span="3">
            <el-select v-model="item.yAxis" :style="{width: '100%'}" clearable placeholder="纵轴">
              <el-option
                v-for="(item, index) in yAxisOptions[index]"
                :key="index"
                :disabled="item.disabled"
                :label="item.COLUMN_NAME"
                :value="item.COLUMN_NAME"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <sqlcon />
        </el-row>
        <!--        <el-row v-if="index === formData.length -1" :gutter="24">-->
        <!--          <el-col :span="24">-->
        <!--            <el-form-item size="large">-->
        <!--              <el-button type="primary" @click="submitForm">提交</el-button>-->
        <!--              <el-button @click="resetForm">重置</el-button>-->
        <!--            </el-form-item>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
      </div>
    </div>

  </div>

</template>

<script>
import sqlcon from './sqlcomponents.vue'
import { columns, resources } from '../utils/request'

export default {
  components: {
    sqlcon
  },
  props: [
    'projectId'
  ],
  data() {
    return {
      chartInfo: [
        {
          resourceId: '',
          xAxis: '',
          yAxis: '',
          sqlsen: ''
        }
      ],
      rules: {
        selectTable: [{
          required: true,
          message: '请选择数据表',
          trigger: 'change'
        }],
        xAxis: [{
          required: true,
          message: '请选择作为横轴的字段',
          trigger: 'change'
        }],
        yAxis: [{
          required: true,
          message: '请选择作为纵轴的元素',
          trigger: 'change'
        }]
      },
      resourceIdOptions: [{
        'name': '选项一',
        'id': 1
      }],
      yAxisOptions: [
        [{
          'COLUMN_NAME': 1
        }]
      ],
      xAxisOptions: [
        [{
          'COLUMN_NAME': 1
        }]
      ],
      sqlsen: []
    }
  },
  computed: {},
  watch: {
    projectId(n) {
      if (n) {
        this.getResources()
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    changeResourceId(value, index) {
      // console.log(value, index)
      this.chartInfo[index].orderColumn = ''
      if (value) {
        this.getColumns(index)
      } else {
        this.chartInfo[index] = []
      }
    },
    getColumns(index) {
      columns(this.chartInfo[index].resourceId).then(response => {
        this.xAxisOptions[index] = response.data
        this.yAxisOptions[index] = response.data
        this.$forceUpdate()
      })
    },
    onAddFormItem() {
      this.chartInfo.push({
        resourceId: '',
        xAxis: '',
        yAxis: '',
        sqlsen: ''
      })
    },
    onDeleteFormItem(index) {
      this.chartInfo.splice(index, 1)
    },
    getResources() {
      resources(this.projectId).then(response => {
        this.resourceIdOptions = response.data
      })
    }
  }
}
</script>

<style>
.form-wrapper {
  /* width: 100%; */
  width: 900px;
}

.submit {
  width: 200px;
  background-color: lightblue;
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

.el-row {
  width: 900px;
  height: 30px;
}

.chart /deep/ .el-input__inner {
  border-radius: 15px;
  width: 100px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  /*outline: medium;*/
}

.plus, .del {
  padding: 10px 10px;
}
</style>
