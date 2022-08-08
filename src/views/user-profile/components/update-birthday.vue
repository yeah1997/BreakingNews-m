<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";
import dayjs from 'dayjs'

export default {
  name: "UpdateBirthday",
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday),
    };
  },
  model: {
    prop: "birthday",
    event: "input",
  },
  props: {
    birthday: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "Reserving",
        forbidClick: true,
        duration: 0,
      });
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD');

        await updateUserProfile({
          birthday: currentDate,
        });

        this.$emit("input", currentDate);

        this.$emit("close");
        this.$toast.success("OK");
      } catch (err) {
        this.$toast("Fail to updata name");
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>