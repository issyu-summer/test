<template>
  <div>
    <div>
      <el-form-item>
        <el-checkbox v-model="isused">启用SQL</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-col :span="6">SELECT</el-col>
        <el-col :span="6">
          <el-select
            :disabled="isused == false"
            v-model="formData.columns"
            placeholder="请选择"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in columnsOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="isused == false"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">AS</el-col>
        <el-col :span="6">
          <el-input :disabled="isused == false" />
        </el-col>
      </el-form-item>

      <div v-for="(item, index) in select_column" :key="index">
        <div class="button-box">
          <template v-if="index === select_column.length - 1">
            <el-button
              @click="onAddFormItem"
              type="primary"
              size="medium"
              icon="el-icon-plus"
            ></el-button>
          </template>
          <template v-if="index">
            <el-button
              @click="onDeleteFormItem(index)"
              type="danger"
              size="medium"
              icon="el-icon-minus"
            ></el-button>
          </template>
        </div>

        <el-col :span="6"></el-col>
        <el-col :span="6">
          <el-select
            :disabled="isused == false"
            v-model="formData.columns"
            placeholder="请选择"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in columnsOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="isused == false"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">AS</el-col>
        <el-col :span="6">
          <el-input :disabled="isused == false" />
        </el-col>
      </div>

      <el-form-item>
        <el-col :span="6">FROM</el-col>
        <el-col :span="6">
          <el-select
            :disabled="isused == false"
            v-model="formData.table"
            placeholder="请选择"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in tableOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="useWHERE" :disabled="isused == false"
          >启用WHERE</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-col :span="6">WHERE</el-col>
        <el-col :span="6">
          <el-select
            :disabled="useWHERE == false || isused == false"
            v-model="formData.column"
            placeholder="请选择"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in columnOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="isused == false"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select
            :disabled="useWHERE == false || isused == false"
            v-model="formData.operator"
            placeholder="请选择"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in operatorOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="isused == false"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input
            v-model="formData.value"
            :disabled="useWHERE == false || isused == false"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="useGROUPBY" :disabled="isused == false"
          >启用GROUP BY</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-col :span="6">GROUP BY</el-col>
        <el-col :span="6">
          <el-select
            :disabled="useGROUPBY == false || isused == false"
            v-model="formData.groupColumn"
            placeholder="请选择"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in columnOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="useLIMIT" :disabled="isused == false"
          >启用LIMIT</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-col :span="6">LIMIT</el-col>
        <el-col :span="6">
          <el-input :disabled="useLIMIT == false" />
        </el-col>
      </el-form-item>
    </div>
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
        columns: "",
        table: "",
        colunm: "",
        operator: "",
        value: "",
        groupColumn: "",
        limit: "",
      },
      select_column: [
        {
          column: "",
          value: "",
        },
      ],
      columnsOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      tableOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      columnOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      operatorOptions: [
        {
          label: "=",
          value: "=",
        },
        {
          label: "!=",
          value: "!=",
        },
        {
          label: ">=",
          value: ">=",
        },
        {
          label: "like",
          value: "like",
        },
        {
          label: "not like",
          value: "not like",
        },
      ],
      groupColumnOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
    };
  },
  methods: {
    onAddFormItem() {
      this.select_column.push({
          column:'',
          value:''
      });
    },
    onDeleteFormItem(index) {
      this.select_column.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.button-box {
  width: 140px;
  padding-top: 10px;
  flex-shrink: 0;
}
</style>