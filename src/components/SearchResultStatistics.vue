<template>
  <div class="statisticsFieldsettingBox">
    <div v-for="(item, index) in searchResultStatisticConfig" :key="index" class="form-list">
      <div class="in">
        <el-row class="item1-box">
          <el-col :span="4">
            <div class="button-box">
              <template v-if="index === searchResultStatisticConfig.length - 1">
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
              <el-col :span="4">
                <label style="font-size: 15px">数据表:</label>
              </el-col>
              <el-col :span="6" >
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
          v-for="(item2, index2) in item.statisticsFields"
          :key="index + index2 + '_item2'"
        >
          <el-row>
            <el-col :span="4">
              <div class="button-box">
                <template v-if="index === searchResultStatisticConfig.length - 1">
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
                  <label>field:</label>
                </el-col>
                <el-col :span="4">
                  <el-select
                    v-model="item2.field"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请选择字段名"
                    @change="changecolumnName($event, index)"
                  >
                    <el-option
                      v-for="(field, fieldIndex) in fieldOptions"
                      :key="fieldIndex"
                      :disabled="item2.disabled"
                      :label="field.name"
                      :value="field.id"
                    />
                  </el-select>
                </el-col>

                <el-col :span="3">
                    <label>type:</label>
                </el-col>
                <el-col :span="4">
                    <el-select
                    v-model="item2.type"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请选择检索方式"
                    @change="changecolumnName($event, index)"
                  >
                    <el-option
                      v-for="(type, typeIndex) in typeOptions"
                      :key="typeIndex"
                      :disabled="item2.disabled"
                      :label="type.name"
                      :value="type.id"
                    />
                    </el-select>
                </el-col>
              </el-row>
              <el-row class="d-flex align-items-center">
                  <el-col :span="3">
                  <label>title:</label>
                </el-col>
                <el-col :span="4">
                  <el-input
                    v-model="item2.title"
                    :maxlength="255"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请输入field别名"
                    prefix-icon="el-icon-mobile"
                  />
                </el-col>
                  <el-col :span="3">
                      <label>size:</label>
                  </el-col>
                  <el-col :span="4">
                  <el-input
                    v-model="item2.size"
                    :maxlength="255"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请输入统计最大结果数"
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
      searchResultStatisticConfig: [
        {
          resourceId: '',
          statisticsFields: [
            {
              field: '',
              title: '',
              size: '',
              type: '',
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
      fieldOptions: [
        {
          name: '选项一',
          id: 1,
        },
        {
          name: '选项二',
          id: 2,
        },
      ],
      typeOptions: [
        {
          name: '0,ES检索',
          id: 1,
        },
        {
          name: '1,算法检索',
          id: 2,
        },
        {
          name: '2,sql检索',
          id: 3,
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
      this.searchResultStatisticConfig.push({
        resourceId: '',
        statisticsFields: [
          {
            name: '',
            label: '',
            orderNumber: '',
            maxWords: '',
          },
        ],
      });
    },
    onDeleteFormItem(index) {
      this.searchResultStatisticConfig.splice(index, 1);
    },
    onAddSubLever(index) {
      this.searchResultStatisticConfig[index].statisticsFields.push({
        name: '',
        label: '',
        orderNumber: '',
        maxWords: '',
      });
    },
    onDeleteSubLevel(index, index2) {
      this.searchResultStatisticConfig[index].statisticsFields.splice(index2, 1);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 15px;
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
  /* background: #fff; */
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
