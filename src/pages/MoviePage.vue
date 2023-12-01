<template>
  <q-page class="q-pa-lg">
    <div class="q-pa-md example-column-horizontal-alignment">

      <div class="column" >
        <q-input outlined v-model="movie.title" label="Title" stack-label />
      </div>
      <div style="margin: 20px"/>
      <div class="column">
        <q-input outlined v-model="movie.director" label="Director" stack-label />
      </div>
      <div style="margin: 20px"/>
      <div class="column">
        <q-input outlined v-model="movie.summary" label="Summary" type="textarea" stack-label
                 :rules="[ val => val.length <= 100 || 'Please use maximum 100 characters']"/>
      </div>


      <div style="margin: 20px"/>
      <div class="q-pa-md q-gutter-md">
        <span v-for="(genre, index) in genres" :key="index">
          <q-checkbox v-model="genrecheck" :val="genre" :label="genre" dense color="teal" />
        </span>
      </div>

      <div style="margin: 20px"/>
      <div class="column items-center">
      <div class="col self-end">
        <q-btn @click="saves(movie, genrecheck)" round dense flat size="30px" >
          <q-icon size="md" name="save"/>
        </q-btn>
        <q-btn @click="deletes(movie.id)" round dense flat size="30px" v-if="(movie.id > 0)">
          <q-icon size="md" name="delete"/>
        </q-btn>
      </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { LocalStorage } from 'quasar'


export default defineComponent({
  name: 'MoviePage',
  data(){
      let movie = {genres:[]};
      let m = this.$route.query.movie;
      if (m) {
          try {
              movie = JSON.parse(m);
          } catch (e) {}
      }
      return{
          movie: movie,
          genres: ['Action', 'Drama', 'Animation', 'Sci-Fi'],
          genrecheck: movie.genres,
      }
  },
  methods: {
      saves(movie, genres) {
        if (movie.summary.length > 100) {
            alert("Summary can only contain maximum 100 characters")
            return
        }
        let movies = LocalStorage.getItem("movies");
        if (movies === null) {
            movies = [];
        }
        movie.genres = genres
        if (movie.id > 0) {
            let idx = movies.findIndex((m => m.id === movie.id))
            movies[idx] = movie
        } else {
            movie.id = movies[movies.length-1].id+1;
            movies.push(movie);
        }

        LocalStorage.set("movies", movies);

        this.$router.push({name:'index'});
    },
    deletes(id) {
        let movies = LocalStorage.getItem("movies");
        if (movies === null) {
            movies = [];
        }
        movies = movies.filter((movie => movie.id !== id));
        LocalStorage.set("movies", movies);

        this.$router.push({name:'index'});
    }
  }
})
</script>
