<template>
  <div>
    <el-header>配置项目</el-header>
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu
          class="el-menu-vertical-demo"
          collapse-transition="true"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">添加项目</span>
            </template>
            <el-menu-item-group> -->
          <el-menu-item @click="jumpto(0)">
            <i class="el-icon-location"></i>
            <span slot="title">基础信息配置</span>
          </el-menu-item>
          <el-menu-item @click="jumpto(1)">
            <i class="el-icon-location"></i>
            <span slot="title">轮播图配置</span>
          </el-menu-item>
          <el-menu-item @click="jumpto(2)">
            <i class="el-icon-location"></i>
            <span slot="title">热词配置</span>
          </el-menu-item>
          <el-menu-item @click="jumpto(3)">
            <i class="el-icon-location"></i>
            <span slot="title">排行榜配置</span>
          </el-menu-item>
          <el-menu-item @click="jumpto(4)">
            <i class="el-icon-location"></i>
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
    </el-container>

    <div class="register_box">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <div v-if="judge[0]">
          <jichu></jichu>
          <!-- </el-form> -->
        </div>
        <div v-if="judge[3]">
          <!-- <el-form> -->
          <paihang></paihang>
          <!-- </el-form> -->
        </div>
        <div v-if="judge[1]">
          <hitmap></hitmap>
        </div>
        <div v-if="judge[2]">这是热词</div>
        <div v-if="judge[4]">
          <chart></chart>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import jichu from "./basic.vue";
import paihang from "./ranking.vue";
import uploadpic from "./uploadpic.vue"
import Chart from './chart.vue';
import Uploadpic from './uploadpic.vue';
import hitmap from './hitmap.vue'
import Hitmap from './hitmap.vue';
export default {
  components: {
    jichu,
    paihang,
    Chart,
    Uploadpic,
    Hitmap,
  },
  props: [],
  data() {
    return {
      elForm: "",
      judge: [true, false, false, false, false],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    logoBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      let isAccept = new RegExp("image/*").test(file.type);
      if (!isAccept) {
        this.$message.error("应该选择image/*类型的文件");
      }
      return isRightSize && isAccept;
    },
    submitUpload() {
      this.$refs["logo"].submit();
    },
    bannerBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      let isAccept = new RegExp("image/*").test(file.type);
      if (!isAccept) {
        this.$message.error("应该选择image/*类型的文件");
      }
      return isRightSize && isAccept;
    },
    submitUpload() {
      this.$refs["banner"].submit();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleCollapse() {
      console.log(123456789);

      this.isCollapse = !this.isCollapse;
    },
    jumpto(n) {
      console.log(n);
      for (var i = 0; i < 5; i++) {
        if (i == n) {
          this.judge[i] = true;
          this.$set(this.judge, i, true);
        } else {
          this.judge[i] = false;
          this.$set(this.judge, i, false);
        }
      }
      console.log(this.judge);
    },
  },
};
</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

.register_box {
  width: 500px;
  height: 250px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.btn {
  position: absolute;
  left: 120%;
  top: 40%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.el-menu-admin:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
}
.el-header {
  background-color: rgb(68, 149, 255);
  
}
.el-main {
  background-color: #f20;
}
.toggle {
  font-size: 36px;
  color: #989898;
  cursor: pointer;
  line-height: 30px;
}
</style>
