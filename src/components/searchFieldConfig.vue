<template>
  <div class="searchFieldSettingBox">
    <div
      v-for="(item, index) in searchFieldConfig"
      :key="index"
      class="form-list"
    >
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
              :data="item.searchFields"
              style="width: 100%"
              max-height="250"
            >
              <el-table-column fixed prop="date" label="name" width="150">
                <template slot-scope="scope">
                  <el-checkbox
                    v-model="scope.row.selected"
                    ><span style="margin-left: 10px">{{
                      scope.row.name
                    }}</span></el-checkbox
                  >
                </template>
              </el-table-column>
              <el-table-column prop="name" label="label" width="180">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.label"
                    v-if="scope.row.selected"
                    placeholder="请输入字段名称"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="number" label="orderNumber" width="180">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.orderNumber"
                      v-if="scope.row.selected"
                      :maxlength="255"
                      :style="{ width: '100%' }"
                      clearable
                      placeholder="请输入字段顺序"
                      prefix-icon="el-icon-mobile"
                    />
                  </template>
              </el-table-column>
              <el-table-column label="maxWords" width="180">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.maxWords"
                      v-if="scope.row.selected"
                      :maxlength="255"
                      :style="{ width: '100%' }"
                      clearable
                      placeholder="请输入最大长度"
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
import { searchFieldConfig, columns, resources } from "../api/config";
export default {
  components: {},
  props: ['projectId'],
  data() {
    return {
      searchFieldConfig: [
        {
          resourceId: "",
          searchFields: [
            {
              name: "author",
              label: "",
              orderNumber: "",
              maxWords: "",
              selected: false
            },
            {
              name: "title",
              label: "",
              orderNumber: "",
              maxWords: "",
              selected:false
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
      orderNumberOptions: [
        {
          name: "1",
          id: 1,
        },
      ],
      data:[]
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
  created() {},
  mounted() {},
  methods: {
    changeresourceId(index) {
      console.log(index)
      this.getColumns(index)
    },
    onAddFormItem() {
      this.searchFieldConfig.push({
        resourceId: "",
        searchFields: [
          {
            name: "",
            label: "",
            orderNumber: "",
            maxWords: "",
          },
        ],
      });
    },
    onDeleteFormItem(index) {
      this.searchFieldConfig.splice(index, 1);
    },
    onAddSubLever(index) {
      this.searchFieldConfig[index].searchFields.push({
        name: "",
        label: "",
        orderNumber: "",
        maxWords: "",
      });
    },
    onDeleteSubLevel(index, index2) {
      this.searchFieldConfig[index].searchFields.splice(index2, 1);
    },
    getResources() {
      resources(this.projectId).then((response) => {
        this.resourceIdOptions = response.data
      })
    },
    getColumns(index) {
      columns(this.searchFieldConfig[index].resourceId).then(response => {
        console.log(response.data)
        this.searchFieldConfig[index].searchFields = []
        for(let i = 0; i < response.data.length; i++){
          this.searchFieldConfig[index].searchFields.push({
            name: response.data[i].COLUMN_NAME,
            label:'',
            orderNumber:'',
            maxWords:'',
            selected: false
          })
        }
        console.log
        this.$forceUpdate()
      })
    },
    commit() {
      var i = 0;
      this.data = [];
      for (i = 0; i < this.searchFieldConfig.length; i++) {
        var config = {
          resourceId: this.searchFieldConfig[i].resourceId,
          searchFields: [],
        };
        for (var j = 0; j < this.searchFieldConfig[i].searchFields.length; j++) {
          if (this.searchFieldConfig[i].searchFields[j].selected == true) {
            config.searchFields.push({
              name: this.searchFieldConfig[i].searchFields[j].name,
              label: this.searchFieldConfig[i].searchFields[j].label,
              orderNumber:this.searchFieldConfig[i].searchFields[j].orderNumber,
              maxWords:this.searchFieldConfig[i].searchFields[j].maxWords,
            });
          }
        }
        //console.log(config.fields)
        this.data.push(config);
      }
      console.log(this.data)
      // console.log(this.searchFieldConfig)
      searchFieldConfig(111, this.data).then((response) => {
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
