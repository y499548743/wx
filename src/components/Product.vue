<template>
  <div>
      <image v-if="image" :src="'http://192.168.31.1:8088/'+image" mode="widthFix" style="width:100%" @click="goMore(id,hs_more)"/>
    <scroll-view scroll-x="true" class="scroll">
      <block v-for="(item,index) in content" :key="index">
        <view style="display:inline-block">
          <p style="text-align:center">
            <navigator :url="'/pages/detail/main?id='+item.product_id">
              <image
                :src="'http://192.168.31.1:8088/'+item.image"
                style="width:100px;height:100px"
              />
            </navigator>
          </p>
          <p style="text-align:center;font-weight:700">{{item.subtitle}}</p>
          <p style="text-align:center;color:#666666;font-size:14px">{{item.title}}</p>
          <p style="text-align:center;color:#F6A04A">
            ¥{{item.price}}/{{item.volume}}
            <image
              src="http://192.168.31.1:8088/images/cart.png"
              style="width:30px;height:30px;vertical-align: middle;"
              @click="addCart(item.title,item.price,item.volume,item.image)"
            />
          </p>
        </view>
      </block>
    </scroll-view>
  </div>
</template>

<script>
export default {
  props: ["id", "image", "content", "hs_more"],
  data() {
    return {
      cartList: []
    };
  },
  methods: {
    goMore(value1, value2) {
      console.log(value1, value2);
      var url = "/pages/more/main?id=" + value1;
      if (value2 == 1) {
        wx.navigateTo({ url });
      } else {
        console.log("no more");
      }
    },
    addCart(title, price, volume, image) {
      console.log(title, price, volume, image);
      wx.getStorage({
        key: "cartList",
        success(res) {
          let cartList = res.data;
          if (cartList.length === 0) {
            cartList.push({
              title: title,
              price: price,
              volume: volume,
              image: image,
              checked: false,
              num: 1
            });
            console.log(cartList, "---");
            wx.setStorage({
              key: "cartList",
              data: cartList
            });
          } else {
            let product = cartList.find(item => item.title === title);
            console.log(product);
            if (product) {
              product.num++;
              wx.setStorage({
                key: "cartList",
                data: cartList
              });
            } else {
              cartList.push({
                title: title,
                price: price,
                volume: volume,
                image: image,
                checked: false,
                num: 1
              });
              wx.setStorage({
                key: "cartList",
                data: cartList
              });
            }
          }
        },
        fail: err => {
          // this.storageSet();
          let cartList=[];
          cartList.push({
              title: title,
              price: price,
              volume: volume,
              image: image,
              checked: false,
              num: 1
            });
            console.log(cartList, "---");
            wx.setStorage({
              key: "cartList",
              data: cartList
            });
          console.log(err);
        }
      });
    }
  }

  // addCart(title, price, volume, image) {
  //   wx.setStorage({
  //     key: "cartList",
  //     data: []
  //   });
  // }
};
</script>

<style scoped>
.scroll {
  width: 100%;
  height: 250px;
  display: flex;
  white-space: nowrap;
  padding-left: 10px;
}
.scroll view {
  width: 140px;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>