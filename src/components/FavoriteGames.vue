<template>
  <div>
    <!--general game preview-->
    <GamePreview
      v-for="g in games"
      :id="g.game_id" 
      :hostTeam="g.home_team" 
      :guestTeam="g.away_team" 
      :date="g.date" 
      :time="g.time" 
      :key="g.id">
      </GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";

export default {
  name: "FavoriteGames",
  components: {
    GamePreview,
  }, 
  data() {
    return {
      games: [],
    };
  },
  methods: {
    // fill array with all details about user's favorite games
    async updateGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
            this.$root.store.BASE_URL + "/users/favoriteGames",
        );
        const games = response.data;
        this.games = [];
        this.games.push(...games);
        
        // keep array of favorite game at local storage
        localStorage.setItem("ArrayOfFavorite", JSON.stringify(this.games));

        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  },

};
</script> 

<style></style>