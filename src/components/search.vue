<template>
  <div class="searchSettingBox">
    <div v-for="(item, index) in searchConfigs" :key="index" class="form-list">
      <div class="in">
        <el-row class="item1-box">
          <el-col :span="4">
            <div class="button-box">
              <template v-if="index === searchConfigs.length - 1">
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
          <el-col :span="20">
            <el-row class="d-flex align-items-center">
              <el-col :span="3">
                <label style="font-size: 15px">数据表:</label>
              </el-col>
              <el-col :span="6">
                <el-select
                  v-model="item.resourceId"
                  :style="{ width: '100%' }"
                  clearable
                  placeholder="请选择数据表"
                  @change="changeresourceId"
                >
                  <el-option
                    v-for="(resource, resourceIndex) in resourceIdOptions"
                    :key="resourceIndex"
                    :label="resource.name"
                    :value="resource.id"
                    :style="{ width: '100%' }"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <div
          class="item2-box"
          v-for="(item2, index2) in item.fields"
          :key="index + index2 + '_item2'"
        >
          <el-row>
            <el-col :span="4">
              <div class="button-box">
                <template v-if="index === searchConfigs.length - 1">
                  <el-button
                    circle
                    class="plus"
                    icon="el-icon-plus"
                    size="medium"
                    type="primary"
                    @click="onAddSubLever(index)"
                  />
                </template>
                <template v-if="index2">
                  <el-button
                    circle
                    class="del"
                    icon="el-icon-minus"
                    size="medium"
                    type="danger"
                    @click="onDeleteSubLevel(index, index2)"
                  />
                </template>
              </div>
            </el-col>
            <el-col :span="20">
              <el-row class="d-flex align-items-center">
                <el-col :span="3">
                  <label>name:</label>
                </el-col>
                <el-col :span="4">
                  <el-select
                    v-model="item2.columnName"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请选择字段名"
                    @change="changecolumnName($event, index)"
                  >
                    <el-option
                      v-for="(columnName, columnNameIndex) in columnNameOptions"
                      :key="columnNameIndex"
                      :disabled="item2.disabled"
                      :label="columnName.name"
                      :value="columnName.id"
                    />
                  </el-select>
                </el-col>
                <el-col :span="3">
                  <label>label:</label>
                </el-col>
                <el-col :span="8">
                  <el-input
                    v-model="item2.label"
                    :maxlength="255"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请输入name别名"
                    prefix-icon="el-icon-mobile"
                  />
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      searchConfigs: [
        {
          resourceId: '',
          fields: [
            {
              columnName: '',
              label: '',
            },
          ],
        },
      ],

      resourceIdOptions: [
        {
          name: '选项一',
          id: 1,
        },
        {
          name: '选项二',
          id: 2,
        },
      ],
      columnNameOptions: [
        {
          name: '选项一',
          id: 1,
        },
        {
          name: '选项二',
          id: 2,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onAddFormItem() {
      this.searchConfigs.push({
        resourceId: '',
        fields: [
          {
            columnName: '',
            label: '',
          },
        ],
      });
    },
    onDeleteFormItem(index) {
      this.searchConfigs.splice(index, 1);
    },
    onAddSubLever(index) {
      this.searchConfigs[index].fields.push({
        columnName: '',
        label: '',
      });
    },
    onDeleteSubLevel(index, index2) {
      this.searchConfigs[index].fields.splice(index2, 1);
    },
  },
};
</script>

<style scoped>
.el-row {
  /* margin-bottom: 15px; */
  /*width: 900px;*/
  /*height: 30px;*/
}

.form-wrapper {
  /* width: 100%; */
  /* width: 900px; */
}

.form-list {
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  box-sizing: border-box;
  /*display: flex;*/
}

.button-box {
  width: 100px;
  padding-top: 5px;
  flex-shrink: 0;
}

.plus,
.del {
  padding: 10px 10px;
}

.item1-box {
  padding: 10px 0 0 0;
  background-color: rgb(193, 206, 221);
}

.item2-box {
  background-color: #fff;
  margin-top: 20px;
  padding: 10px 0 0 0;
}
</style>
