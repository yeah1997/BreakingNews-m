<template>
  <div class="update-photo">
    <img :src="img" class="img" ref="img"/>

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "UpdatePhoto",
  props: {
    img: {
      type: [Object, String],
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.img
    const cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      },
    });
  },
};
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .img {
    display: block;
    max-width: 100%;
  }

  .toolbar {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;

    .cancel,
    .confirm {
      width: 90px;
      height: 70px;
      font-size: 30px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-content: center;
    }
  }
}
</style>