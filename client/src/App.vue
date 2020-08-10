<template>
  <div id="app">
    <div id="nav">
      <Header />
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/SharedComponents/Header';

@Component({
  name: 'App',
  components: {
    Header
  }
})

export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #F4F4F4;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555555;
  margin: 0;
  padding: 0;
}
</style>
