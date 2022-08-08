<template>
  <div class="update-gender">
    <van-picker
      title="设置性别"
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
      :default-index="gender"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";

export default {
  name: "UpdateGender",
  data() {
    return {
      columns: ["女", "男"],
      localGender: this.gender,
    };
  },
  props: {
    gender: {
      type: Number,
      required: true,
    },
  },
  model: {
    prop: "gender",
    event: "input",
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "Reserving",
        forbidClick: true,
        duration: 0,
      });
      try {
        const localGender = this.localGender;

        await updateUserProfile({
          gender: localGender,
        });

        this.$emit("input", localGender);

        this.$emit("close");
        this.$toast.success("OK");
      } catch (err) {
        this.$toast("Fail to updata name");
        console.log(err);
      }
    },

    onChange(picker, value, index) {
      this.localGender = index;
    },
  },
};
</script>

<style>
</style>