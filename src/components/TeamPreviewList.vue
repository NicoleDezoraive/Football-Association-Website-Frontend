<template>
  <b-container>
    <h3 class="title">
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <div v-if="pageType === 'search'">
        <b-col v-for="t in teamsList" :key="t.id">
          <TeamPreview class="TeamPreview" :team="t" />
          <br />
        </b-col>
      </div>
      <div v-else>
        <b-col v-for="t in teams" :key="t.id">
          <TeamPreview class="TeamPreview" :team="t" />
          <br />
        </b-col>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "TeamPreviewList",
  components: {
    TeamPreview,
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
    teamsList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      teams: [],
    };
  },
  mounted() {
    this.updateTeams();
  },

  methods: {
    async updateTeams() {
      try {
        let globalTeams = [];
        if (this.pageType != "search") {
          var teams;
          let url = "http://localhost:3004/"; 
          }
          if (globalTeams.length != 0) {
            teams = globalTeams;
            console.log("took from global storage");
          } else {
            const response = await this.axios.get(url, {
              withCredentials: true,
            });
            teams = response.data;
            if (this.pageType == "lastSeen") {
              this.$root.store.lastSeenTeams = teams;
          }

          if (this.$root.store.username) {
            const teams_ids = [];
            for (var i = 0; i < teams.length; i++) {
              teams_ids.push(teams[i].id);
            }
            const responseTeamsInfo = await this.axios.get(
              this.$root.store.BASE_URL +
                "/teams/previewTeamInfo/ids/[" +
                teams_ids +
                "]",
              { withCredentials: true }
            );
            var teamInfo = responseTeamsInfo.data;
          }
          this.teams = [];
          for (var i = 0; i < teams.length; i++) {
            var currTeam = teams[i];
            this.teams.push(currTeam);
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
