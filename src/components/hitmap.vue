<template>
  <div class="form-wrapper">
    <div v-for="(item, index) in hitmapList" :key="index" class="form-list">
      <div class="in">
        <el-row>
          <el-col :span="4">
            <div class="button-box">
              <template v-if="index === hitmapList.length - 1">
                <el-button
                  circle
                  class="plus"
                  icon="el-icon-plus"
                  size="medium"
                  type="primary"
                  @click="onAddFormItem"
                />
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
          <el-col :span="3">
            <label>数据表:</label>
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="item.resourceId"
              :style="{ width: '100%' }"
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
          <el-col :span="3">
            <label>关键字</label>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="item.keyword"
              placeholder="关键词"
              clearable
              :style="{ width: '100%' }"
              @change="changeKeyword($event, index)"
            />
          </el-col>
          <el-col :span="2">
            <label>图片:</label>
          </el-col>
          <el-col :span="4">
            <el-upload
              ref="item.field101"
              list-type="picture"
              :file-list="field101fileList"
              :action="field101Action"
              :before-upload="field101BeforeUpload"
            >
              <el-button
                size="small"
                type="primary"
                icon="el-icon-upload"
              >点击上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <sqlCom />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { resources } from '../utils/request'
import { columns } from '../utils/request'
import sqlCom from './sqlcomponents'

export default {
  components: { sqlCom },
  props: ['projectId'],
  data() {
    return {
      hitmapList: [
        {
          resourceId: '',
          keyword: '',
          field101: ''
        }
      ],

      rules: {
        resourceId: [
          {
            required: true,
            message: '请选择数据表',
            trigger: 'change'
          }
        ],
        keyword: [
          {
            required: true,
            message: '请输入关键字',
            trigger: 'change'
          }
        ]
      },
      field101Action: 'http://101.37.20.199:8080/image',
      field101fileList: [],
      resourceIdOptions: [
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
  },

  computed: {},
  watch: {
    projectId(n) {
      if (n) {
        this.getResources()
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    changeResourceId(value, index) {
      // console.log(value, index)
      this.hitmapList[index].orderColumn = ''
      if (value) {
        this.getColumns(index)
      } else {
        this.columnOptions[index] = []
      }
    },
    getColumns(index) {
      columns(this.hitmapList[index].resourceId).then((response) => {
        this.columnOptions[index] = response.data
        this.$forceUpdate()
      })
    },
    getResources() {
      resources(this.projectId).then((response) => {
        this.resourceIdOptions = response.data
      })
    },
    submitForm() {
      this.$refs['elForm'].validate((valid) => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    field101BeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
    onAddFormItem() {
      this.hitmapList.push({
        resourceId: '',
        keyword: '',
        field101: ''
      })
    },
    onDeleteFormItem(index) {
      this.hitmapList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.el-row{
  width:  900px;
  height: 30px;
}

</style>
