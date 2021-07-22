<template>
  <div class="hot-page d-flex">
    <div>
      <table>
        <tr>
          <th>list1</th>
          <th>list2</th>
          <th>list3</th>
        </tr>
        <tr v-for="n in 3" :key="n">
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="right-box">
      <el-row class="d-flex align-items-center">
        <el-col :span="10">
          <label>热词数量:</label>
        </el-col>
        <el-col :span="14">
          <!-- <el-select
            v-model="form.hotNum"
            :style="{ width: '100%' }"
            clearable
            placeholder="选择热词数量"
            @change="changeResourceId($event, index)"
          >
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
          </el-select> -->
          <el-input
            v-model="form.num"
            placeholder="请输入配置热词的数量"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="d-flex align-items-center mt-4">
        <el-col :span="10">
          <label>数据源:</label>
        </el-col>
        <el-col :span="14">
          <el-select
            v-model="form.origin"
            :style="{ width: '100%' }"
            clearable
            placeholder="选择数据源"
          >
            <el-option label="数据源1" value="1" />
            <el-option label="数据源2" value="2" />
          </el-select>
        </el-col>
      </el-row>
      <div class="img-box">
        <img src="../assets/images/word.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["projectId"],
  name: "hotWord",
  data() {
    return {
      form: {
        num: "",
        origin: "",
      },
    };
  },
  watch: {
    projectId(n) {
      if (n) {
        //重新加载数据源
      }
    },
  },
  created() {
    //读取数据源
  },
  methods: {
    getResource() {
      //获取数据源
    },
  },
};
</script>

<style scoped>
.hot-page {
  justify-content: center;
}
table {
  text-align: center;
}
th,
td {
  border: 1px solid #fff;
  padding: 20px 25px;
  color: #fff;
}

.right-box {
  margin-left: 100px;
  color: #fff;
}

.mt-4 {
  margin-top: 20px;
}

.img-box {
  width: 300px;
  margin-top: 40px;
}

.img-box img {
  width: 100%;
}
</style>
