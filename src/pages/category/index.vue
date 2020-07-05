<template>
  <div style="display:flex">
    <div>
      <van-sidebar :active-key="active">
        <block v-for="(item,index) in categoryList" :key="index">
          <van-sidebar-item :title="item.name" @click="change(item.id,index)" />
        </block>
      </van-sidebar>
    </div>
    <div style="width:100%">
        <div>
          <showCategory
            v-for="(item, index) in list"
            :key="index"
            :className="item.className"
            :classGroup="item.classGroup"
          ></showCategory>
        </div>
    </div>
  </div>
</template>

<script>
import showCategory from "@/components/showCategory";
export default {
  components: { showCategory },
  data() {
    return {
      active: 0,
      categoryList: [],
      list: []
    };
  },
  created() {
    wx.request({
      url: "http://192.168.31.1:8088/data/category_list.json",
      header: {
        "content-type": "application/json"
      },
      success: res => {
        console.log(res.data);
        this.categoryList = res.data;
      },
    });
     wx.request({
        url: "http://192.168.31.1:8088/data/category_list_478.json",
        header: {
          "content-type": "application/json"
        },
        success: res => {
          console.log(res.data);
          this.list = res.data;
        }
      });
  },
  methods: {
    change(value, index) {
      console.log(value);
      this.active = index;
      wx.request({
        url: "http://192.168.31.1:8088/data/category_list_" + value + ".json",
        header: {
          "content-type": "application/json"
        },
        success: res => {
          console.log(res.data);
          this.list = res.data;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
