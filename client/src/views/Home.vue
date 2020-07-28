<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-bind:msg="name" />
    <h2>{{name2}}</h2>
  </div>
</template>

<script lang="ts">
/* eslint no-unused-vars: "warn" */
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';

import Requester from '../../Requester';

@Component({
  components: {
    HelloWorld,
  },
  data: () => {
    return {
      name: "erin123"
    }
  },
  computed: {
    name2: async () => {
      const requester = new Requester();
      const response = await requester.request<string>(
        "prototype-channel"
      );
      console.log(response);
      return "hello world";
    }
  }
})
export default class App extends Vue {}
</script>
