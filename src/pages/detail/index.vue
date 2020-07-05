<template>
  <div>
    <swiper autoplay="true" style="height:400px">
      <block v-for="(item, index) in result.templatePhoto" :key="index">
        <swiper-item>
          <image
            :src="'http://192.168.31.1:8088/'+item"
            mode="widthFix"
            style="width:100%;height:100%"
          />
        </swiper-item>
      </block>
    </swiper>
    <div class="msg">
      <p style="font-weight:700;margin-bottom:10px">{{result.productInfo.product_name}}</p>
      <p style="color:#666666;font-size:14;margin-bottom:10px">{{result.productInfo.product_desc}}</p>
      <p
        style="color:#FF8000;font-size:24px;font-weight:700;margin-bottom:20px"
      >¥{{result.productInfo.price}}</p>
      <p style="margin-bottom:20px">
        <span v-for="(item,index) in result.productItem" :key="index">
          <span
            style="background-color:#FF8000;margin-right:10px;padding:10px;border-radius:5px;color:#fff"
          >{{item.volume}}</span>
        </span>
      </p>
      <p style="color:#ccc;font-size:12px;margin-bottom:20px">{{result.sendTimeMsg}}</p>
      <p style="font-weight:700;font-size:14px">{{result.refundRule}}</p>
    </div>
    <div v-for="(item,index) in result.templateInfo.desc_imgs" :key="index">
      <div>
        <image
          :src="'http://192.168.31.1:8088/'+item"
          mode="widthFix"
          style="width:100%;height:100%;margin-bottom:-12rpx"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: "",
      productId: ""
    };
  },
  //   filters:{
  //       chinese(value){
  //           let reg = /[\u4e00-\u9fa5]/g;
  //           return value.match(reg).join('')
  //       }
  //   },
  onLoad(option) {
    this.productId = option.id;
    console.log(this.productId, "id");
    wx.request({
      url:
        "http://192.168.31.1:8088/data/good_detail_" +
        this.productId +
        ".json",
      header: {
        "content-type": "application/json"
      },
      success: res => {
        console.log(res.data, "res");
        this.result = res.data;
      }
    });
  }
};
</script>

<style scoped>
.msg {
  text-align: center;
  background-color: #fff;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 30px;
  position: relative;
  top: -40px;
  box-shadow: 5px 0 5px #ccc, 0 5px 5px #ccc, -5px 0 5px #ccc;
}
</style>