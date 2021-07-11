<template>
  <div class="container">
    <!--Page that show all user's favorite games-->
    <h1 class="title">Favorite Games</h1>
     <b-container class="bv-example-row">
      <b-row>
        <b-col>
            <FavoriteGames>
                
            </FavoriteGames>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import FavoriteGames from "../components/FavoriteGames"
  export default {
    components: {FavoriteGames}
  };

</script>

<style lang="scss" scoped>

.title{
    background: url("https://ae01.alicdn.com/kf/HTB1PlSmirorBKNjSZFjq6A_SpXa6/Laeacco.jpg_q50.jpg");
    color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-align: center;
    font-family:"Trebuchet MS", Helvetica, sans-serif;
    font-size: 50px;
    font-weight: bold;
}
</style>