<template>
  <section></section>
</template>
<script>
export default {
  data() {
    return {
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
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("/prod/case/page", { params: this.page }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>