<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {};
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
        console.log(res);
      });
    },
  },
};
</script>
