<template>
  <nav class="navigation-main">
    <div class="nav-left">
      <img
        class="logo"
        src="@/assets/img/logoS.svg"
        alt=""
        style="cursor: pointer"
        @click="test()"
      />
      <router-link to="/Home" active-link="active"> </router-link>

      <div class="searchBox">
        <i class="icon fas fa-search" />
        <input
          autocomplete="off"
          type="text"
          name="email"
          id="email_sginIn"
          placeholder="Search"
        />
      </div>
    </div>
    <div class="nav-right">
      <ul>
        <li>
          <img class="icon-navigation" src="@/assets/img/bell.svg" alt="" />
        </li>
        <li>
          <img class="icon-navigation" src="@/assets/img/home.svg" alt="" />
        </li>
        <li>
          <img class="icon-navigation" src="@/assets/img/youtube.svg" alt="" />
          <!-- <p>{{userObj}}</p> -->
        </li>
      </ul>
      <div class="avatar-user dropdown">
        <img
          class="avatar dropdown-toggle"
          :src="userObj.avatar"
          alt=""
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <div
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownMenuButton"
        >
          <div class="dropdown-item" @click="openProfile()" href="#">
            {{ userObj.username }}
          </div>
          <div class="dropdown-item" href="#" @click="logOut">Sign Out</div>
          <div class="dropdown-item" href="#" @click="EditProfile">Edit Profile</div>
          <div class="dropdown-item" href="#" @click="changpassword">
            Change Password
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['userObj'],
  data() {
    return {
      data: {},
      show: true,
      show2: true,
    };
  },
  methods: {
    test(){
      this.$router
        .push({
          path: "/Home",
          name: "Home Page",
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changpassword() {
      this.$emit("changpassword", this.show);
    },
    EditProfile(){
      this.$emit("editProfile", this.show2);
    },
    logOut() {
      this.$store.commit("setUser", {});
      this.$router
        .push({
          path: "/",
          name: "Login",
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openProfile() {
      this.$router
        .push({
          path: "/Home/Profile",
          name: "Profile",
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    // localStorage.setItem('userObj',JSON.stringify(this.$store.state.user));
    this.data = JSON.parse(localStorage.getItem("userObj"));
    // this.data = this.$store.state.user;
  },
};
</script>

<style scoped>
img.logo {
  width: 6%;
}
.dropdown-item {
  cursor: pointer;
}
nav.navigation-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #00bfa6;
  padding: 5px 2%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.active {
  width: 20%;
}
img.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 10px;
}
div.nav-left {
  display: flex;
  align-items: center;
}
div.nav-right {
  display: flex;
  align-items: center;
}
div.nav-right ul {
  margin: 0 !important;
  list-style: none;
  display: inherit;
}
div.nav-right ul li img {
  width: 28px;
  margin: 0 30px;
}
.searchBox {
  max-width: 380px;
  width: 20rem;
  height: 50px;
  background-color: rgb(252, 245, 245);
  margin: 10px;
  border-radius: 50px;
  padding: 0.3rem;
  display: grid;
  grid-template-columns: 15% 80%;
}

.searchBox .icon {
  margin-left: 1.5rem;
  margin-top: 0.7rem;
  text-align: center;
  line-height: 50px;
  color: rgb(169, 170, 169);
}
.searchBox input {
  background: none;
  border: none;
  outline: none;
  line-height: 1;
  font-weight: 500;
  font-size: 1rem;
  color: #333;
}
.searchBox input::placeholder {
  /* color: rgb(240, 237, 245); */
  font-weight: 500;
}
</style>
