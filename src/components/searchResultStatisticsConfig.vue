<template>
  <div class="searchFieldSettingBox">
    <div
      v-for="(item, index) in searchResultStatisticConfig"
      :key="index"
      class="form-list"
    >
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
              <el-col :span="6">
                <el-select
                  v-model="item.resourceId"
                  :style="{ width: '100%' }"
                  clearable
                  placeholder="请选择数据表"
                  @change="changeresourceId(index)"
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

          <div v-if="item.resourceId">
            <el-table
              :data="item.statisticsFields"
              style="width: 100%"
              max-height="250"
            >
              <el-table-column fixed prop="date" label="field" width="150">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.selected"
                    ><span style="margin-left: 10px">{{
                      scope.row.field
                    }}</span></el-checkbox
                  >
                </template>
              </el-table-column>
              <el-table-column prop="name" label="title" width="180">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.title"
                    v-if="scope.row.selected"
                    placeholder="请输入字段名称"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="number" label="type" width="180">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.type"
                    v-if="scope.row.selected"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请选择检索方式"
                  >
                    <el-option
                      v-for="(type, typeIndex) in typeOptions"
                      :key="typeIndex"
                      :label="type.name"
                      :value="type.id"
                    />
                    </el-select>
                </template>
              </el-table-column>
              <el-table-column label="size" width="180">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.size"
                    v-if="scope.row.selected"
                    :maxlength="255"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="请输入最大结果数"
                    prefix-icon="el-icon-mobile"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
      </div>
    </div>
    <!-- <el-button @click="commit()">提交</el-button> -->
  </div>
</template>

<script>
import { searchResultStatisticsConfig, columns, resources } from "../api/config";
export default {
  components: {},
  props: ["projectId"],
  data() {
    return {
      searchResultStatisticConfig: [
        {
          resourceId: "",
          statisticsFields: [
            {
              field: "",
              title: "",
              size: "",
              type: "",
              selected: false,
            },
          ],
        },
      ],

      resourceIdOptions: [
        {
          name: "选项一",
          id: 1,
        },
        {
          name: "选项二",
          id: 2,
        },
      ],
      nameOptions: [
        {
          name: "选项一",
          id: 1,
        },
        {
          name: "选项二",
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
      data: [],
    };
  },
  computed: {},
  watch: {
    projectId(n) {
      if (n) {
        this.getResources();
        console.log(this.resourceIdOptions);
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    changeresourceId(index) {
      console.log(index)
      this.getColumns(index)
    },
    onAddFormItem() {
      this.searchResultStatisticConfig.push({
        resourceId: "",
        statisticsFields: [
          {
            field: "",
            title: "",
            size: "",
            type: "",
            selected: false,
          },
        ],
      });
    },
    onDeleteFormItem(index) {
      this.searchResultStatisticConfig.splice(index, 1);
    },
    onAddSubLever(index) {
      this.searchResultStatisticConfig[index].statisticsFields.push({
        field: "",
        title: "",
        size: "",
        type: "",
        selected: false,
      });
    },
    onDeleteSubLevel(index, index2) {
      this.searchResultStatisticConfig[index].statisticsFields.splice(
        index2,
        1
      );
    },
    getResources() {
      resources(this.projectId).then((response) => {
        this.resourceIdOptions = response.data;
      });
    },
    getColumns(index) {
      columns(this.searchResultStatisticConfig[index].resourceId).then(
        (response) => {
          console.log(response.data);
          this.searchResultStatisticConfig[index].statisticsFields = [];
          for (let i = 0; i < response.data.length; i++) {
            this.searchResultStatisticConfig[index].statisticsFields.push({
              field: response.data[i].COLUMN_NAME,
              title: "",
              size: "",
              type: "",
              selected: false,
            });
          }
          console.log;
          this.$forceUpdate();
        }
      );
    },
    commit() {
      var i = 0;
      this.data = [];
      for (i = 0; i < this.searchResultStatisticConfig.length; i++) {
        var config = {
          resourceId: this.searchResultStatisticConfig[i].resourceId,
          staticsFields: [],
        };
        for (
          var j = 0;
          j < this.searchResultStatisticConfig[i].statisticsFields.length;
          j++
        ) {
            var s = this.searchResultStatisticConfig[i].statisticsFields[j]
          if (s.selected == true) {
            config.staticsFields.push({
              field: s.field,
              title: s.title,
              size: s.size,
              type: s.type,
            });
          }
        }
        //console.log(config.fields)
        this.data.push(config);
      }
      console.log(this.data);
      // console.log(this.searchFieldConfig)
      searchResultStatisticsConfig(111, this.data).then((response) => {
        console.log(response.data);
      });
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
