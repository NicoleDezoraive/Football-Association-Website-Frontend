<template>
  <div class="container">
    <h1 class="title">Manage League</h1>
    <div>
      <b-table
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        striped responsive="sm"
      >
      <template #cell(event)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Events
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-table
        :items="row.item.event"
        :fields="fields_events"
        responsive="sm"
      >
            <b-button size="sm" @click="row.toggleDetails">Hide Events</b-button>
          </b-table>
        </b-card>
      </template>
      </b-table>

      <div>
        Sorting By: <b>{{ sortBy }}</b
        >, Sort Direction:
        <b>{{ sortDesc ? "Descending" : "Ascending" }}</b>
      </div>
      <br>

      <div>
      <b-form @submit.prevent="onAddGame" @reset.prevent="onReset" inline>
      <h2> To add a game, fill in the following details: </h2>
      <b-form-group>
      <b-form-input
        id="date"
        v-model="date"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a date"
        list="date-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
       <b-form-input
        id="time"
        v-model="time"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a time"
        list="time-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      <b-form-input
        id="home_team"
        v-model="home_team"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a home_team"
        list="home_team-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      <br><br>
      <b-form-input
        id="away_team"
        v-model="away_team"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a away_team"
        list="away_team-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      <b-form-input
        id="stage"
        v-model="stage"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a stage"
        list="stage-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      <b-form-input
        id="referee"
        v-model="referee"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a referee"
        list="referee-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      </b-form-group>
      <br>
        <b-button
          type="submit"
          class="btn"
          style="width: 1000px; margin-left: auto; margin-right: auto"
          @click="addGame()"
          variant="primary"
          :disabled="!date.length || !time.length || !home_team.length || !away_team.length || !stage.length || !referee.length"
          >Add Game</b-button
        >
        <br><br>

      <b-form-group v-if="noResults" class="empty">
        <h4>No results returned: {{ erroMessage }}</h4>
      </b-form-group>
    </b-form>

    <b-form @submit2.prevent="onAddRes" @reset.prevent="onReset" inline>
      <h2> To add a result, fill in the following details: </h2>
      <b-form-group>
      <b-form-input
        id="game_id"
        v-model="game_id"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a game_ID"
        list="game_id-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
       <b-form-input
        id="result"
        v-model="result"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a result"
        list="result-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      </b-form-group>
      <br><br><br>
        <b-button
          type="submit2"
          class="btn"
          style="width: 1000px; margin-left: auto; margin-right: auto"
          @click="addRes()"
          variant="primary"
          :disabled="!game_id.length || !result.length"
          >Add Result</b-button
        >
        <br><br><br>
         <div class="alert" v-if="showAlert"><b-alert show dismissible fade variant="danger" class="m-3">{{messAlertRes }}</b-alert></div>
    </b-form>

    <b-form @submit3.prevent="onAddEevent" @reset.prevent="onReset" inline>
      <h2> To add a event, fill in the following details: </h2>
      <b-form-group>
      <b-form-input
        id="game_id_event"
        v-model="game_id_event"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a game_id_event"
        list="game_id_event-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
       <b-form-input
        id="date_event"
        v-model="date_event"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a date_event"
        list="date_event-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      <b-form-input
        id="time_event"
        v-model="time_event"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a time_event"
        list="time_event-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input><br><br>
       <b-form-input
        id="minute_event"
        v-model="minute_event"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a minute_event"
        list="minute_event-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      <b-form-input
        id="description_event"
        v-model="description_event"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter a description_event"
        list="description_event-options-list"
        style="width: 230px; padding: 5px"
      ></b-form-input>
      </b-form-group>
      <br>
        <b-button
          type="submit3"
          class="btn"
          style="width: 1000px; margin-left: auto; margin-right: auto"
          @click="addEvent()"
          variant="primary"
          :disabled="!game_id_event.length || !date_event.length || !time_event.length || !minute_event.length || !description_event.length"
          >Add Event</b-button
        >
        <br><br><br>
         <div class="alert" v-if="showAlert2"><b-alert show dismissible fade variant="danger" class="m-3">{{messAlertEvent }}</b-alert></div>
    </b-form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortBy: "age",
      sortDesc: false,
      fields: [
        { key: "game_id", sortable: false },
        { key: "home_team", sortable: true },
        { key: "away_team", sortable: true },
        { key: "date", sortable: true },
        { key: "time", sortable: false },
        { key: "stage", sortable: false },
        { key: "referee", sortable: false },
        { key: "result", sortable: false },
        { key: "event", sortable: false },
      ],
      fields_events: ["event_id", "game_id", "date", "time", "minute", "description"],
      items: [],
      noResults: false,
      date:"",
      time: "",
      home_team:"",
      away_team:"",
      stage:"",
      referee:"",
      game_id:"",
      result:"",
      showAlert: false,
      messAlertRes:"",
      showAlert2: false,
      messAlertEvent:"",
      game_id_event:"",
      date_event:"",
      time_event:"",
      minute_event:"",
      description_event:"",
    };
  },
 
  mounted() {
    this.showTable();
  },
  methods: {
    async showTable() {
      try {
        var manageAns;
        var manageAns2;
        const response = await this.axios.get(
          this.$root.store.BASE_URL + "/league/getLeagueGames"
        );
        manageAns = response.data[0];
        manageAns2 = response.data[1];
        this.items = [];
        for (var i = 0; i < manageAns.length; i++) {
          this.items.push(manageAns[i]);
        }
        for (var i = 0; i < manageAns2.length; i++) {
          this.items.push(manageAns2[i]);
        }
      } catch (err) {
        this.noResults = true;
        this.erroMessage = err.response.data;
        console.log(err.response.data);
      }
    },
    async addGame() {
      try {
        const response = await this.axios.post(
          this.$root.store.BASE_URL + "/league/addGameToLeague",
          {
            date: this.date,
            time: this.time,
            home_team: this.home_team,
            away_team: this.away_team,
            stage: this.stage,
            referee: this.referee,
          }
        );
        this.showTable();
        this.onReset();
      } catch (err) {
        console.log(err.response);
        alert(err.response);
      }
    },
    onAddGame() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.addGame();
      this.showTable();
    },
    async addRes() {
      try {
        this.showAlert = false;
        var idgame = parseInt(this.game_id);
        const response = await this.axios.post(
          this.$root.store.BASE_URL + "/league/addResultGameInLeague",
          {
            game_id: idgame,
            result: this.result,
          }
        );
        this.showTable();
        this.onReset();
      } catch (err) {
        console.log(err.response.data);
        this.showAlert = true;
        this.messAlertRes = err.response.data;
        alert(this.messAlertRes);
      }
    },
    onAddRes() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.addRes();
      this.showTable();
    },
    async addEvent() {
      try {
        this.showAlert2 = false;
        var idgame = parseInt(this.game_id_event);
        const response = await this.axios.post(
          this.$root.store.BASE_URL + "/league/addEventsGameInLeage",
          {
            game_id: idgame,
            date: this.date_event,
            time: this.time_event,
            minute: this.minute_event,
            description: this.description_event,
          }
        );
        this.showTable();
        this.onReset();
      } catch (err) {
        console.log(err.response.data);
        this.showAlert2 = true;
        this.messAlertEvent = err.response.data;
        alert(this.messAlertEvent);
      }
    },
    onAddEevent() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.addEvent();
      this.showTable();
    },
    onReset() {
      this.date="",
      this.time="",
      this.home_team="",
      this.away_team="",
      this.stage="",
      this.referee="",
      this.game_id="",
      this.result="",
      this.showAlert= false,
      this.game_id_event="",
      this.date_event="",
      this.time_event="",
      this.minute_event="",
      this.description_event="",
      this.showAlert2= false,
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  },
};
</script>

<style lang="scss" scoped>
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
h2 {
  text-align: center;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-weight: bold;
}
.alert{
  width: 100%;
 text-align: center;
}
</style>
