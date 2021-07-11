<template>
  <div class="container">
    <div>
      <b-card class="container2">
        <b-card-text>
            <div class="player-preview">
              <h3 align="center" class="title">Players:</h3>
              <b-carousel class="carousel-1"
                :interval="40000"
                controls
                indicators
                background="grey"
                img-width="100"
                img-height="125"
                style="text-shadow: 1px 1px 2px #555"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <b-carousel-slide v-for="(p, index) in players" img-blank :key="index">
                  <template>
                    <PlayerPreview class="PlayerPreview" :player="p"/>
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </div>
        </b-card-text>
      </b-card>
       <br /><br />
    </div>
    <div >
      <h3 align="center" class="title">Past Matches:</h3>
      <b-table :items="past_matches" :fields="fields_past" striped responsive="sm">
        <template #cell(event)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? "Hide" : "Show" }} Events
          </b-button>
        </template>
        <template v-slot:row-details="row">
          <b-card>
            <b-table
              :items="row.item.event"
              :fields="fields_events"
              striped
              responsive="sm"
            >
              <b-button size="sm" @click="row.toggleDetails">Hide Events</b-button>
            </b-table>
          </b-card>
        </template>
      </b-table>
    </div>
    <div >
      <h3 align="center" class="title">Future Matches</h3>
      <b-table :items="future_matches" :fields="fields_future" striped responsive="sm">
      </b-table>
    </div>
  </div>
</template>

<script>
import PlayerPreview from "../components/PlayerPreview.vue";
export default {
  components: {
  PlayerPreview,
  },
  data() {
    return {
      teamName: null,
      players: {},
      past_matches: [],
      future_matches: [],
      fields_past: [
        "game_id",
        "date",
        "time",
        "home_team",
        "away_team",
        "stage",
        "result",
        "referee",
        "event",
      ],
      fields_future: [
        "game_id",
        "date",
        "time",
        "home_team",
        "away_team",
        "stage",
        "referee",
      ],
      fields_events: ["event_id", "game_id", "date", "time", "minute", "description"],
      sliding: null,
    };
  },
  mounted(){
    this.created(); 
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    async created() {
      try {
        let _players;
        let _historyGames;
        let _FutureGames;
        const response = await this.axios.get(
          this.$root.store.BASE_URL +
            "/teams/fullTeamInfo/id/" +
            this.$route.params.teamId
        );
        _players = response.data[0];
        _historyGames = response.data[1];
        _FutureGames = response.data[2];
        this.players = {};
        for (var i = 0; i < _players.players.length; i++) {
            let numberObject =  _players.players[i];
            this.$set( this.players, i, numberObject)
        }
        this.past_matches = [];
        for (var i = 0; i <  _historyGames.historyGames.length; i++) {
            let numberObject = _historyGames.historyGames[i].home_team;
            if(numberObject== this.$route.params.teamId)
               this.past_matches.push(_historyGames.historyGames[i]);
        }
        this.future_matches = _FutureGames.FutureGames;
      } catch (error) {
        console.log(error);
        this.$router.replace("/NotFound");
        return;
      }
    },
  },
};
</script>

<style scoped>
.carousel-1 {
    border-radius: 2px 2px 2px 2px;
    overflow: hidden;
    height: 400;
    width: 100;
    margin-bottom: 0px;
    margin-top:0px;
    margin-left: 0px;
    margin-right: 0px;
}
.header {
  background-color: gainsboro;
  border-style: groove;
  border-radius: 5px;
  padding: 2px;
} 
.card {
  background-color: rgba(0, 0, 0, 0.2);
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  margin-bottom: 0px;
}
.title {
  background: url("https://ae01.alicdn.com/kf/HTB1PlSmirorBKNjSZFjq6A_SpXa6/Laeacco.jpg_q50.jpg");
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  text-align: center;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 50px;
  font-weight: bold;
}
.player-preview {
  width: 500px;
  text-align: center;
}
.container2 {
  margin: auto;
  width: 50%;
  border: 3px solid green;
}
</style>
