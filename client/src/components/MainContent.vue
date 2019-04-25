<template>
  <div id="e3" style="margin: auto;" class="grey lighten-3">
    <v-layout row wrap align-center>
      <v-flex xs8 offset-md2>
        <v-chip>
          <v-avatar>
            <img :src="user.images[0].url" alt="trevor">
          </v-avatar>
          {{ user.display_name}}
        </v-chip>
        <div v-if="playlists.length > 0">
          <div v-for="playlist in playlists" :key="playlist.name">
            <v-flex xs12>
              <v-card color="purple" class="white--text">
                <v-layout row>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{playlist.name}}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <v-flex xs5>
                    <v-img :src="playlist.images[0].url" height="125px" contain></v-img>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  Rate this album
                  <v-spacer></v-spacer>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                  <v-icon>star_border</v-icon>
                </v-card-actions>
              </v-card>
            </v-flex>
            <br>
            <!-- <v-card class="my-3" hover>
            <!-- <v-card-media>-->
            <!-- <v-img height="350px" v-bind:src="article.urlToImage"></v-img>
            <v-container fill-height fluid>
              <v-layout>
                <v-flex xs12 align-end d-flex>
                  <span class="headline">{{ article.title }}</span>
                </v-flex>
              </v-layout>
            </v-container>-->
            <!-- </v-card-media> -->
            <!-- <v-card-text>{{ article.description }}</v-card-text>
            <v-card-actions>
              <v-chip small color="secondary" class="white--text">{{article.source.name}}</v-chip>
              <v-spacer></v-spacer>
              <v-btn icon class="red--text">
                <v-icon small>fab fa-reddit</v-icon>
              </v-btn>
              <v-btn icon class="light-blue--text">
                <v-icon small>fab fa-twitter</v-icon>
              </v-btn>
              <v-btn icon class="blue--text text--darken-4">
                <v-icon small>fab fa-facebook</v-icon>
              </v-btn>
              <v-btn icon class="red--text">
                <v-icon small>fab fa-google-plus</v-icon>
              </v-btn>
              <v-btn icon class="blue--text text--darken-4">
                <v-icon small>fab fa-linkedin</v-icon>
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn small replace color="info" v-bind:href="article.url" target="_blank">Read More</v-btn>
            </v-card-actions>
            </v-card>-->
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  },
  data() {
    return {
      playlists: []
    }
  },
  created() {
    this.spotify.getUserPlaylists(this.user.id).then(response => {
      this.playlists = response.body.items
    })
  }
}
</script>
