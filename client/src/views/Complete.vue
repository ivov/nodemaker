<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Thank you for using the nodemaker."
        instructions="Choose your file configurations below. The nodemaker will output your code to edit and then place into your folders."
      />
      <div class="centerButton stacked">
          <GenericButton 
            class="input"
            text="Generate *.node.ts, GenericFunctions.ts, *Description.ts (optional), and *.credentials.ts." 
          />
          <GenericButton 
            class="input"
            text="Generate a package.json updated with node path and credential path insertions." 
          />
          <GenericButton 
            class="input"
            text="Generate a node functionality doc file and a node credential doc file in markdown." 
          />
          <GenericButton 
            class="input"
            text="Generate five images as icon candidates." 
          />
      </div>
    </div>
    <div id="previewBox">
      <Instructions
        class="instructions"
        header="A preview of your node will show up here as you create." 
      />
      <div class="centerButton">
        <router-link to="/fields">
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
import GenericButton from '../components/SharedComponents/GenericButton';
import InputField from '../components/SharedComponents/InputField';
import Dropdown from '../components/SharedComponents/Dropdown';
import AddButton from '../components/SharedComponents/AddButton';

@Component({
  name: 'Fields',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    GenericButton,
    InputField,
    Dropdown,
    AddButton
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
  margin: .75rem 0rem;
}

.inputContainer {
  width: 25rem;
}

.centerButton {
  text-align: center;
}

.finalButton {
   margin-top: 3rem;
}

.stacked {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
</style>

