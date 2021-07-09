<template>
  <div class="form-wrapper">
    <div v-for="(item, index) in leadBoardList" :key="index" class="form-list">
      <div class="in">
        <el-row>
          <el-col :span="4">
            <div class="button-box">
              <template v-if="index === leadBoardList.length -1">
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
            <el-select v-model="item.resourceId" :style="{width: '100%'}" clearable placeholder="数据表" @change="changeResourceId($event, index)">
              <el-option
                v-for="(resource, resourceIndex) in resourceIdOptions"
                :key="resourceIndex"
                :disabled="item.disabled"
                :label="resource.name"
                :value="resource.id"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <label>排序字段:</label>
          </el-col>
          <el-col :span="4">
            <el-select v-model="item.orderColumn" :style="{width: '100%'}" clearable placeholder="字段名">
              <el-option
                v-for="(column, columnIndex) in columnOptions[index]"
                :key="columnIndex"
                :disabled="item.disabled"
                :label="column.COLUMN_NAME"
                :value="column.COLUMN_NAME"
              />
            </el-select>
          </el-col>
          <el-col :span="3">
            <label>升/降序:</label>
          </el-col>
          <el-col :span="4">
            <el-radio-group v-model="item.orderType" size="medium">
              <el-radio
                v-for="(order, orderIndex) in orderOptions"
                :key="orderIndex"
                :disabled="item.disabled"
                :label="order.value"
              >{{ order.name }}
              </el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="6">
            <label>SQL数据源:</label>
          </el-col>
          <el-col :span="14">
            <div class="sql">
              <el-input v-model="item.sql" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { resources } from '../api/config'
import { columns } from '../api/config'
export default {

  components: {
  },
  props: [
    'projectId'
  ],
  data() {
    return {
      leadBoardList: [
        {
          resourceId: '',
          orderColumn: '',
          orderType: '',
          sql: ''
        }
      ],
      rules: {
        resourceId: [{
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
        sql: []
      },
      resourceIdOptions: [{
        'name': '选项一',
        'id': 1
      }],
      columnOptions: [[{
        'COLUMN_NAME': 1
      }]],
      orderOptions: [
        {
          'name': '升序',
          'value': 'asc'
        }, {
          'name': '降序',
          'value': 'desc'
        }]
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
      this.leadBoardList[index].orderColumn = ''
      if (value) {
        this.getColumns(index)
      } else {
        this.columnOptions[index] = []
      }
    },
    getColumns(index) {
      columns(this.leadBoardList[index].resourceId).then(response => {
        this.columnOptions[index] = response.data
        this.$forceUpdate()
      })
    },
    getResources() {
      resources(this.projectId).then(response => {
        this.resourceIdOptions = response.data
      })
    },
    onAddFormItem() {
      this.leadBoardList.push({
        resourceId: '',
        orderColumn: '',
        orderType: '',
        sql: ''
      })
    },
    onDeleteFormItem(index) {
      this.leadBoardList.splice(index, 1)
    }
  }
}

</script>

<style scoped>

.in /deep/ .el-input__inner {
  border-radius: 15px;
  width: 130px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  /*outline: medium;*/
}

.el-row {
  margin-bottom: 15px;
  /*width: 900px;*/
  /*height: 30px;*/
}

.form-wrapper {
  /* width: 100%; */
  width: 900px;
}

.form-list {
  width: 100%;
  margin-bottom: 30px;
  box-sizing: border-box;
  /*display: flex;*/
}

.button-box {
  width: 100px;
  padding-top: 5px;
  flex-shrink: 0;
}

.plus, .del {
  padding: 10px 10px;
}
.sql /deep/ .el-input__inner {
  border-radius: 10px;
  width:640px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
.form-box {
  padding: 10px;
}
</style>
