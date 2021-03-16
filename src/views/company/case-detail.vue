<template>
  <div>
    <div class="name">{{ caseData.caseName }}</div>
    <div class="img-box">
      <div class="img-li" v-for="(ci, inx) in caseData.imgs" :key="inx">
        <img v-lazy="ci.url" :key="ci.url" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      caseData: {},
    };
  },
  watch: {
    "$route.params"() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let caseid = this.$route.params.caseid;
      this.axios
        .get("/prod/case/get", { params: { caseId: caseid } })
        .then((res) => {
          res = res.data;
          res.imgs = JSON.parse(res.imageDetails);
          this.caseData = res;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.name {
  font: 24px/33px "aliPHR";
  margin-top: 5px;
}
.img-box {
  .img-li {
    margin-top: 14px;
    img {
      max-width: 100%;
    }
  }
}
</style>