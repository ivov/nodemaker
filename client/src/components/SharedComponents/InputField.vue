<template>
  <div class="input">
      <label>{{label}}: </label>
      <input type="text" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
/* eslint no-unused-vars: "warn" */
import { Component, Vue } from 'vue-property-decorator';


@Component({
  name: 'InputField',
  props: ["label", "placeholder"]
})

export default class App extends Vue {}
</script>

<style scoped>
.input {
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
}

input {
    background: #F4F4F4;
    border: 1px solid #555555;
    box-sizing: border-box;
    border-radius: 15px;
    padding: .35rem;
    padding-left: .75rem;
    width: 13rem;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #555555;
}
</style>
