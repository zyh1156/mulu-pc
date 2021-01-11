<template>
  <div>
    <hdiv />
    <!-- 走马灯 -->
    <el-carousel indicator-position="outside" height="600px">
      <el-carousel-item
        :tilte="sl.sliderTitle"
        v-for="(sl, inx) in sliderList"
        :key="inx"
      >
        <img :src="sl.sliderImg" :alt="sl.sliderTitle" />
      </el-carousel-item>
    </el-carousel>
    <section class="container">
      <!-- 专属推荐 -->
      <recommend :comlist="productList" />
      <!-- 友情链接 -->
      <link-list :links="links" />
    </section>
    <fdiv />
  </div>
</template>

<script>
import hdiv from "@/components//header";
import recommend from "../components/index/recommend";
import linkList from "@/components/index/linkList";
import fdiv from "@/components/footer";
export default {
  name: "Index",
  components: {
    hdiv,
    recommend,
    linkList,
    fdiv,
  },
  data() {
    return {
      sliderList: [],
      productList: [],
      links: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios({
        url: "/index",
        params: { handlerName: "indexHandler" },
        headers: { Authorization: "" },
      }).then((res) => {
        this.sliderList = res.data.sliderList;
        this.productList = res.data.productList;
        this.links = res.data.linkList;
      });
    },
  },
};
</script>
