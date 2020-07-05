<template>
  <div style="background:#fff;width:100%">
    <p style="text-align:center;font-weight:700;padding-top:10px;padding-bottom:30px">{{className.name}}</p>
    <div style="width:100%;display:flex;flex-wrap: wrap;">
      <block v-for="(item,index) in classGroup" :key="index">
        <div style="width:33%">
          <image
            :src="'http://192.168.31.1:8088/'+item.class_photo"
            style="width:100px;height:100px"
          />
          <p style="text-align:center;padding-bottom:20px">{{item.name}}</p>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
export default {
  props: ["className", "classGroup"]
};
</script>

<style scoped>

</style>