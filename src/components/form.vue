<template>
  <div class="form-wrapper">
    <div v-for="(item, index) in formList" :key="index" class="form-list">
      <div class="button-box">
        <template v-if="index === formList.length -1">
          <el-button icon="el-icon-plus" size="medium" type="primary" @click="onAddFormItem" />
        </template>
      </div>
      <el-form class="form-box" label-width="auto">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="数据表">
              <el-select placeholder="请选择数据表" value />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段名">
              <el-select placeholder="请选择字段名" value />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="升/降序">
              <el-radio-group>
                <el-radio :label="'升序'">升序</el-radio>
                <el-radio :label="'升序'">降序</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="sql语句">
              <el-input placeholder="请输入sql语句" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formList: [[]]
    }
  },
  methods: {
    onAddFormItem() {
      this.formList.push([])
    }
  }
}
</script>

<style lang="less" scoped>
.form-wrapper {
  width: 100%;

  .form-list {
    width: 100%;
    padding: 30px 30px 0 30px;
    box-sizing: border-box;
    display: flex;

    .button-box {
      width: 88px;
    }

    .form-box {
      background: #fff;
      padding: 20px;
    }
  }
}
</style>
