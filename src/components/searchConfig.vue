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
            <el-table-column fixed prop="date" label="name" width="150">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.selected"
                  @change="insert(scope.row.selected, scope)"
                  ><span style="margin-left: 10px">{{
                    scope.row.columnName
                  }}</span></el-checkbox
                >
              </template>
            </el-table-column>
            <el-table-column prop="name" label="label" width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.label" v-if="scope.row.selected" placeholder="请输入字段名称"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
      </div>
    </div>
    <!-- <el-button @click="commit()">提交</el-button> -->
  </div>
</template>

<script>
import { searchConfig, columns, resources } from "../api/config";
export default {
  components: {},
  props: ['projectId'],
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
              selected: false,
            },
            {
              columnName: "title",
              label: "",
              selected: false,
            },
          ],
        },
      ],
      tableData: [
        {
          resourceId: "",
          fields: [
            {
              columnName: "author",
              label: "作者",
              selelted: false,
            },
            {
              columnName: "title",
              label: "",
              selelted: false,
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

      data: [],
    };
  },
  computed: {},
  watch: {
    projectId(n) {
      if (n) {
        this.getResources()
        console.log(this.resourceIdOptions)
      }
    }
  },
  created() {
    this.getResources()
  },
  mounted() {},
  methods: {
    changeresourceId(index) {
      console.log(index)
      this.getColumns(index)
    },
    boxChange(index) {
      console.log(index);
    },
    onAddFormItem() {
      this.searchConfigs.push({
        resourceId: "",
        fields: [
          {
            columnName: "",
            label: "",
          },
        ],
      });
    },
    onDeleteFormItem(index) {
      this.searchConfigs.splice(index, 1);
    },
    onAddSubLever(index) {
      this.searchConfigs[index].fields.push({
        columnName: "",
        label: "",
      });
    },
    onDeleteSubLevel(index, index2) {
      this.searchConfigs[index].fields.splice(index2, 1);
    },

    insert(flag, field) {
      // console.log(flag)
      // console.log(this.searchConfigs[0].fields)
    },
    commit() {
      var i = 0;
      this.data = [];
      for (i = 0; i < this.searchConfigs.length; i++) {
        var config = {
          resourceId: this.searchConfigs[0].resourceId,
          fields: [],
        };
        for (var j = 0; j < this.searchConfigs[i].fields.length; j++) {
          if (this.searchConfigs[i].fields[j].selected == true) {
            config.fields.push({
              name: this.searchConfigs[i].fields[j].columnName,
              label: this.searchConfigs[i].fields[j].label,
            });
          }
        }
        //console.log(config.fields)
        this.data.push(config);
      }
      console.log(this.data);
      searchConfig(this.projectId, this.data).then((response) => {
        console.log(response.data);
      });
    },
    getResources() {
      resources(this.projectId).then((response) => {
        this.resourceIdOptions = response.data
      })
    },

    getColumns(index) {
      columns(this.searchConfigs[index].resourceId).then(response => {
        console.log(response.data)
        this.searchConfigs[index].fields = []
        for(let i = 0; i < response.data.length; i++){
          this.searchConfigs[index].fields.push({
            columnName: response.data[i].COLUMN_NAME,
            label:'',
            selected: false
          })
        }
        console.log
        this.$forceUpdate()
      })
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

.el-table {
  /* margin-left: 20%; */
}
</style>
