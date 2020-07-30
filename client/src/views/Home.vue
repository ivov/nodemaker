<template>
  <div class="home">
    <button @click="example()">call example</button>
    <h4>{{tester}}</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Requester from '../../Requester';


@Component({
  data: () => {
    return {
      name: "erin123",
      tester: ""
    }
  },
  computed: {
    example() {
      const requester = new Requester();
      const response = requester.request("example-channel");
      response.then((res:string) => {
        console.log(res);
        this.tester = res;
      });
    }
  }
})

export default class App extends Vue {}
</script>n