<template>
  <div class="form-wrapper setting-box">
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
          <el-col :span="20">
            <el-row class="d-flex align-items-center">
              <el-col :span="3">
                <label>数据表:</label>
              </el-col>
              <el-col :span="4">
                <el-select
                  :key="index"
                  v-model="item.resourceId"
                  :style="{width: '100%'}"
                  clearable
                  placeholder="数据表"
                  @change="changeResourceId($event, index)"
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
                <label>横轴:</label>
              </el-col>
              <el-col :span="4">
                <el-select v-model="item.xAxis" :style="{width: '100%'}" clearable placeholder="横轴">
                  <el-option
                    v-for="(xAxis, xAxisIndex) in xAxisOptions[index]"
                    :key="xAxisIndex"
                    :disabled="item.disabled"
                    :label="xAxis.COLUMN_NAME"
                    :value="xAxis.COLUMN_NAME"
                  />
                </el-select>
              </el-col>
              <el-col :span="3">
                <label>纵轴:</label>
              </el-col>
              <el-col :span="4">
                <el-select v-model="item.yAxis" :style="{width: '100%'}" clearable placeholder="纵轴">
                  <el-option
                    v-for="(yAxis, yAxisIndex) in yAxisOptions[index]"
                    :key="yAxisIndex"
                    :disabled="item.disabled"
                    :label="yAxis.COLUMN_NAME"
                    :value="yAxis.COLUMN_NAME"
                  />
                </el-select>
              </el-col>
            </el-row>
            <el-row class="d-flex align-items-center">
              <el-col :span="4">
                <label>SQL数据源:</label>
              </el-col>
              <el-col :span="14">
                <div class="sql">
                  <el-input v-model="item.sql" />
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>

</template>

<script>
import { columns, resources } from '../api/config'

export default {
  components: {
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
          sql: ''
        }
      ],
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
      ]
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
      this.chartInfo[index].xAxis = ''
      this.chartInfo[index].yAxis = ''
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
        sql: ''
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

<style scoped>
.form-wrapper {
  /* width: 100%; */
  /* width: 900px; */
}

.form-list {
  width: 100%;
  margin-bottom: 30px;
  box-sizing: border-box;
  background: #fff;
  padding: 10px;
  /*display: flex;*/
}

.form-box {
  padding: 10px;
}

.el-row {
  /*width: 900px;*/
  /*height: 30px;*/
  margin-bottom: 15px;
}

.chart /deep/ .el-input__inner {
  border-radius: 15px;
  width: 130px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  /*outline: medium;*/
}

.plus, .del {
  padding: 10px 10px;
}

.sql /deep/ .el-input__inner {
  border-radius: 10px;
  width: 100%;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
</style>
