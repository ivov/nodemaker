<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-bind:msg="name" />
    <button v-on:click="name2">test 1</button>
    <button v-on:click="sample">test 2</button>
    <h3>{{name3}}</h3>
  </div>
</template>

<script lang="ts">
/* eslint no-unused-vars: "warn" */
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';

import Requester from '../../Requester';

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

@Component({
  components: {
    HelloWorld,
  },
  data: () => {
    return {
      name: "erin123",
      name3: "erin456"
    }
  },
  methods: {
    name2: async () => {
      const requester = new Requester();
      console.log(requester);

      const response = await requester.request(
          "example-channel"
        );
      
      console.log(response);
    },
    sample: async () => {
      const response = await resolveAfter2Seconds();

      console.log(response);
    }
  }
})

export default class App extends Vue {}
</script>
