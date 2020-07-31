<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions 
        class="instructions"
        header="Welcome to the nodemaker."
        subtitle="This tool is designed to help developers create their own n8n nodes."
        instructions="To get started, enter in your node’s name, authorization method, color, and API base url."
      />
      <div class="inputContainer">
        <InputField 
          class="input"
          label="Name"
          placeholder="Hacker News" 
        />
        <Dropdown 
          class="input"
          label="Auth" 
          v-bind:options="['No Auth', 'Access Token', 'OAuth 1', 'OAuth 2']" 
        />
        <InputField 
          class="input"
          label="Color"
          placeholder="#ffffff" 
        />
        <InputField 
          class="input"
          label="API Base URL"
          placeholder="http://hn.algolia.com/api" 
        />
      </div>
      <div class="centerButton">
        <ForwardButton 
          @click.native="helloworld()" 
          text="Select Your Resources" 
        />
      </div>
      <!-- <AddButton text="Add this ext" /> -->
      <!-- <BackwardButton @click.native="helloworld()" text="Edit the previous selections" /> -->
      <!-- <GenericButton @click.native="helloworld()" text="Generate *.node.ts, GenericFunctions.ts, *.Description.ts (optional), and *.credentials.ts." /> -->
      <!-- <button @click="example()">call example</button> -->
      <!-- <h4>{{tester}}</h4> -->
    </div>
  </div>
</template>

<script lang="ts">
/* eslint no-unused-vars: "warn" */
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions';
import ForwardButton from '../components/SharedComponents/ForwardButton';
import BackwardButton from '../components/SharedComponents/BackwardButton';
import GenericButton from '../components/SharedComponents/GenericButton';
import InputField from '../components/SharedComponents/InputField';
import Dropdown from '../components/SharedComponents/Dropdown';
import AddButton from '../components/SharedComponents/AddButton';
import Requester from '../../Requester';

@Component({
  name: 'Home',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    GenericButton,
    InputField,
    Dropdown,
    AddButton
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
    },
    helloworld() {
      console.log("clicked");
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
#optionsBox {
    background-color: white;
    width: 35rem;
    margin: 2rem;
    padding: 2rem;
    border-radius: 1rem;
}

.instructions {
  margin-bottom: 2rem;
}

.input {
  margin: 1.5rem 0rem;
}

.inputContainer {
  width: 21rem;
}

.centerButton {
  margin-top: 3rem;
  text-align: center;
}
</style>
