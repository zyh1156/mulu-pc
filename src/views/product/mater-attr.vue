<template>
  <div class="attr-ul">
    <div
      class="d-flex attr-li"
      v-for="(a, inx) in arr"
      :key="inx"
      v-show="a.value.trim() != ''"
    >
      <div class="tit">{{ a.name }}</div>
      <div class="cont" v-html="a.value"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: [],
      dict: {},
    };
  },
  props: {
    mater: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    this.getDict();
  },
  watch: {
    mater(newV) {
      this.setData();
    },
  },
  methods: {
    getDict() {
      this.axios.get("/dict/initDict").then((res) => {
        this.dict = res.data;
      });
    },
    checkObj(obj) {
      let i;
      // 字段补全及修改
      if (obj.name == "供应商") {
        obj.value = `<a target="_blank" 
        href="/company/${this.mater.companyId}">
        ${this.mater.companyAddress}</a>`;
      } else if (obj.name == "货期") {
        obj.value += "天";
      } else if (obj.name == "品牌性质") {
        obj.value = obj.value == "2" ? "进口" : "国产";
      } else if (obj.name == "产地") {
        for (i = 0; i < this.dict.place.length; i++) {
          if (obj.value == this.dict.place[i].code) {
            obj.value = this.dict.place[i].name;
            break;
          }
        }
      } else if (obj.name == "消防等级") {
        for (i = 0; i < this.dict.firerating.length; i++) {
          if (obj.value == this.dict.firerating[i].code) {
            obj.value = this.dict.firerating[i].name;
            break;
          }
        }
      }
      return obj;
    },
    setData() {
      // 词典
      let lexicon = [
        {
          name: "供应商",
          key: "companyName",
        },
        {
          name: "联系方式",
          key: "linkTel",
        },
        {
          name: "编号",
          key: "productNo",
        },
        {
          name: "分类",
          key: "categoryName1",
        },
        {
          name: "品牌",
          key: "brandName",
        },
        {
          name: "品牌性质",
          key: "domestic",
        },
        {
          name: "产地",
          key: "place",
        },
        {
          name: "消防等级",
          key: "firerating",
        },
        {
          name: "货期",
          key: "deliveryTime",
        },
      ];
      // 数据解耦
      let mater = JSON.stringify(this.mater);
      mater = JSON.parse(mater);
      // 开始整理
      let arr = [],
        i,
        j;
      // 基础字段
      for (i = 0; i < lexicon.length; i++) {
        for (j in mater) {
          if (lexicon[i].key == j) {
            let obj = this.checkObj({
              name: lexicon[i].name,
              value: mater[j],
            });
            arr.push(obj);
            break;
          }
        }
      }
      // 额外字段
      let allSpec = JSON.parse(mater.allSpec);
      for (i = 0; i < allSpec.length; i++) {
        let obj = {
          name: allSpec[i].k,
        };
        if (allSpec[i].options.length == 0) {
          obj.value = allSpec[i].value;
        } else {
          obj.value = allSpec[i].options[allSpec[i].value].name;
        }
        arr.push(obj);
      }
      this.arr = arr;
    },
  },
};
</script>
<style lang="scss" scoped>
.attr-ul {
  font-size: 14px;
  line-height: 20px;
  height: 460px;
  overflow-y: auto;
  .attr-li {
    margin-top: 14px;
    .tit {
      color: #666;
      flex-shrink: 0;
      width: 70px;
      text-align-last: justify;
      text-align: justify;
      font-family: "aliPHR";
    }
    .cont {
      padding-left: 17px;
      font-family: "aliPHM";
    }
  }
}
</style>