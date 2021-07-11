<template>
  <div class="container">
    <h1 class="title"><b-icon icon="search"></b-icon>Search Page</h1>

    <b-form @reset.prevent="onReset">
      <b-form-group label="Do you want to look for a player or a team?">
        <b-form-radio-group
          id="radio-group-1"
          v-model="selected"
          :options="options"
          name="radio-options"
        ></b-form-radio-group>
      </b-form-group>
      <h4>What's your {{ selected }} name? <b-icon icon="chat-dots"></b-icon></h4>
      <b-form-input
        id="search"
        v-model="searchContent"
        placeholder="Search Query"
        type="search"
        list="search-options-list"
        style="width: 430px; padding: 5px"
      ></b-form-input>
      <b-form-group
        label="Do you want to search by game position or by group name?"
        :disabled="selected == 'team'"
      >
        <b-form-radio-group
          id="radio-group-2"
          v-model="selected2"
          :options="options2"
          name="radio-options2"
        ></b-form-radio-group>
      </b-form-group>
      <h10 :disabled="selected == 'team'"
        >What {{ selected2 }} would you like to looking for?</h10
      >
      <b-form-input
        :disabled="selected == 'team' || selected2=='only name player'"
        id="search2"
        v-model="searchContent2"
        placeholder="your answer"
        type="search"
        list="search-options-list"
        style="width: 430px; padding: 5px"
      ></b-form-input>
      <br />

      <!-- button Search-->
      <center>
          <b-button
            type="button"
            class="btn"
            style="width: 230px; margin-left: auto; margin-right: auto"
            @click="search()"
            variant="primary"
            :disabled="!searchContent.length"
            >Search</b-button
          >
      </center>
      <br /><br />

      <!--  sort -->
      <b-form-group
        id="input-group-sort"
        label-cols-sm="3"
        label="Sort By:"
        label-for="Sort By"
      >
        <b-form-select
          v-model="sort"
          @change="sortby"
          :disabled="!ans || !ans.length"
          width="20px"
        >
          <b-form-select-option :value="null" disabled>--Sort By--</b-form-select-option>
          <b-form-select-option value="teamByNameTeam" :disabled="selected == 'player'"
            >Sort teams by name team</b-form-select-option
          >
          <b-form-select-option value="playerByNamePlayer" :disabled="selected == 'team'"
            >Sort players by name player</b-form-select-option
          >
          <b-form-select-option value="playerByNameTeam" :disabled="selected == 'team'"
            >Sort players by name team</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <div v-if="noResults" class="empty">
        <h4>No results returned</h4>
      </div>

      <!-- results -->
      <div v-else>
        <div v-if="selected == 'player' && lastSearcType == 'player'">
          <PlayerPreviewList
            title="Results:"
            pageType="search"
            :playersList="ans"
            class="SearchAns"
          />
        </div>
        <div v-else-if="selected == 'team' && lastSearcType == 'team'">
          <TeamPreviewList
            title="Results:"
            pageType="search"
            :teamsList="ans"
            class="SearchAns"
          />
        </div>
        <div v-else-if="selected == 'player' && lastSearcType == 'team'">
          <TeamPreviewList
            title="Results:"
            pageType="search"
            :teamsList="ans"
            class="SearchAns"
          />
        </div>
        <div v-else-if="selected == 'team' && lastSearcType == 'player'">
          <PlayerPreviewList
            title="Results:"
            pageType="search"
            :playersList="ans"
            class="SearchAns"
          />
        </div>
        <div v-else-if="selected == 'player'">
          <PlayerPreviewList
            title="Results:"
            pageType="search"
            :playersList="ans"
            class="SearchAns"
          />
        </div>
        <div v-else-if="selected == 'team'">
          <TeamPreviewList
            title="Results:"
            pageType="search"
            :teamsList="ans"
            class="SearchAns"
          />
        </div>
      </div>
    </b-form>
    <br />
  </div>
</template>

