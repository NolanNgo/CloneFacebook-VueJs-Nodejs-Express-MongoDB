<template>
  <div class="list-links">
    <ul class="list-media">
      <li>
        <a href="#"
          ><img src="@/assets/img/user-group.svg" alt="user-group"
        />Group</a>
      </li>
            <li>
        <a href="#"><img src="@/assets/img/friends.svg" alt="home" />Friend</a>
      </li>
      <li>
        <a href="#"
          ><img src="@/assets/img/shopping-cart.svg" alt="shopping-cart"
        />Market</a>
      </li>
      <li>
        <a href="#"
          ><img src="@/assets/img/television.svg" alt="televison"
        />Watch</a>
      </li>
      <li>
        <a href="#"><img src="@/assets/img/home.svg" alt="home" />Home</a>
      </li>
    </ul>
    <!-- <a href="#"><img src="@/assets/img/user-group.svg" alt="user-group"></a>
        <a href="#"><img src="@/assets/img/shopping-cart.svg" alt="shopping-cart"></a>
        <a href="#"><img src="@/assets/img/television.svg" alt="televison"></a>
        <a href="#"><img src="@/assets/img/home.svg" alt="home"></a> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div.list-links ul.list-media {
  list-style: none;
}
div.list-links ul.list-media a{
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    color: #626262;
    width: fit-content;
}
div.list-links ul.list-media li img {
  width: 28px;
  margin:0 30px
}
</style>