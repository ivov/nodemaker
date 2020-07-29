<template>
  <div class="home">
    <button @click="example()">call example</button>
    <Instructions 
      header="Welcome to the nodemaker."
      subtitle="This tool is designed to help developers create their own n8n nodes."
      instructions="To get started, enter in your node’s name, authorization method, color, and API base url."
     />
    <h4>{{tester}}</h4>
  </div>
</template>

<script lang="ts">
/* eslint no-unused-vars: "warn" */
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions';

import Requester from '../../Requester';

@Component({
  name: 'Home',
  components: {
    Instructions
  },
  data: function() {
    return {
      name: "erin123",
      tester: ""
    }
  },
  methods: {
    example() {
      const requester = new Requester();
      const response = requester.request("example-channel");
      response.then((res:string) => {
        console.log(res);
        this.tester = res;
      });
    }
  },
  computed: {
    name2: function() {
      const requester = new Requester();
      const response = requester.request("example-channel");
      response.then((res) => {
        console.log(res);
        return res;
      });
    },
    date: function() {
      return Date.now();
    }
  }
})

export default class App extends Vue {}
</script>

<style scoped>
 .home {
   bottom: 10px;
 }
</style>
