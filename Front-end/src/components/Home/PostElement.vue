<template>
  <div class="write-post-container" @submit.prevent="addPost">
    <div class="user-profile">
      <img
        class="avatar dropdown-toggle"
        :src="avatarUser"
        alt=""
        type="button"
      />
      <div class="info-user">
        <p style="margin-bottom: 0 !important">{{username}}</p>
        <span class="time-post">{{moment(timePost).format("LLL")}}</span>
      </div>
    </div>
    <p class="post-content">{{content}}</p>
    <img v-if="image" class="img-post" :src="image" alt="img" srcset="">
    <div class="post-input-content"></div>
  </div>
</template>

<script>
export default {
    props:['username', 'timePost','content','image','avatarUser'],
    methods: {
    }
};
</script>

<style  scoped>
.write-post-container {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 20px;
  columns: #626262;
  margin:20px 0;
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
.user-profile .time-post{
    font-size:13px;
    color:#9a9a9a;
}
.post-content{
    color:#9a9a9a;
    margin: 15px 0 ;
    font-size: 15px;
}
.img-post{
    width: 100% ;
    border-radius:4px ;
    margin-bottom: 5px;
}
</style>