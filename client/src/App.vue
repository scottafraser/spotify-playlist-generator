<template>
  <v-app light>
    <SideMenu :drawer="drawer" :api_key="api_key" @selectsource="setResource"></SideMenu>
    <!--add this component in the template -->
    <v-toolbar fixed app light clipped-left color="primary" class="elevation-2">
      <v-toolbar-side-icon @click="drawer = !drawer" class="white--text"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">News App</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container v-if="user" fluid>
        <MainContent :user="user"></MainContent>
      </v-container>
    </v-content>
    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>by
            <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            and
            <a
              class="white--text"
              href="https://github.com/rachidsakara"
              target="_blank"
            >Rachid Sakara</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
import axios from 'axios'
import MainContent from './components/MainContent.vue'
import SideMenu from './components/SideMenu.vue' // import the SideMenu component

export default {
  components: {
    MainContent,
    SideMenu // Register the component
  },
  data() {
    return {
      user: {},
      drawer: false,
      api_key: process.env.VUE_APP_SECRET,
      articles: [],
      errors: []
    }
  },
  created() {
    const jwt = window.sessionStorage.getItem("jwt");
    let token = "";
    if (jwt) {
      token = jwt;
    } else {
      document.title = "Spotify Shuffle";
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      e = r.exec(q);
      while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
      }
      token = hashParams.access_token;
    }
    if (token) {
      window.sessionStorage.setItem("jwt", token);
      window.sessionStorage.setItem("expiryToken", Date());
      this.spotify.setAccessToken(token);
    }
    this.spotify.getMe().then(response => {
      this.user = response.body
    });
  },
  //add the methodes events hadler with setResource() function
  methods: {
    setResource(source) {      axios.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key)
      .then(response => {
        this.articles = response.data.articles
      })
      .catch(e => {
        this.errors.push(e)
      })

    }
  }
}

</script>
