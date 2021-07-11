<template>
  <div class="game-preview">
    <!--preview of past game which include events and result game-->
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
    </div>
    <ul class="game-content">
      <li> host: {{ hostTeam }}</li>
      <li> guest: {{ guestTeam }}</li>
      <li> date: {{ date }}</li>
      <li> time: {{ time }}</li>
      <li> result: {{ result }}</li>
      <li> events:
        <ul>
          <span v-for="(e, index) in event" :key="index">
          <li >{{ event[index].description }}, minute: {{event[index].minute}}</li>
          </span>
        </ul> 
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      id: {
        type: Number,
        required: true
      },
      hostTeam: {
        type: String,
        required: true
      },
      guestTeam: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      result: {
        type: String,
        required: true
      },
      event: {
        type: Array,
        required: true
      }
  }, 
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 335px;
  height: 300px;
  position: relative;
  margin: 10px 10px;

  border-radius: 10px;

}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color: seagreen;
 font-weight: bold;
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
  text-align: left;
}



</style>