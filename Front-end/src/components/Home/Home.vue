<template>
  <div class="home-page">
    <Navigation
      class="nav-main"
      @changpassword="getShow"
      @editProfile="getShow2"
      :userObj="user"
    />

    <div class="modal-vue">
      <!-- button show -->
      <!-- <button @click="">show</button> -->
      <!-- <a class="link-all" @click.stop="showModal = true">All Category</a> -->

      <!-- overlay -->
      <div class="overlay" v-if="showModal" @click="showModal = false"></div>

      <!-- modal -->
      <div class="modal2" v-if="showModal">
        <button class="btn close" @click="showModal = false">X</button>
        <div class="title-cate"><h2>Change Password</h2></div>
        <hr class="solid" style="border-top: 3px solid black" />
        <form
          class="change-password-form"
          @submit.prevent="submitChangePassword"
        >
          <div class="input-field">
            <i class="icon fas fa-lock" />
            <input
              autocomplete="off"
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="Current Password"
              v-model="oldPassword"
            />
          </div>
          <div class="input-field">
            <i class="icon fas fa-lock" />
            <input
              autocomplete="off"
              type="password"
              name="New Password"
              id="New Password"
              placeholder="New Password"
              v-model="newPassword"
            />
          </div>
          <input
            class="btn1 btn btn-lg rounded-pill px-5 py-2 fw-bold fs-4"
            style="margin-top: 5rem"
            type="submit"
            value="Change Password"
          />
        </form>
      </div>
    </div>

    <div class="modal-vue">
      <!-- button show -->
      <!-- <button @click="">show</button> -->
      <!-- <a class="link-all" @click.stop="showModal = true">All Category</a> -->

      <!-- overlay -->
      <div class="overlay" v-if="showModal2" @click="showModal2 = false"></div>

      <!-- modal -->
      <div class="modal2" v-if="showModal2">
        <button class="btn close" @click="showModal2 = false">X</button>
        <div class="title-cate"><h2>Edit Profile</h2></div>
        <hr class="solid" style="border-top: 3px solid black" />
        <form class="edit-Profile" @submit.prevent="SubmitEditProfile">
          <div class="input-field">
            <i class="icon fas fa-user" />
            <input
              autocomplete="off"
              type="text"
              name="UserName"
              id="UserName"
              placeholder="Your Name"
              v-model="userName"
            />
          </div>
          <div>
            <upload-file
              class="test"
              @object-file="getObjectFile"
              :isShow="true"
            ></upload-file>
          </div>

          <input
            class="btn1 btn btn-lg rounded-pill px-5 py-2 fw-bold fs-4"
            style="margin-top: 1rem"
            type="submit"
            :disabled="isDisable"
            value="Edit Profile"
          />
        </form>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
import UploadFile from "../Form/Uploading.vue";

export default {
  components: {
    Navigation,
    UploadFile,
  },
  data() {
    return {
      data: {},
      userName: "",
      isDisable: false,
      showModal: this.$store.state.isShow,
      showModal2: this.$store.state.isShow2,
      listPost: [],
      oldPassword: "",
      newPassword: "",
      token: "",
      user: {},
      imgSrc: "",
    };
  },
  methods: {
    getObjectFile(data) {
      this.imgSrc = data;
    },
    getShow(data) {
      this.showModal = data;
    },
    getShow2(data) {
      this.showModal2 = data;
    },

    async SubmitEditProfile() {
      let body = {
        avatar: this.imgSrc,
        username: this.userName,
      };
      let headers = { Authorization: `Bearer ${this.token}` };
      this.isDisable = !this.isDisable;
      const Response = await this.$putAPi("user/editProfile", body, headers);
      if (Response.data.success == false) {
        this.$toast.open({
          message: Response.data.message,
          type: "error",
          duration: 1500,
        });
      }else if (Response.data.success == true) {
        this.showModal2 = false;
        this.userName = "";
        this.imgSrc="";
        this.getUser();
        this.$store.commit("setisRefesh", true);
        this.isDisable = false
      } else {
        return false;
      }
    },

    getUser() {
      this.$getUser(this.data.userId)
        .then((user) => {
          this.user = { ...user };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async submitChangePassword() {
      const body = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };
      const headers = { Authorization: `Bearer ${this.token}` };
      // console.log(config, body);
      const Response = await this.$postAPi(
        "user/changepassword",
        body,
        headers
      );
      if (Response.data.success == false) {
        this.$toast.open({
          message: Response.data.message,
          type: "error",
          duration: 1500,
        });
      } else if (Response.data.success == true) {
        this.$toast.open({
          message: Response.data.message,
          type: "success",
          duration: 1500,
        });
        this.showModal = false;
        this.oldPassword = "";
        this.newPassword = "";
      } else {
        return false;
      }
    },
  },
  async mounted() {
    this.data = JSON.parse(localStorage.getItem("userObj"));
    this.$store.commit("setAccessToken", this.data.AccessToken);
    this.token = this.$store.state.accessToken;
    this.getUser();
  },
};
</script>

<style scoped>
/* .home-page{
    background-color: #dad1d1;
} */
.btn1 {
  width: auto !important;
  height: 40px;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #00bfa6;
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  margin: 10px 0;
  transition: 0.5s;
}
.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .modal2 {
  border-radius: 25px;
  position: fixed;
  left: 33%;
  top: 12%;
  width: 37rem;
  z-index: 9999;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
}
.nav-main {
  position: sticky;
  top: 0;
  z-index: 100;
}
/* .modal-vue .close {
    position: absolute;
    top: 10px;
    right: 10px;
  } */
.title-cate {
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-Profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>