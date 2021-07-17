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

    <div class="form-wrapper">
      <div v-for="(item, index) in carouselConfig" :key="index" class="form-list">
        <div class="in">
          <el-row>
            <el-col :span="4">
              <div class="button-box">
                <template v-if="index === carouselConfig.length - 1">
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
                  <label>数据表:</label>
                </el-col>
                <el-col :span="4">
                  <el-select
                    v-model="item.resourceId"
                    :style="{ width: '100%' }"
                    clearable
                    placeholder="数据表"
                  >
                    <el-option
                      v-for="(resource, resourceIndex) in resourceIdOptions"
                      :key="resourceIndex"
                      :disabled="item.disabled"
                      :label="resource.name"
                      :value="resource.id"
                    />
                  </el-select>
                </el-col>
                <el-col :span="3">
                  <label>关键字</label>
                </el-col>
                <el-col :span="4">
                  <el-input
                    v-model="item.keyword"
                    placeholder="关键词"
                    clearable
                    :style="{ width: '100%' }"
                  />
                </el-col>
                <el-col :span="3">
                  <label>图片:</label>
                </el-col>
                <el-col :span="4">
                  <el-upload
                    list-type="picture"
                    :action="carouselAction"
                    :auto-upload="true"
                    :on-success="(resp,file,fileList)=>{carouselSuccess(resp,file,fileList,item)}"
                    :on-remove="carouselRemove"
                  >
                    <el-button
                      v-if="!item.url"
                      size="small"
                      type="primary"
                      icon="el-icon-upload"
                    >点击上传</el-button>
                  </el-upload>
                </el-col>
              </el-row>
              <el-row class="d-flex align-items-center">
                <el-col :span="4" >
                  <label>SQL数据源:</label>
                </el-col>
                <el-col :span="14">
                  <div class="sql">
                    <el-input v-model="item.sql" />
                  </div>
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
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
// import { resources } from '../api/config'

export default {
  props: ['projectId'],
  data() {
    return {
      carouselAction: 'http://101.37.20.199:8080/image',
      carouselConfig: [
        {
          resourceId: 123456,
          table: '',
          keyword: '',
          url: '',
          sql: ''
        }
      ],
      resourceIdOptions: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ],
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
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {},
  watch: {
    projectId(n) {
      if (n) {
        this.getResources()
      }
    }
  },
  created() {},
  mounted () {
  },
  methods: {
    carouselSuccess(response, file, fileList, item) {
      item.url = 'http://101.37.20.199:22000/' + response.fullPath
    },
    carouselRemove() {

    },
    getResources() {
      // resources(this.projectId).then((response) => {
      //   this.resourceIdOptions = response.data
      // })
    },
    onAddFormItem() {
      this.carouselConfig.push({
        resourceId: 123456,
        table: '',
        keyword: '',
        url: '',
        sql: ''
      })
    },
    onDeleteFormItem(index) {
      this.carouselConfig.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.form-list {
  background: #fff;
  margin: 10px 0;
  padding: 10px 0;
}

.swiper-container {
  width: 960px;
  height: 180px;
  margin-bottom: 40px;
  border: 1px solid #ccc;
}

.swiper-slide, .swiper-slide img {
  width: 320px;
  height: 180px;
}

.el-row{
  margin-bottom: 15px;
  /*width:  900px;*/
  /*height: 30px;*/
}
.in /deep/ .el-input__inner {
  border-radius: 15px;
  width: 130px;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
.sql /deep/ .el-input__inner {
  border-radius: 10px;
  width: 100%;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
</style>
