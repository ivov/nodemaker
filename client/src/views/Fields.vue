<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Add your fields."
        subtitle="If an operation has an associated set of fields, add those in here."
        instructions="Choose the field type, enter in the nessecary additional infomation, and choose the operations to associate them with."
      />
      <div class="inputContainer" v-bind:key="field.key" v-for="field in fields">
        <div v-bind:key="resource.key" v-for="resource in field.resources">
          <Dropdown 
            class="input"
            label="Resource" 
            :add=resource.add
            :cancel=resource.cancel
            v-on:plus="addResource(field.key)"
            v-on:del="removeResource(field.key, resource.key)"
            v-bind:options="['No Auth', 'Access Token', 'OAuth 1', 'OAuth 2']" 
            :value=resource.value
            v-model=resource.value
          />
        </div>
        <div v-bind:key="operation.key" v-for="operation in field.operations">
          <Dropdown 
            class="input"
            label="Operation" 
            :add=operation.add
            :cancel=operation.cancel
            v-on:plus="addOperation(field.key)"
            v-on:del="removeOperation(field.key, operation.key)"
            v-bind:options="['No Auth', 'Access Token', 'OAuth 1', 'OAuth 2']" 
            :value=operation.value
            v-model=operation.value
          />
        </div>
        <Dropdown 
          class="input"
          label="Type" 
          v-bind:options="['String', 'Options', 'Multioptions', 'Boolean', 'Number', 'Collection', 'Fixed Collection']" 
          :value=field.type
          v-model=field.type
        />
        <InputField 
          class="input"
          label="Field Name"
          placeholder="Article id" 
          :value=field.name
          v-model=field.name
        />
        <InputField 
          class="input"
          label="Description"
          placeholder="The id of the article to get." 
          :value=field.description
          v-model=field.description
        />
        <InputField 
          class="input"
          label="Default"
          placeholder="123" 
          :value=field.default
          v-model=field.default
        />
        <hr>
      </div>
      <div class="centerButton">
          <AddButton 
            text="Add another field"
            @click.native="addField()" 
          />
      </div>
      <div class="centerButton finalButton">
        <router-link to="/complete">
            <ForwardButton 
            text="Generate your node" 
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
        <router-link to="/operations">
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
  name: 'Fields',
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
      fields: [
        {
          key: 0,
          resources: [
            {
              key: 0,
              value: "",
              add: true,
              cancel: false
            }
          ],
          operations: [
            {
              key: 0,
              value: "",
              add: true,
              cancel: false
            }
          ],
          type: "",
          name: "",
          description: "",
          default: ""
        }
      ]
    }
  },
  methods: {
    addField() {
      this.fields.push({
          key: this.fields.length,
          resources: [
            {
              key: 0,
              value: "",
              add: true,
              cancel: false
            }
          ],
          operations: [
            {
              key: 0,
              value: "",
              add: true,
              cancel: false
            }
          ],
          type: "",
          name: "",
          description: "",
          default: ""
        });
    },
    addResource(key) {
      this.fields[key].resources.push({
        key: this.fields[key].resources.length,
        text: "",
        add: false,
        cancel: true
      });
    },
    addOperation(key) {
        this.fields[key].operations.push({
            key: this.fields[key].operations.length,
            resource: "",
            name: "",
            description: "",
            endpoint: "",
            requestMethod: "",
            add: false,
            cancel: true
        });
    },
    removeResource(fieldKey, resourceKey) {
      this.fields[fieldKey].resources = this.fields[fieldKey].resources.filter(resource => resource.key !== resourceKey);
    },
    removeOperation(fieldKey, operationKey) {
      this.fields[fieldKey].operations = this.fields[fieldKey].operations.filter(operation => operation.key !== operationKey);
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

