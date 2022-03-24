<template>
  <form class="sign-up-form" @submit.prevent="SginUp">
    <h2 class="form-title">Sign Up</h2>
    <div class="input-field">
      <i class="icon fas fa-envelope" />
      <input
        type="text"
        name="email"
        id="email_sginIn"
        placeholder="Email"
        v-model="email"
      />
    </div>
    <div class="input-field">
      <i class="icon fas fa-user" />
      <input
        type="text"
        name="Name"
        id="Name"
        placeholder="User name"
        v-model="username"
      />
    </div>
    <div class="input-field">
      <i class="icon fas fa-lock" />
      <input
        type="password"
        name="password"
        id="password_signIn"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <!-- <div class="input-field">
        <i class="icon fas fa-lock" />
        <input
          type="password"
          name="re_password"
          id="re_password"
          placeholder="Confirm Password"
        />
      </div> -->

    <input class="btn1 btn" type="submit" value="Sign Up" />
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
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  methods: {
    async SginUp() {
      let body = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      const Response = await this.$postAPi("user/signUp", body);
      if (Response.data.success == false) {
        if (Response.data.message.msg) {
          this.$toast.open({
            message: Response.data.message.msg,
            type: "error",
            position: "bottom-left",
          });
        } else {
          this.$toast.open({
            message: Response.data.message,
            type: "error",
            position: "bottom-left",
          });
        }
      } else if (Response.data.success === true) {
        this.$toast.open({
          message: Response.data.message,
          type: "success",
          position: "bottom-left",
        });
        let user = {
          userId: Response.data.data._id,
          email: Response.data.data.email,
          username: Response.data.data.username,
          AccessToken: Response.data.token,
        };
        localStorage.setItem("userObj", JSON.stringify(user));
        this.$router
          .push({ path: "/Home", name: "Home Page" })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
