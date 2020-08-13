<template>
  <div id="app">
    <div id="nav">
      <Header />
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

.home {
  display: flex;
  justify-content: space-evenly;
  align-content: center;
}

#optionsBox, #previewBox {
    background-color: white;
    width: 35rem;
    margin: 2rem;
    padding: 2rem;
    border-radius: 1rem;
}

.box {
  display: flex;
  align-items: center;
}

.centerButton {
  text-align: center;
}

.button {
    display: flex;
    align-content: center;
    justify-content: space-evenly;
}

.icon {
    line-height: normal;
}

.width25 {
  width: 25rem;
}

.width30 {
  width: 30rem;
}

.my-15 {
  margin: 1.5rem 0rem;
}

.my-1 {
  margin: 1rem 0rem;
}

.ml-1 {
  margin-left: 1rem;
}

.ml-3 {
  margin-left: 3rem;
}

.ml-4 {
  margin-left: 4rem;
}

.mt-3 {
  margin-top: 3rem;
}
</style>
