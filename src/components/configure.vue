<template>
  <div>
    <el-header>配置项目</el-header>
    <el-container>
      <el-aside width="auto">
        <div class="logo" />
        <el-menu
          class="el-menu-vertical-demo"
          collapse-transition="true"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">添加项目</span>
            </template>
            <el-menu-item-group> -->
          <el-menu-item @click="jumpto(0)">
            <i class="el-icon-location" />
            <span slot="title">基础信息配置</span>
          </el-menu-item>
          <el-menu-item @click="jumpto(1)">
            <i class="el-icon-location" />
            <span slot="title">轮播图配置</span>
          </el-menu-item>
          <el-menu-item @click="jumpto(2)">
            <i class="el-icon-location" />
            <span slot="title">热词配置</span>
          </el-menu-item>
          <el-menu-item @click="jumpto(3)">
            <i class="el-icon-location" />
            <span slot="title">排行榜配置</span>
          </el-menu-item>
          <el-menu-item @click="jumpto(4)">
            <i class="el-icon-location" />
            <span slot="title">可视化图表</span>
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
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <div v-if="judge[0]">
            <Basic />
          </div>
          <div v-if="judge[3]">
            <LeadBoard />
          </div>
          <div v-if="judge[1]">
            <hitmap />
          </div>
          <div v-if="judge[2]">这是热词</div>
          <div v-if="judge[4]">
            <chart />
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
import Uploadpic from './uploadpic.vue'
import Hitmap from './hitmap.vue'

export default {
  components: {
    Basic,
    LeadBoard,
    Chart,
    // eslint-disable-next-line vue/no-unused-components
    Uploadpic,
    Hitmap
  },
  props: [],
  data() {
    return {
      elForm: '',
      judge: [true, false, false, false, false]
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
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
    jumpto(n) {
      console.log(n)
      for (var i = 0; i < 5; i++) {
        if (i === n) {
          this.judge[i] = true
          this.$set(this.judge, i, true)
        } else {
          this.judge[i] = false
          this.$set(this.judge, i, false)
        }
      }
      console.log(this.judge)
    }
  }
}
</script>
<style>

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
