<template>
  <div class="container">
    
    <h1 class="title">About us!</h1>
    <h3 style="text-align: center;">Lahan Barmocha & Nicole Dezoraive</h3>
    <br/>
    <div class="project">
      <h6 class="about">
      We are both third year students in Information Systems and Software
      Engineering at Ben Gurion University. We are both hard
      workers, and work well in teams. 
      We hope you enjoyed our website as much as we did making it
      <b-icon-emoji-smile></b-icon-emoji-smile>
    </h6>
    <br>
      <h3 style="font-weight:bold;">Take a look at our other projects:</h3>
      <a
        href="https://web-development-environments-2021.github.io/Assignment2_313584294_205590656/"
        target="_blank"
        >Pacman Game</a
      >
      <br />
      <a
        href="https://web-development-environments-2021.github.io/205590656/"
        target="_blank"
        >Lahan's Website</a
      >
      <br />
      <a
        href="https://web-development-environments-2021.github.io/313584294/"
        target="_blank"
        >Nicole's Website</a
      >
    </div>
    <b-carousel
      class="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="500"
      img-height="200"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide
        img-src="https://i.ibb.co/hfZpHrg/L-N.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://i.ibb.co/GtZfb4W/web.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://i.ibb.co/QdWgx9X/web2.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://i.ibb.co/6WVLTyP/Welcome-Page.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://i.ibb.co/z78N8L9/GamePage.png"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import { BIconEmojiSmile } from "bootstrap-vue";
export default {
  components: {
    BIconEmojiSmile,
  },
};
</script>

<style scoped>
.carousel-1 {
  height: 300px;
  width: 500px;
position: absolute;
  right: 180px;}
.container {
  font-family: Impact, Charcoal, sans-serif;
 overflow: hidden;
}
.project {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-weight: bold;
  width: 500px;
  padding: 5px;
  float: left;
}
a {
  color: darkcyan;
}
a:hover {
  color: red;
}
.about{
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 18px;
  font-weight: bold;
  width: 480px;
  text-align: center;
}
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
