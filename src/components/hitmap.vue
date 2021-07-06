<template>
  <div class="map-wrapper">
      <el-form-item label="选择图片" prop="map" required>
        <el-upload
          ref="map"
          :file-list="mapfileList"
          :action="mapAction"
          :auto-upload="false"
          :before-upload="mapBeforeUpload"
          list-type="picture"
          accept="image/*"
          limit="5"
        >
          <el-button size="small" type="primary" icon="el-icon-upload"
            >点击上传</el-button>
        </el-upload>
      </el-form-item>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        map: null,
      },
 
      mapAction: 'https://jsonplaceholder.typicode.com/posts/',
      mapfileList: [],

    };
  },

computed:{},
watch:{},
mounted:{},
methods:{},
};
</script>

<style scoped>
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

.map-wrapper {
  width: 600px;
  display: flex;
}

</style>