<template>
  <div class="contrainer-content">
    <div class="left-sidebar">
      <left-side></left-side>
    </div>
    <div class="main-content">
      <add-post :userObject="user"></add-post>
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
    <div class="right-sidebar">
      <right-side></right-side>
    </div>
  </div>
</template>

<script>
import addPost from "../Form/AddPost.vue";
import LeftSide from "./LeftSideBar.vue";
import RightSide from "./RightSideBar.vue";
import PostElement from "./PostElement.vue";
export default {
  components: {
    addPost,
    LeftSide,
    RightSide,
    PostElement,
  },
  data() {
    return {
      listPost: [],
      user: {},
      token: "",
    };
  },
  watch: {
    "$store.state.isRefesh"() {
      this.getPost();
      this.getUser();
    },
  },
  methods: {
    async getPost() {
      const headers = { Authorization: `Bearer ${this.token}` };
      const Response = await this.$getAPI("post/getPost", headers);
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

  async mounted() {
    this.data = JSON.parse(localStorage.getItem("userObj"));
    this.$store.commit("setAccessToken", this.data.AccessToken);
    this.token = this.$store.state.accessToken;
    this.getPost();
    this.getUser();
  },
};
</script>

<style  scoped>
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
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  color: #626262;
}
.main-content {
  flex-basis: 47%;
}
</style>