<template>
  <section>
    <div class="case-list d-flex flex-wrap">
      <router-link
        :to="{ name: 'ccasedetail', params: { caseid: cl.caseId } }"
        class="case-li"
        v-for="(cl, inx) in caselist"
        :key="inx"
      >
        <div class="img-box">
          <img v-lazy="cl.img" alt="" />
        </div>
        <div class="text text-truncate">{{ cl.caseName }}</div>
      </router-link>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      caselist: [],
      page: {
        companyId: "",
        caseName: "",
        limit: 12,
        page: 1,
        sort: "createTime",
        order: "",
      },
    };
  },
  mounted() {
    this.page.companyId = this.$route.params.companyid;
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("/prod/case/page", { params: this.page }).then((res) => {
        res = res.data.records;
        res.forEach((ele) => {
          ele.img = JSON.parse(ele.imageDetails)[0].url;
        });
        this.caselist = res;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.case-list {
  margin-right: -30px;
  .case-li {
    cursor: pointer;
    width: 240px;
    background-color: #fff;
    margin: 20px 12px 0 0;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: all 0.2s linear;
    transform: translateY(0) translate3d(0, 0, 0);
    .img-box {
      height: 178px;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .text {
      height: 38px;
      padding: 9px;
      font: 14px/20px "aliPHR";
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:hover {
      transform: translateY(-1px) translate3d(0, 0, 0);
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    }
  }
}
</style>