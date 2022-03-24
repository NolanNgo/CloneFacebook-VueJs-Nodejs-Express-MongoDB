<template>
  <form class="sign-in-form" @submit.prevent="SginIn">
    <h2 class="form-title">Sign In</h2>
    <div class="input-field">
      <i class="icon fas fa-user" />
      <input
        autocomplete="off"
        type="text"
        name="email"
        id="email_sginIn"
        placeholder="Email"
        v-model="email"
      />
    </div>
    <div class="input-field">
      <i class="icon fas fa-lock" />
      <input
        autocomplete="off"
        type="password"
        name="password"
        id="password_signIn"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <input class="btn1 btn" type="submit" value="Sign In" />
    <div class="social-media">
      <a href="/#" class="social-icon">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="/#" class="social-icon">
        <i class="fab fa-github"></i>
      </a>
      <a href="/#" class="social-icon">
        <i class="fab fa-google"></i>
      </a>
    </div>
  </form>
  <!-- <form method="post" @submit.prevent="SginIn">
      <input type="text" v-model="email" />
      <input type="password" v-model="password" />
      <input type="submit" value="click me" />
    </form> -->
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async SginIn() {
      let body = { email: this.email, password: this.password };
      const Response = await this.$postAPi("user/signIn", body);
      if (Response.data.success == false) {
        this.$toast.open({
          message: Response.data.message,
          type: "error",
        });
      } else if (Response.data.success === true) {
        this.$toast.open({
          message: Response.data.message,
          type: "success",
        });
        console.log(Response.data.data);
        let user = {
          userId:Response.data.data._id,
          email: Response.data.data.email,
          username: Response.data.data.username,
          AccessToken: Response.data.token,
        };
        localStorage.setItem("userObj", JSON.stringify(user));
        this.$store.commit("setUser", user);
        this.$router.push({
          path: "/Home",
          name: "Home Page",
        });
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
