<template>
  <div>
 <!--Past  Games with result and events-->
     <PastGamePreview
        v-for="g in p_games"
        :id="g.game_id" 
        :hostTeam="g.home_team" 
        :guestTeam="g.away_team" 
        :date="g.date" 
        :time="g.time"
        :result="g.result"
        :event="g.event"
        :key="g.id">
    </PastGamePreview> 
  </div>
</template>

<script>
import PastGamePreview from "./PastGamePreview.vue";
export default {
  name: "AllLeagueGames",
  components: {
    PastGamePreview
  }, 
  data() {
    return {
      games: [],
    };
  },
  methods: {
  // fill array  with all data about games at current league
    async updateGamesLeague(){
      console.log("response");
      try {
        const response = await this.axios.get(
            this.$root.store.BASE_URL + "/league/getLeagueGames",
        );
        const games = response.data;
        let pastGames=[];
        pastGames.push(...games[0]);
        let futureGames=[];
        futureGames.push(...games[1]);
        this.games = [];
        this.games.push(...pastGames);
        this.games.push(...futureGames);
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }

    }
  }, 
  mounted(){
    console.log("all games mounted");
    this.updateGamesLeague(); 
  }
};
</script> 

<style></style>