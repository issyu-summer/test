<template>
  <div class="hot-page">
    <div v-for="(item, index) in hotConfig" :key="index" class="item-box">
      <el-row :gutter="24">
        <el-col :span="4">
          <div class="button-box">
            <template v-if="index === hotConfig.length - 1">
              <el-button
                circle
                class="plus"
                icon="el-icon-plus"
                size="medium"
                type="primary"
                @click="onAddItem"
              />
            </template>
            <template v-if="index">
              <el-button
                circle
                class="del"
                icon="el-icon-minus"
                size="medium"
                type="danger"
                @click="onDeleteItem(index)"
              />
            </template>
          </div>
        </el-col>
        <el-col :span="20">
          <el-row class="d-flex align-items-center">
            <el-col :span="3">
              <label>数据源：</label>
            </el-col>
            <el-col :span="4">
              <el-select
                v-model="item.resourceId"
                :style="{ width: '100%' }"
                clearable
                placeholder="数据源"

              >
                <el-option
                  v-for="(originItem, originIndex) in resourceIdOptions"
                  :key="originIndex"
                  :label="originItem.name"
                  :value="originItem.id"
                />
              </el-select>
            </el-col>
            <!-- <el-col :span="3">
              <label>数量：</label>
            </el-col>
            <el-col :span="4">
              <el-input
                @change="onNumChange(item)"
                v-model="item.num"
                placeholder="数量"
                clearable
                :style="{ width: '100%' }"
              />
            </el-col> -->
            <el-col :span="3">
              <label>名称：</label>
            </el-col>
            <el-col :span="4">
              <el-input
                v-model="item.name"
                placeholder="名称"
                clearable
                :style="{ width: '100%' }"
              />
            </el-col>
          </el-row>
            <table>
              <tr>
                <td v-for="(wordItem, wordIndex) in item.hotList" :key="wordIndex">
                  <el-checkbox :label="wordItem.label" v-model="item.hotChecked[wordIndex]">{{ wordItem.name }}</el-checkbox>
                </td>
              </tr>
            </table>
        </el-col>
      </el-row>
    </div>
    <el-button @click="commit">提交</el-button>
  </div>
</template>

<script>
import {addTag} from "../api/config";
const configItem = {

}
export default {
  name: 'hotWord',
  data() {
    return {
      hotConfig: [
        {
          resourceId:'',
          origin: '',
          originList: [],
          num: '',
          name: '',
          hotChecked: [],
          hotList: [
            { name: 'word 1', label: 1 },
            { name: 'word 2', label: 2 },
            { name: 'word 3', label: 3 },
            { name: 'word 4', label: 4 },
            { name: 'word 5', label: 5 },
            { name: 'word 6', label: 6 },
            { name: 'word 7', label: 7 },
            { name: 'word 8', label: 8 },
            { name: 'word 9', label: 9 },
            { name: 'word 10', label: 10 },
            { name: 'word 11', label: 11 },
            { name: 'word 12', label: 12 },
            { name: 'word 13', label: 13 },
            { name: 'word 14', label: 14 },
            { name: 'word 15', label: 15 }
          ]
        }
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
    };
  },
  created(){
    console.log("hotword")
    addTag().then((response) => {
        console.log(response.data)
        var i = 0
        for(i = 0; i < response.data.length; i++){
          this.hotConfig[i].hotList = response.data[i].hotList
          this.resourceIdOptions.push(response.data[i].resource)
        }
      });
      console.length(this.hotConfig)
  },
  methods: {
    onAddItem() {
      this.hotConfig.push({
        resourceId:'',
        origin: '',
        originList: [],
        num: '',
        name: '',
        hotChecked: [],
        hotList: [
          { name: 'word 1', label: 1 },
          { name: 'word 2', label: 2 },
          { name: 'word 3', label: 3 },
          { name: 'word 4', label: 4 },
          { name: 'word 5', label: 5 },
          { name: 'word 6', label: 6 },
          { name: 'word 7', label: 7 },
          { name: 'word 8', label: 8 },
          { name: 'word 9', label: 9 },
          { name: 'word 10', label: 10 },
          { name: 'word 11', label: 11 },
          { name: 'word 12', label: 12 },
          { name: 'word 13', label: 13 },
          { name: 'word 14', label: 14 },
          { name: 'word 15', label: 15 }
        ]
      });
    },
    onDeleteItem(index) {
      this.hotConfig.splice(index, 1);
    },
    onNumChange(item) {
      item.hotChecked = []
    },
    commit(){
      var i = 0
      var result = []
      for(i = 0; i< this.hotConfig.length; i++){
        var config = {
          'resourceId':this.hotConfig[i].resourceId,
          'name':this.hotConfig[i].name,
          'tags':[]
        }
        var j = 0
        var tag = []
        for(j = 0; j < this.hotConfig[i].hotList.length; j++){
          if(this.hotConfig[i].hotChecked[j] == true) {
            tag.push(this.hotConfig[i].hotList[j].name)
          }
        }
        config.tags = tag
        result.push(config)
      }
      console.log(result)
    }
  }
};
</script>

<style scoped>

@import "../assets/css/hotword.css";

</style>
