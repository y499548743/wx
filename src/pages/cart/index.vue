<template>
  <div>
    <div style="margin-bottom:50px">
      <van-swipe-cell
        right-width="65"
        left-width="65"
        v-for="(item,index) in cartList"
        :key="index"
      >
        <div style="display:flex;width:100%;align-items: center;">
          <van-checkbox
            :value="item.checked"
            checked-color="#FD9902"
            style="padding-left:20px"
            @click="onClick(index)"
          ></van-checkbox>
          <van-card
            :price="item.price"
            :title="item.title"
            :thumb="'http://192.168.31.1:8088/'+item.image"
            :desc="item.volume"
            style="width:100%"
          >
            <view slot="bottom" class="stepper-slot">
              <van-stepper
                :value="item.num"
                integer
                min="1"
                @plus="plus(index)"
                @minus="minus(index)"
              />
            </view>
          </van-card>
        </div>
        <view slot="right" class="rightSwipe" @click="deleteProduct(index)">删除</view>
      </van-swipe-cell>
    </div>
    <van-submit-bar :price="sum*100" button-text="提交订单" @submit="onSubmit" :tip="true">
      <van-checkbox
        :value="all"
        checked-color="#FD9902"
        style="padding-left:10px"
        @click="allChecked"
      >全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sum: 0,
      all: false,
      cartList: []
    };
  },
  onTabItemTap() {
    try {
      var value = wx.getStorageSync("cartList");
      if (value) {
        console.log(value);
        this.cartList = value;
      }
    } catch (e) {}
  },
  methods: {
    onClick(index) {
      this.cartList[index].checked = !this.cartList[index].checked;
      if (
        this.cartList.filter(item => item.checked == true).length ==
        this.cartList.length
      ) {
        this.all = true;
      } else {
        this.all = false;
      }
      let checkedList = this.cartList.filter(item => item.checked == true);
      this.sum = 0;
      for (let i = 0; i < checkedList.length; i++) {
        this.sum += checkedList[i].num * checkedList[i].price;
      }
    },
    allChecked() {
      this.all = !this.all;
      if (this.all) {
        for (let i = 0; i < this.cartList.length; i++) {
          this.cartList[i].checked = true;
        }
      } else {
        for (let i = 0; i < this.cartList.length; i++) {
          this.cartList[i].checked = false;
        }
      }
      let checkedList = this.cartList.filter(item => item.checked == true);
      this.sum = 0;
      for (let i = 0; i < checkedList.length; i++) {
        this.sum += checkedList[i].num * checkedList[i].price;
      }
    },
    plus(index) {
      this.cartList[index].num++;
      let checkedList = this.cartList.filter(item => item.checked == true);
      this.sum = 0;
      for (let i = 0; i < checkedList.length; i++) {
        this.sum += checkedList[i].num * checkedList[i].price;
      }
    },
    minus(index) {
      this.cartList[index].num--;
      let checkedList = this.cartList.filter(item => item.checked == true);
      this.sum = 0;
      for (let i = 0; i < checkedList.length; i++) {
        this.sum += checkedList[i].num * checkedList[i].price;
      }
    },
    deleteProduct(index) {
      console.log(index);
      this.cartList.splice(index, 1);
      console.log(this.cartList);
      wx.setStorage({
        key: "cartList",
        data: this.cartList
      });
    },
    onSubmit(){
      let uncheckedList = this.cartList.filter(item => item.checked == false);
      this.cartList=uncheckedList
      this.all=false
      this.sum=0
      wx.setStorage({
        key:"cartList",
        data:this.cartList
      })
    }
  }
};
</script>

<style scoped>
.stepper-slot {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.rightSwipe {
  width: 65px;
  height: 100%;
  font-size: 15px;
  color: #fff;
  text-align: center;
  background-color: #f44;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
