<template>
  <div class="searchSettingBox">
    <div v-for="(item, index) in searchConfigs" :key="index" class="form-list" style="border-radius: 15px;">
      <div class="in" style="width:950px;border-radius: 15px;">
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
            <el-row class="d-flex align-items-center" style="width:100%">
              <el-col :span="3">
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
        </el-row>

        <div v-if="item.resourceId">
          <el-table :data="item.fields" style="width: 100%" max-height="250">
            <el-table-column>
            <el-table-column align="center" fixed prop="date" label="name" width="120">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                    scope.row.columnName
                  }}</span>
              </template>
            </el-table-column>
            </el-table-column>
            <!-- <el-table-column label="搜索域" width="80">
              <template slot-scope="scope"> 
                  <el-checkbox v-model="scope.row.selected_search"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="搜索结果" width="80">
              <template slot-scope="scope"> 
                  <el-checkbox v-model="scope.row.selected_field"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="搜索结果统计" width="80">
              <template slot-scope="scope"> 
                  <el-checkbox v-model="scope.row.selected_result"></el-checkbox>
              </template>
            </el-table-column> -->
            <el-table-column label="高级检索字段配置">
              <template slot="header">
                <el-checkbox label="高级检索字段配置"></el-checkbox>
              </template>
              <el-table-column width="40">
                <template slot-scope="scope"> 
                  <el-checkbox v-model="scope.row.selected_search"></el-checkbox>
              </template>
              </el-table-column>
            <el-table-column align="center" prop="name" label="label" width="150">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.label"
                  v-if="scope.row.selected_search"
                  placeholder="请输入字段名称"
                ></el-input>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column label="检索结果字段配置">
              <template slot="header">
                <el-checkbox label="检索结果字段配置"></el-checkbox>
              </template>
              <el-table-column width="40">
                <template slot-scope="scope"> 
                  <el-checkbox v-model="scope.row.selected_field"></el-checkbox>
              </template>
              </el-table-column>
              <el-table-column align="center" prop="name" label="label" width="120">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.label2"
                  v-if="scope.row.selected_field"
                  placeholder="请输入字段名称"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="顺序号" width="80">
              <template slot-scope="scope"> 
                  <el-input v-model="scope.row.orderNumber" v-if="scope.row.selected_field"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="最大长度" width="80">
              <template slot-scope="scope"> 
                  <el-input v-model="scope.row.maxWords" v-if="scope.row.selected_field"></el-input>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column label="分析统计配置">
              <template slot="header">
                <el-checkbox label="分析统计配置"></el-checkbox>
              </template>
              <el-table-column width="40">
                <template slot-scope="scope"> 
                  <el-checkbox v-model="scope.row.selected_result"></el-checkbox>
              </template>
              </el-table-column>
            <el-table-column align="center" label="title" width="120">
              <template slot-scope="scope"> 
                  <el-input v-model="scope.row.title" v-if="scope.row.selected_result"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" label="type" width="80">
              <template slot-scope="scope"> 
                  <el-select
                    v-model="scope.row.type"
                    v-if="scope.row.selected_result"
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
            <el-table-column align="center" label="size" width="80">
              <template slot-scope="scope"> 
                  <el-input v-model="scope.row.size" v-if="scope.row.selected_result"></el-input>
              </template>
            </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- <el-button @click="commit">提交</el-button> -->
  </div>
</template>

