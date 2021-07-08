<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form-item style="width: 100px;margin-left: 60px">
          <el-checkbox v-model="isused">启用SQL</el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="24" style="margin-left: 54px">
        <el-form-item v-if="isused">
          <el-col :span="2">SELECT</el-col>
          <el-col :span="3">
            <el-select
              v-model="formData.columns"
              :style="{ width: '100%' }"
              clearable
              placeholder="字段名"
            >
              <el-option
                v-for="(item, index) in columnsOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="2">AS</el-col>
          <el-col :span="3">
            <el-input :disabled="isused === false" />
          </el-col>
          <el-col :span="2">FROM</el-col>
          <el-col :span="3">
            <el-select
              v-model="formData.table"
              :disabled="isused === false"
              :style="{ width: '100%' }"
              clearable
              placeholder="字段名"
            >
              <el-option
                v-for="(item, index) in tableOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-form-item style="width: 100px;margin-left: 60px">
          <el-checkbox
            v-model="useWHERE"
            :disabled="isused === false"
          >启用WHERE
          </el-checkbox>
        </el-form-item>
      </el-col>
      <el-col style="margin-left: 54px">
        <el-form-item v-if="useWHERE">
          <el-col :span="2">WHERE</el-col>
          <el-col :span="3">
            <el-select
              v-model="formData.column"
              :style="{ width: '100%' }"
              clearable
              placeholder="字段名"
            >
              <el-option
                v-for="(item, index) in columnOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select
              v-model="formData.operator"
              :style="{ width: '100%' }"
              clearable
              placeholder="=/like/..."
            >
              <el-option
                v-for="(item, index) in operatorOptions"
                :key="index"
                :disabled="isused === false"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input
              v-model="formData.value"
            />
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-form-item style="width: 100px;margin-left: 60px">
          <el-checkbox
            v-model="useGROUPBY"
            :disabled="isused === false"
          >启用GROUP BY
          </el-checkbox>
        </el-form-item>
      </el-col>
      <el-col style="margin-left: 46px">
        <el-form-item v-if="useGROUPBY">
          <el-col :span="3">GROUP BY</el-col>
          <el-col :span="3">
            <el-select
              v-model="formData.groupColumn"
              :style="{ width: '100%' }"
              clearable
              placeholder="字段名"
            >
              <el-option
                v-for="(item, index) in columnOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-form-item style="width: 100px;margin-left: 60px">
          <el-checkbox
            v-model="useLIMIT"
            :disabled="isused === false"
          >启用LIMIT
          </el-checkbox>
        </el-form-item>
      </el-col>
      <el-col style="margin-left: 48px">
        <el-form-item v-if="useLIMIT">
          <el-col :span="2">LIMIT</el-col>
          <el-col :span="3">
            <el-input />
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isused: false,
      useWHERE: false,
      useGROUPBY: false,
      useLIMIT: false,
      formData: {
        columns: '',
        table: '',
        colunm: '',
        operator: '',
        value: '',
        groupColumn: '',
        limit: ''
      },
      select_column: [
        {
          column: '',
          value: ''
        }
      ],
      columnsOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ],
      tableOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ],
      columnOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ],
      operatorOptions: [
        {
          label: '=',
          value: '='
        },
        {
          label: '!=',
          value: '!='
        },
        {
          label: '>=',
          value: '>='
        },
        {
          label: 'like',
          value: 'like'
        },
        {
          label: 'not like',
          value: 'not like'
        }
      ],
      groupColumnOptions: [
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
  methods: {
    onAddFormItem() {
      this.select_column.push({
        column: '',
        value: ''
      })
    },
    onDeleteFormItem(index) {
      this.select_column.splice(index, 1)
    }
  }
}
</script>
<style scoped>

</style>
