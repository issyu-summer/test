<template>
  <div class="form-wrapper setting-box">
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
          <el-col :span="20">
            <el-row class="d-flex align-items-center">
              <el-col :span="3">
                <label>数据表:</label>
              </el-col>
              <el-col :span="4">
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
              
              <el-col :span="4" :offset="2">
                  <el-checkbox 
                  v-model="useSQlConfig[index]"
                  >使用sql组件</el-checkbox>
                </el-col>
            </el-row>
            <el-row  class="d-flex align-items-center">
              <el-col v-if="useSQlConfig[index]==false">
                <el-col :span="4" >
                  <label>SQL数据源:</label>
                </el-col>
                <el-col :span="14">
                  <div class="sql">
                    <el-input v-model="item.sql" />
                  </div>
                </el-col>
              </el-col>
              <el-col v-else-if="useSQlConfig[index]==true">
                 <sql></sql>
              </el-col>
              </el-row>
          </el-col>
        </el-row>
        
      </div>
    </div>
  </div>
</template>

<script>
import { resources, columns } from '../api/config'
import sql from "./sqlcomponents.vue";
export default {

  components: {
    sql,
  },
  props: [
    'projectId'
  ],
  data() {
    return {
      useSQlConfig:[
           false,
      ],
      leadBoardList: [
        {
          resourceId: '',
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
      });
      this.useSQlConfig.push(
        false
      )
    },
    onDeleteFormItem(index) {
      this.leadBoardList.splice(index, 1);
      this.useSQlConfig.splice(index,1);
    },
    
  }
}

</script>

<style scoped>

@import "../assets/css/align-center.css";
@import "../assets/css/leadboard.css";

</style>
