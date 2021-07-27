<template>
  <div id="in">
    <el-container>
      <div class="left-wrapper">
        <div class="d-flex align-items-center">
          <label style="font-size: 15px; width: 60px">项目:</label>
          <el-select
            v-model="projectId"
            :style="{ width: '100%' }"
            clearable
            placeholder="请选择项目"
            @change="changeProject"
          >
            <el-option
              v-for="(item, index) in projectIdOptions"
              :key="index"
              :disabled="item.disabled"
              :label="item.name"
              :style="{ width: '100%' }"
              :value="item.id"
            />
          </el-select>
        </div>
        <el-aside width="auto">
          <el-menu
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            :collapse-transition="true"
            @close="handleClose"
            @open="handleOpen"
          >
            
            <el-menu-item @click="jumpTo(9)">
              <i class="el-icon-location" />
              <span slot="title">项目基础信息</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(0)">
              <i class="el-icon-location" />
              <span slot="title">基础信息配置</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(1)">
              <i class="el-icon-location" />
              <span slot="title">轮播图配置</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(2)">
              <i class="el-icon-location" />
              <span slot="title">热词配置</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(3)">
              <i class="el-icon-location" />
              <span slot="title">排行榜配置</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(4)">
              <i class="el-icon-location" />
              <span slot="title">可视化图表</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(5)">
              <i class="el-icon-location" />
              <span slot="title">分析展示配置</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(6)">
              <i class="el-icon-location" />
              <span slot="title">检索配置</span>
            </el-menu-item>
            
          </el-menu>
        </el-aside>
      </div>
      <div class="register_box">
        <el-header>配置项目</el-header>
        
        <div v-show="judge[9]">
          <Info ref="basic" @change-project="changeProject" />
        </div>
        <div v-show="judge[0]">
          <Basic ref="basic" @change-project="changeProject" />
        </div>
        <div v-show="judge[3]">
          <LeadBoard ref="leaderboard" :project-id="projectId" />
        </div>
        <div v-show="judge[1]">
          <Carousel ref="carousel" :project-id="projectId" />
        </div>
        <div v-show="judge[2]">
          <hotWord ref="hotWord" :project-id="projectId"></hotWord>
         </div>
        <div v-show="judge[4]">
          <Chart ref="chart" :project-id="projectId" />
        </div>
        <div v-show="judge[5]">
          <Nav ref="nav" :project-id="projectId"/>
       </div>
        <div v-show="judge[6]">
          <search ref="searchConfig" :project-id="projectId"></search>
          <el-button class="submit" round @click="submit"> 提交 </el-button>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>

import Basic from "./basic.vue";
import LeadBoard from "./leadboard.vue";
import Chart from "./chart.vue";
import Carousel from "./carousel.vue";
import Nav from "./nav.vue";
import Select from "./select.vue";
import search from "./searchConfigNew.vue"
import hotWord from "./hotWord.vue";
import Info from "./info.vue"
import {
  basic,
  carousel,
  leadBoard,
  panelGroup,
  category,
  articleList,
  projects
} from "../api/config";

export default {
  components: {
    Info,
    Nav,
    Basic,
    LeadBoard,
    Chart,
    // eslint-disable-next-line vue/no-unused-components
    Carousel,
    Select,
    search,  
    hotWord
    
  },
  props: [],
  data() {
    return {
      basicConfig: "",
      isCollapse: false,
      elForm: "",
      judge: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
      ],
      projectId: "",
      projectIdOptions: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    projects().then((response) => {
      this.projectIdOptions = response.data;
    });
    console.log(this.projectId);
  },
  mounted() {},
  methods: {
    
    toSelect() {
      this.$router.push("/select");
    },
    changeProject(id) {
      this.projectId = id;
      sessionStorage.setItem("projectId", id);
      console.log("projectId:"+id)
    },
    submit() {
      this.$refs.searchConfig.commit()
      
      // 导航栏配置
      this.$refs.nav.commit()
      // 基础信息配置
      const basicConfig = this.$refs.basic.basicConfig;
      const id = this.projectId
      basic(id, basicConfig).then((response) => {
        console.log(response.data);
      });
      // 轮播图配置
      const carouselConfig = this.$refs.carousel.carouselConfig;
      carousel(id, carouselConfig).then((response) => {
        console.log(response.data);
      });
      // 排行榜配置
      const leadBoardConfig = this.$refs.leaderboard.leadBoardList;
      leadBoard(id, leadBoardConfig).then((response) => {
        console.log(response);
      });
      // 可视化图表
      const categoryConfig = this.$refs.chart.chartInfo;
      category(id, categoryConfig).then((response) => {
        console.log(response.data);
      });
      // 全局配置
      panelGroup(id).then((response) => {
        console.log(response.data);
      });
      articleList(id).then((response) => {
        console.log(response.data);
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    jumpTo(n) {
      // console.log("跳转时的projectId:"+this.projectId)
      for (let i = 0; i < 10; i++) {
        if (i === n) {
          this.judge[i] = true;
          this.$set(this.judge, i, true);
        } else {
          this.judge[i] = false;
          this.$set(this.judge, i, false);
        }
      }
    },
  },
};
</script>
<style scoped>
@import "../assets/css/configure.css";

</style>
