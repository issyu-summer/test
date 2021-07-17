<template>
  <div class="searchFieldSettingBox">
    <div v-for="(item, index) in searchFieldConfig" :key="index" class="form-list">
      <div class="in">
        <el-row class="item1-box">
          <el-col :span="4">
            <div class="button-box">
              <template v-if="index === searchFieldConfig.length - 1">
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
          v-for="(item2, index2) in item.searchFields"
          :key="index + index2 + '_item2'"
        >
          <el-row>
            <el-col :span="4">
              <div class="button-box">
                <template v-if="index === searchFieldConfig.length - 1">
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
                <el-col :span="4">
                  <label>name:</label>
                </el-col>
                <el-col :span="5">
                  <el-select
                    v-model="item2.name"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请选择字段名"
                    @change="changecolumnName($event, index)"
                  >
                    <el-option
                      v-for="(name, nameIndex) in nameOptions"
                      :key="nameIndex"
                      :disabled="item2.disabled"
                      :label="name.name"
                      :value="name.id"
                    />
                  </el-select>
                </el-col>

                <el-col :span="4">
                    <label>orderNumber:</label>
                </el-col>
                <el-col :span="5">
                    <el-select
                    v-model="item2.orderNumber"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请选择字段顺序"
                    @change="changecolumnName($event, index)"
                  >
                    <el-option
                      v-for="(orderNumber, orderNumberIndex) in orderNumberOptions"
                      :key="orderNumberIndex"
                      :disabled="item2.disabled"
                      :label="orderNumber.name"
                      :value="orderNumber.id"
                    />
                    </el-select>
                </el-col>
              </el-row>
              <el-row class="d-flex align-items-center">
                <el-col :span="4">
                <label>label:</label>
              </el-col>
              <el-col :span="5">
                <el-input
                  v-model="item2.label"
                  :maxlength="255"
                  :style="{ width: '100%' }"
                  clearable
                  placeholder="请输入name别名"
                  prefix-icon="el-icon-mobile"
                />
              </el-col>
                <el-col :span="4">
                    <label>maxWords:</label>
                </el-col>
                <el-col :span="5">
                <el-input
                  v-model="item2.maxWords"
                  :maxlength="255"
                  :style="{ width: '100%' }"
                  clearable
                  placeholder="请输入最大长度"
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
      searchFieldConfig: [
        {
          resourceId: '',
          searchFields: [
            {
              name: '',
              label: '',
              orderNumber: '',
              maxWords: '',
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
      nameOptions: [
        {
          name: '选项一',
          id: 1,
        },
        {
          name: '选项二',
          id: 2,
        },
      ],
      orderNumberOptions: [
        {
          name: '1',
          id: 1,
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
      this.searchFieldConfig.push({
        resourceId: '',
        searchFields: [
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
      this.searchFieldConfig.splice(index, 1);
    },
    onAddSubLever(index) {
      this.searchFieldConfig[index].searchFields.push({
        name: '',
        label: '',
        orderNumber: '',
        maxWords: '',
      });
    },
    onDeleteSubLevel(index, index2) {
      this.searchFieldConfig[index].searchFields.splice(index2, 1);
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
  /* width: 100px;
  padding-top: 5px;
  flex-shrink: 0; */
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
