<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Add your operations."
        subtitle="Each operations is connected to a resource"
        instructions="Enter in each operations resource, name, description, endpoint, and request method."
      />
      <div class="inputContainer" v-bind:key="operation.key" v-for="operation in operations">
        <Dropdown 
          class="input"
          label="Resource" 
          v-bind:options="['No Auth', 'Access Token', 'OAuth 1', 'OAuth 2']" 
          :value=operation.resource
          v-model=operation.resource
        />
        <InputField 
          class="input"
          label="Operation Name"
          placeholder="Get" 
          :value=operation.name
          v-model=operation.name
        />
        <InputField 
          class="input"
          label="Description"
          placeholder="Get a Hacker News article." 
          :value=operation.description
          v-model=operation.description
        />
        <InputField 
          class="input"
          label="Endpoint"
          placeholder="/article/{id}" 
          :value=operation.endpoint
          v-model=operation.endpoint
        />
        <Dropdown 
          class="input"
          label="Request Method" 
          v-bind:options="['GET', 'POST', 'PATCH', 'PUT', 'DELETE']" 
          :value=operation.requestMethod
          v-model=operation.requestMethod
        />
        <hr>
      </div>
      <div class="centerButton">
          <AddButton 
            text="Add another operation" 
            @click.native="addOperation()" 
            />
      </div>
      <div class="centerButton finalButton">
        <router-link to="/fields">
            <ForwardButton 
                text="Select Your Fields" 
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
        <router-link to="/resources">
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
import Dropdown from '../components/SharedComponents/Dropdown';
import AddButton from '../components/SharedComponents/AddButton';

@Component({
  name: 'Operations',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    InputField,
    Dropdown,
    AddButton
  },
  data: () => {
      return {
          operations: [
            {
                key: 0,
                resource: "",
                name: "",
                description: "",
                endpoint: "",
                requestMethod: ""
            }
          ]
      }
  },
  methods: {
    addOperation() {
        this.operations.push({
            key: this.operations.length,
            resource: "",
            name: "",
            description: "",
            endpoint: "",
            requestMethod: ""
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
  width: 25rem;
}

.centerButton {
  text-align: center;
}

.finalButton {
   margin-top: 3rem;
}
</style>

