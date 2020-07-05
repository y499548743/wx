<template>
  <div>
    <van-tabs :active="active" color="#65A032" title-active-color="#65A032">
      <!-- <block v-for="(item,index) in result" :key="index"> -->
        <van-tab :title="item.name" v-for="(item,index) in result" :key="index">
          <p class="sort">
            <span>综合</span>
            <span>销量</span>
            <span>价格</span>
          </p>
          <div>
            <block v-for="(product,findex) in item.productGroup" :key="findex">
              <div style="width:100%;height:3px;background:#F5F5F5;"></div>
              <van-card
                :price="product.price"
                :title="product.product_name"
                :thumb="'http://192.168.31.1:8088/'+product.photo"
                :desc="product.product_desc"
                style="width:100%;padding-top:10px"
              >
                <view slot="footer" class="add">
                  <image
                    src="http://192.168.31.1:8088/images/cart.png"
                    style="width:30px;height:30px;vertical-align: middle;"
                    @click="addCart(product.product_name,product.price,product.volume,product.photo)"
                  />
                </view>
                <view slot="price-top">
                  <span>{{product.volume}}</span>
                </view>
              </van-card>
            </block>
          </div>
        </van-tab>
      <!-- </block> -->
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:'',
      id: "",
      result: [],
      list: []
    };
  },
  onLoad(option) {
    this.id = option.id;
    console.log(this.id, "id")
  },
  onShow(){ 
    this.active=0;
    this.result = [];
    wx.request({
      url:
        "http://192.168.31.1:8088/data/sub_category_list_" + this.id + ".json",
      header: {
        "content-type": "application/json"
      },
      success: res => {
        console.log(res.data, "res");
        this.result = res.data;
      }
    });
  },
    
  methods: {
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
          let cartList = [];
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
};
</script>

<style scoped>
.sort {
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #838383;
  height: 40px;
}
.add {
  /* display: flex;
  flex-direction: row;
  justify-content: flex-end; */
  height: 0;
  position: relative;
  top: -20px;
}
</style>