<template>
  <div class="update-photo">
    <img :src="img" class="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import { updateUserPhoto } from "@/api/user.js";

import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "UpdatePhoto",
  data() {
    return {
      cropper: null,
    };
  },
  props: {
    img: {
      type: [Object, String],
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
    // console.log(this.cropper);
  },
  methods: {
    async onConfirm() {
      // this.cropper.getData()
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.loadUserPhoto(blob);
      });
    },

    async loadUserPhoto(blob) {
      this.$toast.loading({
        messege: "Reserving",
        forbidClick: true,
        duration: 0,
      });
      try {
        const formData = new FormData();
        formData.append("photo", blob);

        const { data } = await updateUserPhoto(formData);

        this.$emit("close");

        this.$emit("update-photo", data.data.photo);
        this.$toast.success('Success')
      } catch (err) {
        this.$toast.fail('Fail')
      }
    },
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