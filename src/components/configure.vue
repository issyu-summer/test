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
            <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
            <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item v-for="(item,index) in bos" :key="index" @click="jumpTo(index)">
              <el-button @click="test">+</el-button>
              选项1
            </el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item> -->
            <!-- </el-menu-item-group>
          </el-submenu> -->
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
              <span slot="title">导航栏配置</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(6)">
              <i class="el-icon-location" />
              <span slot="title">search配置</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(7)">
              <i class="el-icon-location" />
              <span slot="title">searchField配置</span>
            </el-menu-item>
            <el-menu-item @click="jumpTo(8)">
              <i class="el-icon-location" />
              <span slot="title">searchResultStatistics配置</span>
            </el-menu-item>
            <!-- <el-menu-item @click="toSelect">
              <i class="el-icon-location" />
              <span slot="title">页面选择</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
      </div>
      <div class="register_box">
        <el-header>配置项目</el-header>
        <!-- <el-form
          ref="elForm"
          label-width="100px"
          size="medium"
        > -->
        <!-- <div v-for="(item1,index1) in vos" :key="index1">
            <Carousel ref="carousel" :project-id="projectId" v-show="judge[index1]"/>
            <Basic ref="basic" @change-project="changeProject" />
          </div> -->
        <!-- <div v-if="judge[1]">
            <Basic ref="basic" @change-project="changeProject" />
          </div>
          <div v-if="judge[2]">
            <Basic ref="basic" @change-project="changeProject" />
          </div>
          <div v-if="judge[3]">
            <Basic ref="basic" @change-project="changeProject" />
          </div>-->
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
          <!-- <search ref="search" :project-id="projectId" /> -->
          <SearchConfig ref="searchConfig" :project-id="projectId"></SearchConfig>
        </div>
        <div v-show="judge[7]">
          <!-- <search-field ref="search-field" :project-id="projectId" /> -->
          <SearchFieldConfig ref="searchFieldConfig" :project-id="projectId"></SearchFieldConfig>
        </div>
        <div v-show="judge[8]">
          <!-- <search-result-statistics
            ref="search-result-statistics"
            :project-id="projectId"
          /> -->
          <SearchResultStatisticsConfig ref="searchResultStatisticsConfig" :project-id="projectId"></SearchResultStatisticsConfig>
          <div>
            <el-button class="submit" round @click="submit"> 提交 </el-button>
          </div>
        </div>
        <!-- </el-form> -->
      </div>
    </el-container>
  </div>
</template>
<script>
import Info from "./info.vue";
import Basic from "./basic.vue";
import LeadBoard from "./leadboard.vue";
import Chart from "./chart.vue";
import Carousel from "./carousel.vue";
import Nav from "./nav.vue";
import Select from "./select.vue";
import Search from "./search.vue";
import SearchField from "./searchField.vue";
import SearchResultStatistics from "./SearchResultStatistics.vue";
import SearchConfig from "./searchConfig.vue";
import SearchFieldConfig from "./searchFieldConfig.vue";
import SearchResultStatisticsConfig from "./searchResultStatisticsConfig.vue";
import hotWord from "./hotWord.vue";
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
    Search,
    SearchField,
    SearchResultStatistics,
    SearchConfig,
    SearchFieldConfig,
    SearchResultStatisticsConfig,
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
      projectIdOptions: [
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
    // test(){
    //     this.bos.push({
    //     name:"",
    //   })
    //   this.vos.push({
    //     name:"",
    //   })
    //   this.i++
    //   // this.$set(this.judge, this.i, true)

    // },
    toSelect() {
      this.$router.push("/select");
    },
    changeProject(id) {
      this.projectId = id;
      sessionStorage.setItem("projectId", id);
      console.log("projectId:"+id)
    },
    submit() {
      // 搜索配置
      this.$refs.searchConfig.commit()
      this.$refs.searchFieldConfig.commit()
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
.left-wrapper {
  margin: 30px 0 0 10px;
}

.el-aside {
  margin-top: 20px;
}

#in {
  background: url("../assets/images/1.jpg");
  width: 100%;
  height: 100%;
  /* position: fixed; */
  background-size: 100% 100%;
}
.el-header {
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
}
.el-containter {
  display: flex;
}
.el-menu-item {
  text-align: left;
}
.register_box {
  /* width: 900px; */
  /* background-image: url('../assets/images/background.jpg');
  background-size: 100% auto; */
  flex: 1;
  /* height: 250px; */
  /* background-color: #fff; */
  border-radius: 5px;
  padding: 30px;
  /* position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%); */
}
</style>
