<template>
  <div>
    <el-header>配置项目</el-header>
    <el-container>
      <el-aside width="auto">
        <div class="logo" />
        <el-menu
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          collapse-transition="true"
          @close="handleClose"
          @open="handleOpen"
        >
          <!-- <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">添加项目</span>
                  </template>
                  <el-menu-item-group> -->
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
          <!-- </el-menu-item-group>
                </el-submenu> -->
          <!-- <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">添加项目</span>
                  </template>
                </el-submenu> -->
        </el-menu>
      </el-aside>
      <div class="register_box">
        <el-form
          ref="elForm"
          label-width="100px"
          size="medium"
        >
          <div v-show="judge[0]">
            <Basic ref="basic" @change-project="changeProject" />
          </div>
          <div v-show="judge[3]">
            <LeadBoard ref="leaderboard" :project-id="projectId" />
          </div>
          <div v-show="judge[1]">
            <Carousel ref="carousel" :project-id="projectId" />
          </div>
          <div v-show="judge[2]">这是热词</div>
          <div v-show="judge[4]">
            <chart ref="chart" :project-id="projectId" />
          </div>
          <div v-show="judge[5]">
            <Nav ref="nav" />
            <div>
              <el-button class="submit" round @click="submit">
                提交
              </el-button>
            </div>
          </div>
        </el-form>
      </div>
    </el-container>
  </div>
</template>
<script>
import Basic from './basic.vue'
import LeadBoard from './leadboard.vue'
import Chart from './chart.vue'
import Carousel from './carousel.vue'
import Nav from './nav'
import { basic } from '../api/config'

export default {
  components: {
    Nav,
    Basic,
    LeadBoard,
    Chart,
    // eslint-disable-next-line vue/no-unused-components
    Carousel
  },
  props: [],
  data() {
    return {
      basicConfig: '',
      isCollapse: false,
      elForm: '',
      judge: [true, false, false, false, false, false],
      projectId: ''
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    changeProject(id) {
      this.projectId = id
    },
    submit() {
      const basicConfig = this.$refs.basic.basicConfig
      const id = this.$refs.basic.projectId
      basic(id, basicConfig).then(response => {
        console.log(response.data)
      })
      // const leadBoardList = this.$refs.leaderboard.leadBoardList
    },
    logoBeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      const isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },
    submitUploadLogo() {
      this.$refs['logo'].submit()
    },
    bannerBeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      const isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },
    submitUploadBanner() {
      this.$refs['banner'].submit()
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    toggleCollapse() {
      console.log(123456789)

      this.isCollapse = !this.isCollapse
    },
    jumpTo(n) {
      for (let i = 0; i < 6; i++) {
        if (i === n) {
          this.judge[i] = true
          this.$set(this.judge, i, true)
        } else {
          this.judge[i] = false
          this.$set(this.judge, i, false)
        }
      }
    }
  }
}
</script>
<style scoped>
.register_box {
  width: 900px;
  height: 250px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

</style>
