<template>
  <div>
    <b-row class="center">
        <!--Past  Games-->
        <b-col>
            <h2 class="center">Past Games</h2>
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

        </b-col>
        <!--Future  Games-->
        <b-col class="center">
            <h2>Future Games</h2>
            <GamePreview
            v-for="g in f_games"
            :id="g.game_id" 
            :hostTeam="g.home_team" 
            :guestTeam="g.away_team" 
            :date="g.date" 
            :time="g.time"
            :key="g.id">
            </GamePreview>  
        </b-col>
    </b-row>
    
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
import PastGamePreview from "./PastGamePreview.vue";

export default {
  name: "AllGames",
  components: {
    GamePreview,
    PastGamePreview
      }, 
  data() {
    return {
      p_games: [],
      f_games:[],
      event:[],
    };
  },
  methods: {
    // fill past games details, result and events into array   
    async pastGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
            this.$root.store.BASE_URL + "/game/pastGames",
        );
        const games = response.data;
        this.p_games = [];
        this.p_games.push(...games);
        this.event=[];
        this.event.push(...games.event)
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    },
    // fill all details about future games  into array
    async futuerGames(){
      console.log("response");
      try {
        const response = await this.axios.get(
            this.$root.store.BASE_URL + "/game/currentCycleGames",
        );
        const games = response.data;
        this.f_games = [];
        this.f_games.push(...games);

        
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
      }
  }, 
  },
  mounted(){
    console.log("favorite games mounted");
    this.pastGames(); 
    this.futuerGames();
  }
};
</script> 

<style>
.center {
  color: #2c3e50;
  text-align: center;
}
</style>