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
          :value=basicInfo.name
          v-model=basicInfo.name
        />
        <Dropdown 
          class="input"
          label="Auth" 
          v-bind:options="['No Auth', 'Access Token', 'OAuth1', 'OAuth2']" 
          :option=basicInfo.auth
          v-model=basicInfo.auth
        />
        <InputField 
          class="input"
          label="Color"
          placeholder="#ffffff" 
          :value=basicInfo.color
          v-model=basicInfo.color
        />
        <InputField 
          class="input"
          label="API Base URL"
          placeholder="http://hn.algolia.com/api" 
          :value=basicInfo.baseURL
          v-model=basicInfo.baseURL
        />
      </div>
      <div class="centerButton">
        <router-link to="/resources">
          <ForwardButton 
            text="Select Your Resources" 
            @click.native="submitBasicInfo(basicInfo)"
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
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions.vue';
import ForwardButton from '../components/SharedComponents/ForwardButton.vue';
import InputField from '../components/SharedComponents/InputField.vue';
import Dropdown from '../components/SharedComponents/Dropdown.vue';

import { mapGetters, mapActions } from 'vuex';

@Component({
  name: 'Home',
  components: {
    Instructions,
    ForwardButton,
    InputField,
    Dropdown,
  },
  computed: mapGetters(['basicInfo']),
  methods: mapActions(['submitBasicInfo']),
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
