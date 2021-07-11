<template>
    <div class="league-preview">
      <b-card class="card">
      <!--basic preview of league details-->
      <b-card-title class="league-title"> {{ leagueName }}</b-card-title>
      <b-card-text>
        <b>Season:</b> {{ season }}
        <br/>
         <b>Stage:</b>{{ stage }}
        <br/>
        <br/>        
        <b>Next Game:</b>
        <br/>
       <b> Home team id:</b> {{ next[0].home_team }}
        <br/>        
        <b>Away team id:</b> {{ next[0].away_team }}
        <br/>
         <b>Date:</b>{{ next[0].date }}
        <br/>
        <b>Time:</b> {{ next[0].time }}
        <br/>
         <b>Stage:</b>{{ next[0].stage }}
        
    <!--button that link to all games at stage-->
      </b-card-text >
        <b-button   :to="{ name: 'currentGames' }">All Games In Stage</b-button>
      </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leagueName:'', 
      season:'', 
      stage:'',
      next:'',
    };
  },
  methods: {
    // fill all data fields of league from DB 
    async leagueDetails() {
      console.log("response");
      try {
        const response = await this.axios.get(
        "http://localhost:4000/league/getDetails",
        );
          
        let info = response.data;
        this.leagueName = info.league_name;
        this.season = info.current_season_name;
        this.stage = info.current_stage_name;
        this.next = info.next_game;        
        
        console.log(response);
      } catch (error) {
          console.log("error in update league");
          console.log(error);
        }
      }
  },
  mounted(){
    console.log("league details mounted");
    this.leagueDetails();
  },
}
</script>

<style>
.league-preview {
  background-color: rgba(0, 0, 0, 0.1);
  display: inline-block;
  width: 340px;
  height: 386px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 4px;
  
}

 .league-title {
  text-align: center;
  text-transform: uppercase;
font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.1);
}
.card {
  background-color: rgba(0, 0, 0, 0.2);
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}
.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}
.project {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-weight: bold;
  width: 500px;
  /* border: 2px solid #2c3e50; */
  padding: 5px;
    float: left;
}

</style>