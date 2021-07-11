<template>
  <div class="container">
    <h1 class="title">All Games In Current Stage</h1>
     <b-container class="bv-example-row">
      <b-row>
        <b-col>
            <AllGames>
            </AllGames>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import AllGames from "../components/AllGames"
  export default {
    components: {AllGames}
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