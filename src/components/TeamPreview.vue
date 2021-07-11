<template>
  <div>
    <b-card class="card">
      <!-- link to team-preview-full -->
      <router-link
        :to="{
          name: 'team',
          params: { teamId: team.id},
        }"
        class="team-preview"
      >
        <b-card-img
          :src="team.logo_path"
          img-top
          img-width="180"
          img-height="240"
          class="image"
        />
        <br />
        <br />
        <br />
        <b-card-title :title="team.name" class="team-title" style="font-size: 20px">
          {{ team.name }}
        </b-card-title>
      </router-link>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "TeamPreview",
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.team-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.team-preview > .team-body {
  width: 100%;
  height: 200px;
  position: relative;
}
.team-preview .team-body .team-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.team-preview .team-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}
.team-preview .team-footer .team-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.team-preview .team-footer ul.team-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}
.team-preview .team-footer ul.team-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.body {
  font-size: 17px;
  color: black;
}
.button {
  font-size: 16px;
}
.image:hover {
  transform: scale(1.2);
}
.card {
  background-color: rgba(0, 0, 0, 0.2);
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}
.team-title {
  color: black;
  font-weight: bold;
}
</style>
