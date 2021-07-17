<template>
  <div>
    <table>
      <tr>
        <th>项目名称</th>
        <th>项目ID</th>
        <th>作者</th>
        <th>名称</th>
      </tr>
      <tr v-for="n in 4" :key="n">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
  table {
    text-align: center;
    margin: 0 auto;
  }
  th, td {
    border: 1px solid #fff;
    padding: 20px 25px;
    color: #fff;
  }
</style>
