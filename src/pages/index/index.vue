<template>
  <div>
    <swiper indicator-dots="true" autoplay="true">
      <block v-for="(item, index) in bannerUrls" :key="index">
        <swiper-item>
          <image :src="item" style="width:100%;height:100%" />
        </swiper-item>
      </block>
    </swiper>
    <van-grid column-num="5" :border="false">
      <van-grid-item use-slot v-for="(item, index) in gridImg" :key="index">
        <image :src="item.url" style="width:30px;height:30px" />
        <span style="font-size:12px;padding-top:10px">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <Product
      v-for="(item, index) in product"
      :key="index"
      :id="item.id"
      :image="item.image"
      :content="item.content"
      :hs_more="item.hs_more"
    ></Product>
  </div>
</template>

<script>
import Product from "@/components/Product";
export default {
  components: {Product},
  data() {
    return {
      result: "",
      product: [],
      bannerUrls: [
        "http://192.168.31.1:8088/images/banner-1.jpg",
        "http://192.168.31.1:8088/images/banner-2.jpg",
        "http://192.168.31.1:8088/images/banner-3.jpg",
        "http://192.168.31.1:8088/images/banner-4.jpg",
        "http://192.168.31.1:8088/images/banner-5.jpg"
      ],
      gridImg: [
        { url: "http://192.168.31.1:8088/images/week.png", name: "每周上新" },
        { url: "http://192.168.31.1:8088/images/new.png", name: "新客专享" },
        { url: "http://192.168.31.1:8088/images/play.png", name: "天天直播" },
        { url: "http://192.168.31.1:8088/images/shake.png", name: "摇一摇" },
        { url: "http://192.168.31.1:8088/images/limit.png", name: "限时特惠" },
        { url: "http://192.168.31.1:8088/images/low.png", name: "低温速食" },
        { url: "http://192.168.31.1:8088/images/meat.png", name: "品质肉禽" },
        { url: "http://192.168.31.1:8088/images/fruit.png", name: "新鲜水果" },
        { url: "http://192.168.31.1:8088/images/gh.png", name: "粮油干货" },
        { url: "http://192.168.31.1:8088/images/water.png", name: "生活水饮" }
      ]
    };
  },
  created() {
    wx.request({
      url: "http://192.168.31.1:8088/data/fruits.json",
      header: {
        "content-type": "application/json"
      },
      success: res => {
        console.log(res.data);
        this.product = res.data.bannerTags;
        console.log(this.product,'-----');
      }
    });
  }
};
</script>


<style scoped>
</style>
