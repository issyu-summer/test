<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-form-item style="width: 100px;margin-left: 60px">
          <el-checkbox v-model="isused">启用SQL</el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item style="width: 100px;margin-left: 60px">
          <el-checkbox
            v-model="useWHERE"
            :disabled="isused === false"
          >启用WHERE
          </el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item style="width: 100px;margin-left: 60px">
          <el-checkbox
            v-model="useGROUPBY"
            :disabled="isused === false"
          >启用GROUP BY
          </el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item style="width: 100px;margin-left: 60px">
          <el-checkbox
            v-model="useLIMIT"
            :disabled="isused === false"
          >启用LIMIT
          </el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="margin-left: 54px">
        <el-form-item v-if="isused">
          <el-col :span="2">SELECT</el-col>
          <el-col :span="3">
            <el-select
              v-model="sql.columns"
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
              v-model="sql.table"
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
      <el-col style="margin-left: 54px">
        <el-form-item v-if="isused&&useWHERE">
          <el-col :span="2">WHERE</el-col>
          <el-col :span="3">
            <el-select
              v-model="sql.column"
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
              v-model="sql.operator"
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
              v-model="sql.value"
            />
          </el-col>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item v-if="isused&&useGROUPBY">
          <el-col :span="9" :offset="4">GROUP BY</el-col>
          <el-col :span="8">
            <el-select
              v-model="sql.groupColumn"
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
      <el-col :span="12" :offset="1">
        <el-form-item v-if="isused&&useLIMIT">
          <el-col :span="6">LIMIT</el-col>
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
      sql: {
        columns: '',
        table: '',
        colunn: '',
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
