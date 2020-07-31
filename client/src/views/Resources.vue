<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions 
        class="instructions"
        header="Enter in the resources you are operating on."
        subtitle="These can be users, articles, files, emails, etc."
        instructions="Enter in each resource name."
      />
      <div class="inputContainer" v-bind:key="resource.key" v-for="resource in resources">
        <InputField 
          class="input"
          label="Resource"
          placeholder="Article"
          :value=resource.text
          v-model=resource.text
        />
      </div>
      <div class="centerButton">
          <AddButton @click.native="addResource()" text="Add another resource" />
      </div>
      <div class="centerButton finalButton">
        <router-link to="/operations">
          <ForwardButton 
            text="Select Your Operations" 
          />
         </router-link>
      </div>
    </div>
    <div id="previewBox">
      <Instructions
        class="instructions"
        header="A preview of your node will show up here as you create." 
      />
      <div class="centerButton">
        <router-link to="/">
          <BackwardButton 
            text="Edit the previous selections" 
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions';
import ForwardButton from '../components/SharedComponents/ForwardButton';
import BackwardButton from '../components/SharedComponents/BackwardButton';
import InputField from '../components/SharedComponents/InputField';
import AddButton from '../components/SharedComponents/AddButton';

@Component({
  name: 'Resources',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    InputField,
    AddButton
  },
  data: () => {
    return {
      resources: [ 
        {
          key: 0,
          text: ""
        }
      ]
    }
  },
  methods: {
    addResource() {
      this.resources.push({
        key: this.resources.length,
        text: ""
      });
    }
  }
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
  text-align: center;
}

.finalButton {
   margin-top: 3rem;
}
</style>

