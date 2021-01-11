<template>
  <section class="crumb-box">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'product' }">产品</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'product' }">石材</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'materiel' }"
          >大理石</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- 筛选框 -->
    <div></div>
    <!-- 物料列表 -->
    <div></div>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.crumb-box {
  padding: 20px 0 22px;
}
</style>