<template>
  
    <div class="setting-box">
    <swiper :options="swiperOption" ref="mySwiper">
      <div class="swiper-slide">
        <img src="../assets/images/Bubblechart.png" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../assets/images/Histogram.png" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../assets/images/linechart.png" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../assets/images/piechart.png" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../assets/images/Radarchart.png" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../assets/images/relationchart.png" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../assets/images/Scatterplot.png" alt="">
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>

    <div v-for="(item,index) in navConfig" :key="index" class="form-list">
      <div class="in">
        <el-row class="item1-box">
          <el-col :span="4">
            <div class="button-box">
              <template v-if="index === navConfig.length - 1">
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
                <label>导航栏名称:</label>
              </el-col>
              <el-col :span="7">
                <el-input v-model="item.name" />
              </el-col>
              <el-col :span="3">
                <label>父导航栏:</label>
              </el-col>
              <el-col :span="7">
                <el-select v-model="item.parent">
                  <el-option
                    v-for="(nav,navIndex) in navConfig"
                    :key="navIndex"
                    :label="nav.name"
                    :value="nav.name"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="item2-box" v-for="(item2, index2) in item.widgets" :key="index + index2 + '_item2'">
          <el-row class="d-flex">
            <el-col :span="4">
              <div class="button-box">
                <template v-if="index === navConfig.length - 1">
                  <el-button
                    circle
                    class="plus"
                    icon="el-icon-plus"
                    size="medium"
                    type="primary"
                    @click="addSubLevel(index)"
                  />
                </template>
                <template v-if="index2">
                  <el-button
                    circle
                    class="del"
                    icon="el-icon-minus"
                    size="medium"
                    type="danger"
                    @click="onDeleteSubLevel(index,index2)"
                  />
                </template>
              </div>
            </el-col>
            <el-col :span="20">
              <el-row class="d-flex align-items-center">
                <el-col :span="3">
                  <label>组件类型:</label>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="item2.type">
                    <el-option
                      v-for="(type,typeIndex) in types"
                      :key="typeIndex"
                      :disabled="false"
                      :label="type.name"
                      :value="type.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="3">
                  <label>组件名称:</label>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="item2.name" />
                </el-col>
                <el-col :span="3">
                  <label>图表类型:</label>
                </el-col>
                <el-col :span="4">
                  <el-select v-model="item2.config.chartType">
                    <el-option
                      v-for="(chartType,chartTypeIndex) in chartTypes"
                      :key="chartTypeIndex"
                      :disabled="false"
                      :label="chartType.name"
                      :value="chartType.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="3">
                  <el-checkbox 
                  v-model="item2.useSQL"
                  >使用sql组件</el-checkbox>
                </el-col>
              </el-row>
              <el-row class="d-flex align-items-center">
                <el-col :span="3">
                  <label>描述:</label>
                </el-col>
                <el-col :span="8">
                  <el-input class="input-100" v-model="item2.example" />
                </el-col>
              </el-row>
              <el-row  class="d-flex align-items-center">
              <el-col v-if="useSQL==false">
                <el-col :span="4" >
                  <label>SQL数据源:</label>
                </el-col>
                <el-col :span="14">
                  <div class="sql">
                    <el-input v-model="item.sql" />
                  </div>
                </el-col>
              </el-col>
              <el-col v-else-if="useSQL==true">
                 <sql></sql>
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
import {addNav} from "../api/config";
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import sql from "./sqlcomponents.vue";

export default {
  name: 'Nav',
  props: ["projectId"],
  components: {
     swiper,
    swiperSlide,
    sql,
  },
  data() {
    return {
      useSQL: false,
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        slidesPerView: 3,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      chartTypes: [{
        'name': '折线图',
        'value': 0
      }, {
        'name': '柱状图',
        'value': 1
      }, {
        'name': '关系图',
        'value': 2
      }, {
        'name': '气泡图',
        'value': 3
      }],
      types: [{
        'name': '文本组件',
        'value': 0
      }, {
        'name': '表格组件',
        'value': 1
      }, {
        'name': '图表组件',
        'value': 2
      }],
      sql: '',
      order: 1,
      navConfig: [{
        'name': '导航栏1',
        'parent': '',
        'widgets': [{
          'type': '',
          'name': '',
          'example': '',
          'dataSource': '',
          'config': {
            'chartType': ''
          }
        }]
      }],
    }
  },
  methods: {
    onAddFormItem() {
      this.navConfig.push({
        'name': '',
        'parent': '',
        'widgets': [{
          'type': '',
          'name': '',
          'dataSource': '',
          'config': {
            'chartType': ''
          }
        }]
      })
    },
    onDeleteFormItem(index) {
      this.navConfig.splice(index, 1)
    },
    addSubLevel(index) {
      this.navConfig[index].widgets.push({
        'type': '',
        'name': '',
        'dataSource': '',
        'config': {
          'chartType': ''
        }
      })
    },
    onDeleteSubLevel(index, index2) {
      this.navConfig[index].widgets.splice(index2, 1)
    },
    commit(){
      console.log(this.navConfig)
      console.log(this.projectId)
      addNav(this.projectId, this.navConfig).then((response) => {
        console.log(response.data);
      });
    },
  }
}
</script>

<style scoped>
@import "../assets/css/nav.css";
</style>
