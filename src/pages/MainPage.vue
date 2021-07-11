<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
     <b-container class="bv-example-row">
      <b-row>
        <b-col>
            <LeagueInfo></LeagueInfo>
        </b-col>
        <b-col>
          <div v-if="!$root.store.username" to="/login">
            <Login />
          </div>
          <div v-else>
            <ThreeFavoriteGames></ThreeFavoriteGames>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import ThreeFavoriteGames from "../components/ThreeFavoriteGames";
import Login from "../components/Login" 
export default {
  components: {
    LeagueInfo,
    Login, 
    ThreeFavoriteGames
  },
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