<template>
  <div>
    <button @click="test" v-show="url" class="btn-close btn">X</button>
    <label
      class="drag-area"
      for="inputimg"
      style="cursor: pointer"
      v-show="isShow"
    >
      <img v-show="url" class="image-upload" :src="url" alt="" />
      <input
        type="file"
        id="inputimg"
        @change="getFile"
        style="display: none"
        accept="image/*"
        multiple
      />
      <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
      <header>Drag and Drop to Upload File</header>
      <span>Or</span>
      <span class="btn">Click To Open</span>
    </label>
  </div>
</template>

<script>
export default {
  props: ["isShow","isRefesh"],
  data() {
    return {
      fileImage: {},
      url: "",
    };
  },
  watch:{
    isRefesh(){
      this.url = "";
    }
  },
  methods: {
    test(event) {
      event.preventDefault();
      this.url = "";
    },
    getFile(event) {
      this.fileImage = event.target.files;
      const file = event.target.files[0];
      const reader = new FileReader();
      // console.log('sssssssss',event.target.files[0].name)
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // this.$emit("object-file", e.target.result);
        let url1 = reader.result;
        this.url = url1;
        this.$emit("object-file", reader.result);
      };
      
      // this.$emit("object-file", this.fileImage);
    },
  },
};
</script>

<style scoped>
.drag-area {
  border: 2px dashed rgb(61, 60, 60);
  width: 100%;
  height: 30rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.drag-are .icon {
  font-size: 100px;
  color: #626262;
}
.drag-area header {
  font-size: 30px;
  font-weight: 500;
  color: #626262;
}
.drag-area span {
  font-size: 25px;
  font-weight: 500;
  color: #626262;
  margin: 10px 0 15px 0;
}
.drag-area button {
  padding: 10px 25px;
  font-size: 20px;
  font-weight: 500;
  border: 1px solid #626262;
  outline: none;
  background: #fff;
  color: #626262;
  border-radius: 5px;
  cursor: pointer;
}
.image-upload {
  height: 25rem;
  width: 25rem;
  position: absolute;
}
.del-img-icon {
  top: 30%;
  right: 3%;
  cursor: pointer;
  opacity: 0.5;
  font-size: 32px;
}
.btn-close {
  height: 30px;
  padding: 2px;
  position: absolute;
  cursor: pointer;
  margin-left:0.5rem;
  margin-bottom: 15px;
  background: transparent;
  font-weight: 1000;
  font-size: 20px;
}
</style>