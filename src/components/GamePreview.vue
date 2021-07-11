<template>

<div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
      <!--Add to favorite show only when user is connect-->
      <div v-if="$root.store.username">
        <Favorite
        :gameID="this.id"
        :favorite="this.favorite_final"
        ></Favorite>
      </div>
    </div>
    <!--basic preview of game-->
        <ul class="game-content">
          <li> host: {{ hostTeam }}</li>
          <li> guest: {{ guestTeam }}</li>
          <li> date: {{ date }}</li>
          <li> time: {{ time }}</li>
        </ul>
       

  </div>
  
</template>

<script>
import Favorite from "./Favorite.vue"

export default {
  name: "GamePreview",
  components: {
    Favorite
      },
  data(){
    return{
      id_game: "",
      favorite_final: false,
      favoriteLoacalStorage:[],

    }
  },
  props: {
      id: {
        type: Number,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },

      

  }, 
  methods:{ 
    async updateIDGame()
    {
      this.id_game= this.id;
  },
  //update mark as favorite for each game if it is include at local storage array of favorite games 
  async updatefavorite()
    {
      if(localStorage.ArrayOfFavorite){
        this.favoriteLoacalStorage  = JSON.parse(localStorage.ArrayOfFavorite);
        for (var i = 0; i < this.favoriteLoacalStorage.length; i++) {
            if (this.favoriteLoacalStorage[i].game_id==this.id)
              this.favorite_final=true;
          }
    }
 },

  },
  mounted(){
    console.log("game preview mounted")
    this.updateIDGame();
    this.updatefavorite();
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
 


   font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
   font-weight: bold;
  background-color: rgba(0, 0, 0, 0.15);

}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  darkcyan;
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>