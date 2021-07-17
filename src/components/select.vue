<template>
  <div class="select-wrapper">
    <div class="select-box" @click="toConfig">自定义</div>
    <div class="select-box">默认</div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    toConfig() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.select-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;
}

.select-box {
  width: 300px;
  height: 160px;
  line-height: 160px;
  color: #fff;
  background-color: #ccc;
  margin: 0 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: 30px;
}
</style>
