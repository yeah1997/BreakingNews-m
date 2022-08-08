<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      right-text="保伦"
      left-arrow
      @click-left="$router.back()"
      class="page-nav-bar"
    />

    <input type="file" hidden ref="file" @change="onFileChange" />

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avtor" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 1 ? '男' : '女'"
      @click="isUpdateGenderShow = true"
      is-link
    ></van-cell>
    <van-cell
      title="生日"
      :value="user.birthday"
      @click="isUpdateBirthdayShow = true"
      is-link
    ></van-cell>

    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      style="height: 100%"
    >
      <UpdateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      ></UpdateName>
    </van-popup>

    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
      style="height: 30%"
    >
      <UpdateGender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      ></UpdateGender>
    </van-popup>

    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
      style="height: 30%"
    >
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      ></UpdateBirthday>
    </van-popup>

    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      ></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user.js";
import UpdateName from "@/views/user-profile/components/update-name.vue";
import UpdateGender from "@/views/user-profile/components/update-gender.vue";
import UpdateBirthday from "@/views/user-profile/components/update-birthday.vue";
import UpdatePhoto from "@/views/user-profile/components/update-photo.vue";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      show: false,
      img: null,
    };
  },
  created() {
    this.loadUserProfile();
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();

        this.user = data.data;
      } catch (err) {
        this.$toast("Fail to Load User Profile");
      }
    },

    onFileChange() {
      const file = this.$refs.file.files[0];

      this.img = window.URL.createObjectURL(file);
      this.isUpdatePhotoShow = true;

      this.$refs.file.value = "";
    },
  },
};
</script>

<style scoped lang="less">
.user-profile {
  .avtor {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>