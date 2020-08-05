<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Add your operations."
        subtitle="Each operations is connected to a resource"
        instructions="Enter in each operations resource, name, description, endpoint, and request method."
      />
      <div class="box" v-bind:key="operation.key" v-for="operation in operations">
        <div class="inputContainer">
          <Dropdown 
            class="input"
            label="Resource" 
            v-bind:options="resourceNames" 
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
        <SmallButton 
          class="delete" 
          v-if="operation.cancel"
          @click.native="removeOperation(operation.key)" 
          :cancel=operation.cancel />
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
                @click.native="submitOperations(operations)"
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
            @click.native="submitOperations(operations)"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions.vue';
import ForwardButton from '../components/SharedComponents/ForwardButton.vue';
import BackwardButton from '../components/SharedComponents/BackwardButton.vue';
import InputField from '../components/SharedComponents/InputField.vue';
import Dropdown from '../components/SharedComponents/Dropdown.vue';
import AddButton from '../components/SharedComponents/AddButton.vue';
import SmallButton from '../components/SharedComponents/SmallButton.vue';

import { mapGetters, mapActions} from 'vuex';

@Component({
  name: 'Operations',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    InputField,
    Dropdown,
    AddButton,
    SmallButton
  },
  computed: mapGetters(['resourceNames', 'operations']),
  methods: {
    ...mapActions(['submitOperations']),
    addOperation() {
        this.operations.push({
            key: this.operations.length,
            resource: "",
            name: "",
            description: "",
            endpoint: "",
            requestMethod: "",
            cancel: true
        });

        this.$store.commit('submitOperations', this.operations);
    },
    removeOperation(operationKey) {
      this.$store.commit('submitOperations', this.operations.filter(operation => operation.key !== operationKey));
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

.box {
  display: flex;
  align-items: center;
}

.delete {
  margin-left: 3rem;
}

.centerButton {
  text-align: center;
}

.finalButton {
   margin-top: 3rem;
}
</style>

