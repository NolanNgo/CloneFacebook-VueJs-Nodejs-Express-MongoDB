<template>
  <div :class="nameClass">
    <div class="content">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      <button class="btn transparent" :id="nameId" @click="clickEvent">
        {{ valueBtn }}
      </button>
    </div>
    <img :src="srcImg" class="image" :alt="srcImg" />
  </div>
</template>

<script>
export default {

  props: ["nameClass", "nameId", "srcImg"],



  methods: {
    clickEvent(){
      console.log(this.modePanels);
    }
  },
};
</script>

<style></style>
