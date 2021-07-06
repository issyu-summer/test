<template>
  <div class="form-wrapper">
    <div v-for="(item, index) in formData" :key="index" class="form-list">
      <div class="button-box">
        <template v-if="index === formData.length -1">
          <el-button @click="onAddFormItem" type="primary" size="medium" icon="el-icon-plus"></el-button>
        </template>
        <template v-if="index">
          <el-button @click="onDeleteFormItem(index)" type="danger" size="medium" icon="el-icon-minus"></el-button>
        </template>
      </div>
      <el-form ref="elForm" :model="formData[index]" :rules="rules" size="medium" label-width="100px" class="form-box">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="数据表" prop="reourceId">
              <el-select v-model="item.reourceId" placeholder="请选择数据表" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in reourceIdOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段名" prop="column">
              <el-select v-model="item.column" placeholder="请选择字段名" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in columnOptions" :key="index" :label="item.label"
                  :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="升/降序" prop="order">
              <el-radio-group v-model="item.order" size="medium">
                <el-radio v-for="(item, index) in orderOptions" :key="index" :label="item.value"
                  :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="sql语句" prop="sqlsen">
              <el-input v-model="item.sqlsen" placeholder="请输入sql语句" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <sqlcon></sqlcon>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
  
</template>

<script>
import sqlcon from "./sqlconponents";
export default {
  
  components: {
    sqlcon,
  },
  props: [],
  data() {
    return {
      formData: [
        {
          reourceId: undefined,
          column: undefined,
          order: undefined,
          sqlsen: undefined,
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
        sqlsen: [],
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
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
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
        sqlsen: undefined,
      });
    },
    onDeleteFormItem(index) {
      this.formData.splice(index, 1);
    }
  }
}

</script>

<style scoped>
.el-menu-admin:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
}
.el-header {
  background-color: rgb(68, 149, 255);
}
.el-main {
  background-color: #f20;
}
.toggle {
  font-size: 36px;
  color: #989898;
  cursor: pointer;
  line-height: 30px;
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
    width: 140px;
    padding-top: 10px;
    flex-shrink: 0;
  }

  .form-box {
    padding: 10px;
  }
</style>
