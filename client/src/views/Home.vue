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
          :value=name
          v-model=name
        />
        <Dropdown 
          class="input"
          label="Auth" 
          v-bind:options="['No Auth', 'Access Token', 'OAuth 1', 'OAuth 2']" 
          :value=auth
          v-model=auth
        />
        <InputField 
          class="input"
          label="Color"
          placeholder="#ffffff" 
          :value=color
          v-model=color
        />
        <InputField 
          class="input"
          label="API Base URL"
          placeholder="http://hn.algolia.com/api" 
          :value=baseURL
          v-model=baseURL
        />
      </div>
      <div class="centerButton">
        <router-link to="/resources">
          <ForwardButton 
            text="Select Your Resources" 
          />
        </router-link>
      </div>
    </div>
    <div id="previewBox">
      <Instructions
        class="instructions"
        header="A preview of your node will show up here as you create." 
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint no-unused-vars: "warn" */
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions';
import ForwardButton from '../components/SharedComponents/ForwardButton';
import InputField from '../components/SharedComponents/InputField';
import Dropdown from '../components/SharedComponents/Dropdown';

import Requester from '../../Requester';

@Component({
  name: 'Home',
  components: {
    Instructions,
    ForwardButton,
    InputField,
    Dropdown,
  },
  data: function() {
    return {
      name: "",
      auth: "",
      color: "",
      baseURL: "",
      tester: ""
    }
  },
  methods: {
    sampleCall() {
      const requester = new Requester();
      const response = requester.request("example-channel");
      response.then((res:string) => {
        console.log(res);
        this.tester = res;
      });
    },
  },
  computed: {
    requester: function() {
      const requester = new Requester();
      const response = requester.request("example-channel");
      response.then((res) => {
        console.log(res);
        return res;
      });
    },
  },
})

export default class App extends Vue {}
</script>

<style scoped>
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
