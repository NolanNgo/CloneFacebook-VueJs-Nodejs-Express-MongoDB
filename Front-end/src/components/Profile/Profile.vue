<template>
  <div class="profile-container">
    <div class="container-info">
      <img class="profile-avatar" :src="user.avatar" alt="avatar" />
      <p>{{ user.username }}</p>
    </div>
    <div class="contrainer-content">
      <div class="left-sidebar"></div>
      <div class="main-content">
        <div class="post-container" v-show="listPost.length > 0">
          <div v-for="(item, index) in listPost" :key="index">
            <post-element
              :username="item.user.username"
              :avatarUser="item.user.avatar"
              :timePost="item.timePost"
              :content="item.title"
              :image="item.img"
            />
          </div>
        </div>
      </div>
      <div class="right-sidebar"></div>
    </div>
  </div>
</template>

<script>
import PostElement from "../Home/PostElement.vue";
export default {
  components: {
    PostElement,
  },
  data() {
    return {
      data: {},
      user: {},
      token: "",
      listPost: [],
    };
  },
  watch: {
    "$store.state.isRefesh"() {
      this.getUser();
      this.getPost();
    },
  },
  methods: {
    async getPost() {
      const headers = { Authorization: `Bearer ${this.token}` };
      const Response = await this.$getAPI("post/user", headers);
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
        // this.listPost = this.listPost.push(Response.data.data);
        this.listPost = [...Response.data.data];
        // console.log(this.listPost);
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
  },
  mounted() {
    this.data = JSON.parse(localStorage.getItem("userObj"));
    this.$store.commit("setAccessToken", this.data.AccessToken);
    this.token = this.$store.state.accessToken;
    this.getUser();
    this.getPost();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300&display=swap");
.profile-avatar {
  height: 13rem;
  width: 13rem;
  border-radius: 50%;
}
.profile-container {
  margin-top: 2rem;
}
.container-info {
  border-radius: 10px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 30px;
  background: #fff;
}
.profile-container {
  margin-top: 30px;
}
.contrainer-content {
  display: flex;
  justify-content: space-between;
  padding: 13px 5%;
}
.left-sidebar {
  flex-basis: 25%;
  position: sticky;
  top: 70px;
  align-self: flex-start;
  height: 100vh;
}
.right-sidebar {
  flex-basis: 25%;
  position: sticky;
  top: 70px;
  align-self: flex-start;
  padding: 20px;
  border-radius: 4px;
  color: #626262;
}
.main-content {
  flex-basis: 47%;
}
</style>