<script>
import { searchConfig, searchFieldConfig, searchResultStatisticsConfig, columns, resources } from "../api/config";
export default {
  components: {},
  props: ["projectId"],
  data() {
    return {
      selected: false,
      searchConfigs: [
        {
          resourceId: "",
          fields: [
            {
              columnName: "author",
              label: "作者",
              label2: "",
              orderNumber: "",
              maxWords: "",
              title: "",
              size: "",
              type: "",
              selected_search: false,
              selected_field: false,
              selected_result: false,
            },
            {
              columnName: "title",
              label: "",
              label2: "",
              orderNumber: "",
              maxWords: "",
              title: "",
              size: "",
              type: "",
              selected_search: false,
              selected_field: false,
              selected_result: false,
            },
          ],
        },
      ],

      resourceIdOptions: [
        {
          name: "新闻",
          id: 1,
        },
        {
          name: "选项二",
          id: 2,
        },
      ],
      columnNameOptions: [
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

      data_s: [],
      data_f:[],
      data_r:[]
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
  created() {
    this.getResources();
  },
  mounted() {},
  methods: {
    changeresourceId(index) {
      console.log(index);
      this.getColumns(index);
    },
    boxChange(index) {
      console.log(index);
    },
    onAddFormItem() {
      this.searchConfigs.push({
        resourceId: "",
        fields: [
          {
            columnName: "title",
              label: "",
              label2: "",
              orderNumber: "",
              maxWords: "",
              title: "",
              size: "",
              type: "",
              selected_search: false,
              selected_field: false,
              selected_result: false,
          },
        ],
      });
    },
    onDeleteFormItem(index) {
      this.searchConfigs.splice(index, 1);
    },
    onAddSubLever(index) {
      this.searchConfigs[index].fields.push({
        columnName: "title",
              label: "",
              label2: "",
              orderNumber: "",
              maxWords: "",
              title: "",
              size: "",
              type: "",
              selected_search: false,
              selected_field: false,
              selected_result: false,
      });
    },
    onDeleteSubLevel(index, index2) {
      this.searchConfigs[index].fields.splice(index2, 1);
    },

    insert(flag) {
      console.log(flag)
    },
    commit() {
      var i = 0;
      this.data_s = []
      this.data_f=[]
      this.data_r=[]
      for (var i = 0; i < this.searchConfigs.length; i++) {
        var config0 = {
          resourceId: this.searchConfigs[i].resourceId,
          fields: [],
        };
        var config1 = {
          resourceId: this.searchConfigs[i].resourceId,
          searchFields: [],
        };
         var config2 = {
          resourceId: this.searchConfigs[i].resourceId,
          staticsFields: [],
        };
        for (var j = 0; j < this.searchConfigs[i].fields.length; j++) {
          var s = this.searchConfigs[i].fields[j]
          if (this.searchConfigs[i].fields[j].selected_search == true) {
            //search
            config0.fields.push({
              name: s.columnName,
              label: s.label,
            });
            }
          if (this.searchConfigs[i].fields[j].selected_field == true){
            console.log("field")
            //searchfield
            config1.searchFields.push({
              name: s.columnName,
              label: s.label2,
              orderNumber:s.orderNumber,
              maxWords:s.maxWords,
            });

          }
          
          if (this.searchConfigs[i].fields[j].selected_result == true){
            console.log("length:"+this.data_r.length)
            //searchresult
            config2.staticsFields.push({
              field: s.columnName,
              title: s.title,
              size: s.size,
              type: s.type,
            });
          }
          
        }
        this.data_s.push(config0)
        this.data_f.push(config1)
        this.data_r.push(config2)
      }
      console.log("search:")
      console.log(this.data_s)
      console.log("searchField:")
      console.log(this.data_f)
      console.log("searchResult:")
      console.log(this.data_r)
      searchConfig(this.projectId, this.data_s).then((response) => {
        console.log(response.data);
      });

      searchFieldConfig(this.projectId, this.data_f).then((response) => {
        console.log(response.data);
      });

      searchResultStatisticsConfig(this.projectId, this.data_r).then((response) => {
        console.log(response.data);
      });
    },
    getResources() {
      resources(this.projectId).then((response) => {
        this.resourceIdOptions = response.data;
      });
    },

    getColumns(index) {
      columns(this.searchConfigs[index].resourceId).then((response) => {
        console.log(response.data);
        this.searchConfigs[index].fields = [];
        for (let i = 0; i < response.data.length; i++) {
          this.searchConfigs[index].fields.push({
            columnName: response.data[i].COLUMN_NAME,
            label: "",
            selected: false,
          });
        }
        console.log;
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style scoped>

.form-list {
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  box-sizing: border-box;
  /*display: flex;*/
  border-radius: 15px
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
