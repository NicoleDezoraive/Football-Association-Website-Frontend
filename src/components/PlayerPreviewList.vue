<template>
  <b-container>
    <h3 class="title">
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <div v-if="pageType === 'search'">
        <b-col v-for="p in playersList" :key="p.id">
          <PlayerPreview class="PlayerPreview" :player="p" />
          <br />
        </b-col>
      </div>
      <div v-else>
        <b-col v-for="p in players" :key="p.id">
          <PlayerPreview class="PlayerPreview" :player="p" />
          <br />
        </b-col>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
export default {
  name: "PlayerPreviewList",
  components: {
    PlayerPreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    pageType: {
      type: String,
      required: true,
    },
    playersList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      players: [],
    };
  },
  mounted() {
    this.updatePlayers();
  },

  methods: {
    async updatePlayers() {
      try {
        let globalPlayers = [];
        if (this.pageType != "search") {
          var players;
          let url = "http://localhost:4000/";
          }
          if (globalPlayers.length != 0) {
            players = globalPlayers;
            console.log("took from global storage");
          } else {
            const response = await this.axios.get(url, {
              withCredentials: true,
            });
            players = response.data;
            if (this.pageType == "lastSeen") {
              this.$root.store.lastSeenPlayers = players;
          }

          if (this.$root.store.username) {
            const players_ids = [];
            for (var i = 0; i < players.length; i++) {
              players_ids.push(players[i].id);
            }
            console.log(players_ids);
            const responsePlayersInfo = await this.axios.get(
              this.$root.store.BASE_URL +
                "/players/previewPlayerInfo/ids/[" +
                players_ids +
                "]", 
            );
            var playerInfo = responsePlayersInfo.data;
          }
          this.players = [];
          for (var i = 0; i < players.length; i++) {
            var currPlayer = players[i];
            this.players.push(currPlayer);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
.title {
  color: #2c3e50;
  -webkit-text-stroke-width: 1px;
  text-align: center;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 30px;
  font-weight: bold;
}
</style>
