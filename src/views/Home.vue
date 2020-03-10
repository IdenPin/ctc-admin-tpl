<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="140">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
import dayjs from 'dayjs'
export default {
  name: 'Home',
  data () {
    const item = {
      date: dayjs().format('YYYY-MM-DD hh:mm'),
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518'
    }
    return {
      tableData: Array(30).fill(item)
    }
  }
}
</script>
<style lang="scss">
.el-table {
  padding:20px;
}
</style>
