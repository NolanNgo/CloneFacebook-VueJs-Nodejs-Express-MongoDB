<template>
  <div class="write-post-container" @submit.prevent="addPost">
    <div class="user-profile">
      <img
        class="avatar dropdown-toggle"
        :src="userObject.avatar "
        alt=""
        type="button"
      />
      <div class="info-user">
        <p style="margin-bottom: 0 !important">{{ userObject.username }}</p>
      </div>
    </div>
    <div class="post-input-content">
      <form class="post-content" action="">
        <textarea
          rows="3"
          autocomplete="off"
          type="text"
          name="title"
          id="title"
          v-model="title"
          placeholder="Please Enter Your Think !!"
        />
        <upload-file
          @object-file="getObjectFile"
          :isShow="valuesisShow"
          :isRefesh="valueisRefesh"
        ></upload-file>
        <a style="cursor: pointer" @click.stop="showInputImg"
          ><img src="@/assets/img/dslr-camera.svg" alt="" srcset="" />Picture</a
        >
        <button class="btn" type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import UploadFile from "./Uploading.vue";
export default {
  props: ["userObject"],
  data() {
    return {
      valuesisShow: false,
      imgSrc: "",
      title: "",
      token: "",
      valueisRefesh: false,
    };
  },
  components: {
    UploadFile,
  },
  methods: {
    getObjectFile(data) {
      this.imgSrc = data;
    },
    showInputImg() {
      this.valuesisShow = !this.valuesisShow;
    },
    async addPost() {
      const body = {
        title: this.title,
        image: this.imgSrc, //base64
      };
      const headers = {
        Authorization: `Bearer ${this.token}`,
        "Content-type": "application/json",
      };
      const Response = await this.$postAPi("post/addPost", body, headers);
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
        this.title = "";
        this.valueisRefesh = true;
        this.$store.commit("setisRefesh", true);
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.data = JSON.parse(localStorage.getItem("userObj"));
    this.$store.commit("setAccessToken", this.data.AccessToken);
    this.token = this.$store.state.accessToken;
    // console.log(this.data);
    // console.log(this.$store.state.user);
  },
};
</script>

<style scoped>
.write-post-container {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 20px;
  columns: #626262;
}
.user-profile {
  display: flex;
  align-items: center;
}
img.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 10px;
}
.post-input-content {
  padding-left: 40px;
  padding-top: 15px;
}
.post-input-content textarea {
  width: 100%;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ccc;
  background: transparent;
  resize: none;
}
form.post-content a {
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  color: #626262;
  width: fit-content;
}
form.post-content a img {
  width: 28px;
  margin: 0 30px;
}

/* img.avatar {
  /* width: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin: 5px; */
/* } */
/* .post-content {
  display: flex;
  flex-direction: row;
} */
</style>