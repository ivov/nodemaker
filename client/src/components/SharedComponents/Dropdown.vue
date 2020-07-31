<template>
  <div class="input">
      <label>{{label}}: </label>
      <select>
            <option v-bind:key="option" v-for="option in options" v-bind:value="option">
                {{ option }}
            </option>
      </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component({
  name: 'Dropdown',
  props: ["label", "options"]
})

export default class App extends Vue {}
</script>

<style scoped>
.input {
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
}

select {
    background: #F4F4F4;
    border: 1px solid #555555;
    box-sizing: border-box;
    border-radius: 15px;
    padding: .3rem;
    padding-right: -1rem;
    width: 13rem;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #555555;
}
</style>
