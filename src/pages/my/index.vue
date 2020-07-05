<template>
  <div style="margin-bottom:20px">
    <section class="top">
      <div class="login">
        <div>
          <van-image round width="5rem" height="5rem" :src="avatar"/>
        </div>
        <div style="display:flex">
          <span>{{account}}</span>
          <button
            :v-if="canIUse"
            open-type="getUserInfo"
            @getuserinfo="bindGetUserInfo"
            size="mini"
            style="position: relative;left:-20px"
          >授权登录</button>
        </div>
        <div>
          <van-tag round color="#FF8500">签到送好礼</van-tag>
        </div>
        <div>
          <span class="half">
            <van-icon name="qr" size="20px" color="#888888" />
          </span>
        </div>
      </div>
      <div style="margin-top:50px">
        <p style="display:flex">
          <span class="center">积分</span>
          <span class="center">资产·充值</span>
          <span class="center">优惠券</span>
          <span class="center">礼品</span>
        </p>
        <p style="display:flex;margin-top:20px">
          <span class="center">-</span>
          <span class="center">-</span>
          <span class="center">-</span>
          <span class="center">-</span>
        </p>
      </div>
    </section>
    <section class="mid">
      <div>
        <p style="display:flex;justify-content: space-between;align-items:center;height:60px">
          <span style="padding-left:10px">我的订单</span>
          <span style="font-size:14px;font-weight:700;padding-right:10px">全部订单></span>
        </p>
        <p style="display:flex;margin-top:20px">
          <span class="order">
            <image src="/static/images/1.jpg" style="width:30px;height:30px" />
          </span>
          <span class="order">
            <image src="/static/images/2.jpg" style="width:30px;height:30px" />
          </span>
          <span class="order">
            <image src="/static/images/3.jpg" style="width:30px;height:30px" />
          </span>
          <span class="order">
            <image src="/static/images/4.jpg" style="width:30px;height:30px" />
          </span>
          <span class="order">
            <image src="/static/images/5.jpg" style="width:30px;height:30px" />
          </span>
        </p>
        <p style="display:flex;margin-top:10px;font-size:14px;color:#666666">
          <span class="order">待付款</span>
          <span class="order">待发货</span>
          <span class="order">待收货</span>
          <span class="order">待评价</span>
          <span class="order">退换货</span>
        </p>
      </div>
    </section>
    <section class="bottom">
      <div>
        <p style="display:flex;justify-content: space-between;align-items:center;height:60px">
          <span style="padding-left:10px">充值有礼</span>
          <span style="font-size:14px;font-weight:700;padding-right:10px">充值中心></span>
        </p>
        <p>
          <image src="/static/images/card.jpg" style="width:220px;height:110px;padding-left:10px" />
        </p>
        <van-grid column-num="4" :border="false">
          <van-grid-item icon="vip-card-o" text="会员中心" />
          <van-grid-item icon="video-o" text="直播间" />
          <van-grid-item icon="new-o" text="天天新鲜屋" />
          <van-grid-item icon="idcard" text="卡券中心" />
        </van-grid>
        <van-grid column-num="4" :border="false">
          <van-grid-item icon="balance-pay" text="企业购" />
          <van-grid-item icon="service-o" text="在线客服" />
          <van-grid-item icon="question-o" text="我的问答" />
        </van-grid>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      account: "登录/注册",
      avatar: "/static/images/user.png",
      msg: []
    };
  },
  onLoad: function(options) {
    var that = this; //查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting["scope.userInfo"]) {
          console.log("用户授权了");
          // wx.getUserInfo({
          //   success: res => {
          //     console.log(res.userInfo);
          //     let msg = res.userInfo;
          //   }
          // });
        } else {
          //用户没有授权
          console.log("用户没有授权");
        }
      }
    });
  },
  // methods: {
  //   bindGetUserInfo: function(e) {
  //     if (e.detail.userInfo) {
  //       //用户按了允许授权按钮
  //       var that = this; // 获取到用户的信息了，打印到控制台上看下
  //       console.log("用户的信息如下：");
  //       console.log(e.detail.userInfo); //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
  //       // that.setData({
  //       //   isHide: false
  //       // });
  //     } else {
  //       //用户按了拒绝按钮
  //       wx.showModal({
  //         title: "警告",
  //         content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
  //         showCancel: false,
  //         confirmText: "返回授权",
  //         success: function(res) {
  //           // 用户没有授权成功，不需要改变 isHide 的值
  //           if (res.confirm) {
  //             console.log("用户点击了“返回授权”");
  //           }
  //         }
  //       });
  //     }
  //   }
  // }
  methods: {
    bindGetUserInfo() {
      wx.getUserInfo({
        success: res => {
          console.log(res.userInfo);
          let msg = res.userInfo;
          this.account=msg.nickName
          this.avatar=msg.avatarUrl

        }
      });
    }
  }
};
</script>

<style scoped>
.top {
  background-color: #f0f0ee;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  height: 200px;
  padding-top: 30px;
}
.login {
  display: grid;
  grid-template-columns: 80px auto 50px;
  grid-template-rows: 40px 20px;
}
.login div:nth-child(1) {
  grid-column: 1/2;
  grid-row: 1/3;
  padding-left: 10px;
}
.login div:nth-child(2) {
  align-self: flex-end;
  font-size: 20px;
  font-weight: 700;
  padding-left: 10px;
}
.login div:nth-child(3){
  padding-left: 10px;
}
.login div:nth-child(4) {
  grid-column: 3/4;
  grid-row: 1/3;
  align-self: center;
}
.half {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #c2c2c2;
  padding: 12px 15px 5px 15px;
}
.center {
  width: 25%;
  text-align: center;
  display: block;
}
.mid {
  background-color: #fff;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  height: 150px;
  margin-top: 20px;
  box-shadow: 2px 0 5px #ccc, 0 2px 5px #ccc, -2px 0 5px #ccc, 0 -2px 5px #ccc;
}
.order {
  width: 20%;
  text-align: center;
  display: block;
}
.bottom {
  background-color: #fff;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  height: 320px;
  margin-top: 20px;
  box-shadow: 2px 0 5px #ccc, 0 2px 5px #ccc, -2px 0 5px #ccc, 0 -2px 5px #ccc;
}
</style> 
