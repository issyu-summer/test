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
                v-model="item.origin"
                :style="{ width: '100%' }"
                clearable
                placeholder="数据源"
              >
                <el-option
                  v-for="(originItem, originIndex) in item.originList"
                  :key="originIndex"
                  :label="originItem.name"
                  :value="originItem.id"
                />
              </el-select>
            </el-col>
            <el-col :span="3">
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
            </el-col>
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
          <el-checkbox-group v-model="item.hotChecked" :max="+item.num">
            <table>
              <tr>
                <td v-for="(wordItem, wordIndex) in item.hotList" :key="wordIndex">
                  <el-checkbox :label="wordItem.label">{{ wordItem.name }}</el-checkbox>
                </td>
              </tr>
            </table>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const configItem = {

}
export default {
  name: 'hotWord',
  data() {
    return {
      hotConfig: [
        {
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
      ]
    };
  },
  methods: {
    onAddItem() {
      this.hotConfig.push({
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
    }
  }
};
</script>

<style scoped>

@import "../assets/css/hotword.css";

</style>
