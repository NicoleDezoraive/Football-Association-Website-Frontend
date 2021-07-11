<template>
  <div>
    <!--button of mark as favorite is avilable only if is un mark yet, on click the game become favorite-->
    <div v-if="!this.favorite">
      <button class="favorite" @click="toggleFavorite()" :class="{ active : this.defulte_favorite }">
      <b-icon-heart-fill  v-if="!this.favorite" style="color:#A9A9A9"/>
      <b-icon-heart-fill  v-else style="color:#FF0000"></b-icon-heart-fill>
      </button>
    </div>
    <!--if game is mark as favorite the button is unavilable -->
    <div v-else>
      <button class="favorite" >
      <b-icon-heart-fill style="color:#FF0000"></b-icon-heart-fill>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Favorite',
  data () {
    return {
      defulte_favorite: false,
    }
  },
  props: {
      gameID: {
        type: Number,
        required: true
      },
       favorite: {
        type: Number,
        required: true
      },
  },
  methods: {
    // On click this function update DB that user mark this game as favorite
    async toggleFavorite () {
      this.favorite = !this.favorite;
      try {
          const post = await this.axios.post(
            "http://localhost:4000/users/addFavoriteGames",
            {
              game_id: this.gameID,
            }
          );
      }
      catch (error) {
          console.log(error.response);
        }
    },
  
  async updatestatus()
    {
      this.defulte_favorite= this.favorite; 
 }
  },

  mounted(){
    this.updatestatus();
  },

}
</script>