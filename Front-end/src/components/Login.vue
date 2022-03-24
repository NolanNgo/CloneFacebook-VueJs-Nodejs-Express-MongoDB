<template>
    <div class=" App" :class="{ 'sign-up-mode': !modeSignUp }">
      <div class="form-container">
        <div class="sign-up-in-form">
          <SignIn />
          <SignUp />
        </div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New One ?</h3>
            <p>Do you Want create one ?</p>
            <button
              class="btn1 btn transparent"
              id="sign-up-btn"
              @click="changeMode"
            >
              Sign Up
            </button>
          </div>
          <img :src="src1" class="image" :alt="src1" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of US</h3>
            <p>Now Join with us</p>
            <button
              class="btn1 btn transparent"
              id="sign-in-btn"
              @click="changeMode"
            >
              Sign In
            </button>
          </div>
          <img :src="src2" class="image" :alt="src2" />
        </div>
      </div>
    </div>
</template>

<script>
import SignIn from "./Form/SignIn.vue";
import SignUp from "./Form/SignUp.vue";
import src1 from "../assets/img/src1.svg";
import src2 from "../assets/img/src2.svg";

    export default {
          components: {
    SignIn,
    SignUp,
  },
  data() {
    return {
      // mode: "container App sign-up-mode",
      src1: src1,
      src2: src2,
      modeSignUp: true,
    };
  },
  methods: {
    // getDataFromChild(e){
    //   console.log(e);
    // },

    changeMode() {
      this.modeSignUp = !this.modeSignUp;
      console.log(!this.modeSignUp);
    },
    },
}
</script>

<style >
    body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
body input {
  font-family: "Poppins", sans-serif;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.App {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px rgb(196, 194, 194) inset !important;
}
.App:before {
  content: "";
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #0c917f, #1daf9c);
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  z-index: 6;
  transition: 1.8s ease-in-out;
}
.form-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.sign-up-in-form {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}
form.sign-in-form,form.sign-up-form,form.change-password-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-column: 1/2;
  grid-row: 1/2;
  padding: 0 5rem;
  overflow: hidden;
  transition: 0.2s 0.7s ease-in-out;
}
form.sign-in-form {
  z-index: 2;
}
form.sign-up-form {
  z-index: 1;
  opacity: 0;
}
.form-title {
  font-size: 2.3rem;
  color: rgb(68, 68, 68);
  margin-bottom: 12px;
}
.input-field {
  max-width: 380px;
  width: 100%;
  height: 50px;
  background-color: rgb(196, 194, 194);
  margin: 10px 0;
  border-radius: 50px;
  padding: 0.3rem;
  display: grid;
  grid-template-columns: 15% 80%;
}

.input-field .icon {
  margin-left: 1.5rem;
  margin-top: 0.7rem;
  text-align: center;
  line-height: 50px;
  color: rgb(169, 170, 169);
}
.input-field input {
  background: none;
  border: none;
  outline: none;
  line-height: 1;
  font-weight: 500;
  font-size: 1rem;
  color: #333;
}
.input-field input::placeholder {
  color: rgb(117, 116, 119);
  font-weight: 500;
}
.btn1 {
  width: 150px;
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
.btn1:hover {
  background-color: #038d7b;
}
.social-media {
  display: flex;
  justify-content: center;
}
.social-icon {
  height: 46px;
  width: 46px;
  border: 1px solid;
  margin: 0 0.45rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  border-radius: 50%;
  transition: 0.3s;
}
.social-icon:hover {
  color: #00bfa6;
  border-color: #00bfa6;
}
.panels-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  text-align: center;
  z-index: 7;
}
.panel .content {
  color: #fff;
  transition: 0.9s 0.6s ease-in-out;
}
.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}
.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}
.btn1.transparent {
  margin: 0;
  background: none;
  border: 2px solid white;
  width: 130px;
  height: 40px;
  font-weight: 600;
  font-size: 0.8rem;
}
.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}
.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}
.image {
  width: 100%;
  transition: 1.1s 0.4s ease-in-out;
}
.right-panel .content,
.right-panel .image {
  transform: translateY(600px);
}
/*Animation*/
/* .App.sign-up-mode:before{
  transform: translate(100%, -50%);
  right:52%;
} */
.App.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}
.App.sign-up-mode .left-panel .content,
.App.sign-up-mode .left-panel .image {
  transform: translateX(-600px);
}
.App.sign-up-mode .right-panel .content,
.App.sign-up-mode .right-panel .image {
  transform: translateX(0px);
}
.App.sign-up-mode .right-panel {
  pointer-events: all;
}
.App.sign-up-mode .left-panel {
  pointer-events: none;
}
.App.sign-up-mode .sign-up-in-form {
  left: 25%;
}
.App.sign-up-mode form.sign-up-form {
  z-index: 2;
  opacity: 1;
}
.App.sign-up-mode form.sign-in-form {
  z-index: 1;
  opacity: 0;
}

/*Screen Mobile*/
@media (max-width: 870px) {
  .App {
    min-height: 800px;
    height: 100vh;
  }
  .App:before {
    width: 1500px;
    height: 1500px;
    left: 30%;
    bottom: 68%;
    transform: translateX(-50%);
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }
  .sign-up-in-form {
    width: 100%;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }
  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }
  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
  }
  .panel .content {
    padding-right: 15%;
  }
  .panel h3 {
    font-size: 0.9rem;
    padding: 0.6rem 0;
    transition: 0.9s 0.8s ease-in-out;
  }
  .image {
    width: 200px;
    transition: 0.9s 0.6s ease-in-out;
  }
  .btn1 .transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }
  .left-panel {
    grid-row: 1 / 2;
  }
  .right-panel {
    grid-row: 3 / 4;
  }
  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }
  .App.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }
  .App.sign-up-mode .left-panel .content,
  .App.sign-up-mode .left-panel .image {
    transform: translateY(-300px);
  }
  .App.sign-up-mode .sign-up-in-form {
    top: 5%;
    transform: translate(-50%, 0);
    left: 50%;
  }
}
@media (max-width: 570) {
  form {
    padding: 0 1.5rem;
  }
  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .App:before {
    bottom: 72%;
    left: 50%;
  }
  .App.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
  .input-field .icon {
    display: none;
  }
}
</style>