<script>
import PlayerPreviewList from "../components/PlayerPreviewList";
import TeamPreviewList from "../components/TeamPreviewList";
export default {
  components: {
    PlayerPreviewList,
    TeamPreviewList,
  },
  data() {
    return {
      searchContent: "",
      searchContent2: "",
      noResults: false,
      erroMessage: "",
      ans: [],
      sort: null,
      selected: "player",
      options: [
        { text: "player", value: "player" },
        { text: "team", value: "team" },
      ],
      selected2: "only name player",
      options2: [
        { text: "Group Name", value: "Group Name" },
        { text: "Game Position", value: "Game Position" },
        { text: "only name player", value: "only name player" },
      ],
      lastSearch: "",
      lastSearchTerm: "",
      lastSearcType: "",
    };
  },

  mounted() {
    this.lastSearchTerm = localStorage.getItem("lastSearchTerm");
    this.loadHistorySearch();
  },
  methods: {
    async loadHistorySearch() {
      try {
        if (this.$root.store.username) {
          if (localStorage.lastSearch) {
            this.ans = JSON.parse(localStorage.lastSearch);
          }
        } else {
          if (localStorage.lastSearch) {
            localStorage.removeItem("lastSearch");
            this.lastSearcType = "";
          }
        }
      } catch (err) {
        console.log(err.response);
      }
    },
    async search() {
      try {
        var searchAns;
        let response = "";
        this.lastSearcType = this.selected;
        if (this.selected == "player" && this.selected2 == "Group Name") {
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/search/queryPlayer/namePlayer/" +
              this.searchContent +
              "/groupName/" +
              this.searchContent2,
            {
              params: {
                searchQuery: this.searchContent,
                name: this.searchContent2,
              },
            }
          );
        } else if (this.selected == "player" && this.selected2 == "Game Position") {
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/search/queryPlayer/namePlayer/" +
              this.searchContent +
              "/gamePosition/" +
              this.searchContent2,
            {
              params: {
                searchQuery: this.searchContent,
                num: this.searchContent2,
              },
            }
          );
        }else if (this.selected == "player" && this.selected2 =="only name player") {
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/search/queryPlayer/namePlayer/" +
              this.searchContent,
            {
              params: {
                searchQuery: this.searchContent,
              },
            }
          );
        }else if (this.selected == "team") {
          response = await this.axios.get(
            this.$root.store.BASE_URL +
              "/search/queryTeam/nameTeam/" +
              this.searchContent,
            {
              params: {
                searchQuery: this.searchContent,
              },
            }
          );
        }
        searchAns = response.data;
        if (this.$root.store.username) {
          const ans_ids = [];
          for (var i = 0; i < searchAns.length; i++) {
            if (this.selected == "player") ans_ids.push(searchAns[i].player_id);
            else if (this.selected == "team") ans_ids.push(searchAns[i].id);
          }
          let responseAnsInfo = "";
          if (this.selected == "player") {
            responseAnsInfo = await this.axios.get(
              this.$root.store.BASE_URL +
                "/players/previewPlayerInfo/ids/[" +
                ans_ids +
                "]"
            );
          } else {
            responseAnsInfo = await this.axios.get(
              this.$root.store.BASE_URL + "/teams/previewTeamInfo/ids/[" + ans_ids + "]",
              { withCredentials: true }
            );
          }
          var ansInfo = responseAnsInfo.data;
          localStorage.setItem("lastSearchTerm", this.searchContent);
          this.lastSearchTerm = this.searchContent;
          localStorage.setItem("lastSearchTerm2", this.searchContent2);
          this.lastSearchTerm2 = this.searchContent2;
          localStorage.setItem("lastSearcType", this.selected);
          this.lastSearcType = this.selected;
        }
        this.ans = [];
        for (var i = 0; i < searchAns.length; i++) {
          this.ans.push(searchAns[i]);
        }
        if (this.$root.store.username) {
          localStorage.setItem("lastSearch", JSON.stringify(this.ans));
        }
        if (this.ans.length == 0) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      } catch (err) {
        this.noResults = true;
        this.erroMessage = err.response.data;
        console.log(err.response.data);
      }
    },
    sortby() {
      if (this.sort == "teamByNameTeam") {
        function compareAlphabet(a, b) {
          var a_name = a.name.toUpperCase(); // ignore upper and lowercase
          var b_name = b.name.toUpperCase(); // ignore upper and lowercase
          if (a_name < b_name) return -1;
          if (a_name > b_name) return 1;
          return 0;     
        }
        return this.ans.sort(compareAlphabet);
      } else if (this.sort == "playerByNamePlayer") {
        function compareAlphabet(a, b) {
            var a_name = a.name.toUpperCase(); // ignore upper and lowercase
            var b_name = b.name.toUpperCase(); // ignore upper and lowercase
            if (a_name < b_name) return -1;
            if (a_name > b_name) return 1;
            return 0;
        }
         return this.ans.sort(compareAlphabet);
      } else if (this.sort == "playerByNameTeam") {
          if (this.ans.length != 0) {
            var a_name = a.team_name.toUpperCase(); // ignore upper and lowercase
            var b_name = b.team_name.toUpperCase(); // ignore upper and lowercase
            if (a_name < b_name) return -1;
            if (a_name > b_name) return 1;
            return 0;
        }
        return this.ans.sort(compareAlphabet);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
}
.empty {
  color: red;
}
#search {
  margin-left: 20px;
  width: 500px;
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
</style>
