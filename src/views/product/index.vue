<template>
  <section>
    <!-- 面包屑 -->
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product' }">产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 筛选框 -->
    <div class="classify-box">
      <!-- 一级分类 -->
      <div class="d-flex">
        <div class="cl-tit">一级分类：</div>
        <div class="cl-ul d-flex flex-wrap">
          <div
            class="cl-li"
            @click="getSecond(fl.categoryId)"
            v-for="(fl, inx) in firstList"
            :key="inx"
          >
            {{ fl.categoryName }}
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div>
          <!-- 二级分类 -->
          <div class="d-flex">
            <div class="cl-tit">二级分类：</div>
            <div class="cl-ul d-flex flex-wrap">
              <div class="cl-li" v-for="(sl, inx) in secondList" :key="inx">
                {{ sl.categoryName }}
              </div>
            </div>
          </div>
          <!-- 三级分类 -->
          <div class="d-flex">
            <div class="cl-tit">一级分类：</div>
            <div class="cl-ul d-flex flex-wrap">
              <div class="cl-li" v-for="(fl, inx) in firstList" :key="inx">
                {{ fl.categoryName }}
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="cl-tit">一级分类：</div>
            <div class="cl-ul d-flex flex-wrap">
              <div class="cl-li" v-for="(fl, inx) in firstList" :key="inx">
                {{ fl.categoryName }}
              </div>
            </div>
          </div>
        </div>
        <div class="close-classify">收起筛选</div>
      </div>
    </div>
    <!-- 物料列表 -->
    <div class="mater-ul"></div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      firstList: [],
      secondList: [],
    };
  },
  mounted() {
    this.getFirst();
  },
  methods: {
    getFirst() {
      this.axios({
        url: "/product/category/first",
        headers: { Authorization: "" },
      }).then((res) => {
        res.data.unshift({
          categoryName: "全部",
          categoryId: "",
        });
        this.firstList = res.data;
      });
    },
    getSecond(id) {
      this.axios({
        url: "/product/category/second",
        params: {
          handlerName: "secondCategoryHandler",
          params: {
            categoryId: id,
          },
        },
        headers: { Authorization: "" },
      }).then((res) => {
        res.data.unshift({
          categoryName: "全部",
          categoryId: "",
        });
        this.secondList = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/color';
.classify-box {
  padding: 14px 34px;
  background: #fff;
  border-radius: 8px;
  font: 12px/17px "aliPHM";
  .cl-tit {
    padding: 10px 0;
    width: 60px;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .cl-ul {
    padding-left: 20px;
    .cl-li {
      padding: 10px 12px;
    }
  }
  .close-classify{
      padding: 10px 12px;
      white-space: nowrap;
      color: $primary-color;
  }
}
</style>