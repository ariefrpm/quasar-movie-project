<template>
  <q-page class="q-pa-lg">
    <div class="q-pa-md example-column-horizontal-alignment">

      <div class="column" >
        <q-input @change="search" @keyup="search" v-model="searchQuery" label="Search by title" />
      </div>
      <div style="margin: 20px"/>
      <div class="column">
        <q-card class="my-card" style="margin-top: 20px"
                v-for="(movie, index) in movies"
                :key="index" @click="update(movie)">
          <q-card-section>
            <div class="text-h6">{{movie.title}}</div>
            <div class="text-subtitle2">{{movie.director}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{movie.summary}}
          </q-card-section>
          <q-card-section>
            <q-chip v-for="(genre, index) in movie.genres"
                    :key="index" color="teal" text-color="white">
              {{genre}}
            </q-chip>
          </q-card-section>
        </q-card>
      </div>

      <div class="column items-center">
        <div class="col self-end">
          <q-btn @click="$router.push({name:'movie'})" round dense flat size="30px" >
            <q-icon size="md" name="add"/>
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
  name: 'IndexPage',
  setup(){
      let movies = LocalStorage.getItem("movies");
      if (movies === null) {
          movies = [
              {
                  id: 1,
                  title: "Power Ranger",
                  director: "Dean Israelite",
                  summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                  genres: ["Action", "Sci-Fi"]
              }
          ];
      }
      LocalStorage.set("movies", movies);
  },
  data(){
      let movies = LocalStorage.getItem("movies");

      return{
          movies: movies,
          searchQuery: "",
      }
  },
  methods: {
      search() {
          console.log(this.searchQuery);
          if(this.searchQuery && this.searchQuery.length > 0) {
              this.movies = LocalStorage.getItem("movies").filter(i => {
                  const val = this.searchQuery.toLowerCase();
                  const title = i.title && i.title.toLowerCase();
                  return !!(val && title.indexOf(val) !== -1);
              })
          } else {
              this.movies = LocalStorage.getItem("movies");
          }
      },
      update(movie) {
          this.$router.push({name:'movie', query:{movie:JSON.stringify(movie)}})
      }
  },
})

</script>
