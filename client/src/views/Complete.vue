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
            @click.native="example()"
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
// @ts-nocheck
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions.vue';
import ForwardButton from '../components/SharedComponents/ForwardButton.vue';
import BackwardButton from '../components/SharedComponents/BackwardButton.vue';
import GenericButton from '../components/SharedComponents/GenericButton.vue';
import InputField from '../components/SharedComponents/InputField.vue';
import Dropdown from '../components/SharedComponents/Dropdown.vue';
import AddButton from '../components/SharedComponents/AddButton.vue';

import Requester from '../../Requester';

import { mapGetters } from 'vuex';

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
  computed: mapGetters(['basicInfo', 'resources', 'operations', 'fields']),
  methods: {
    buildMetaParameters(): {} {
      const { name, auth, color, baseURL } = this.basicInfo;
      return {
        serviceName: name,
        auth,
        nodeColor: color,
        apiURL: baseURL
      };
    },
    buildMainParameters(): {} {
      let mainParameters = {};

      const mapFieldTypes = {
        'String': 'string',
        'Options': 'options',
        'Multioptions': 'multiOptions',
        'Boolean': 'boolean',
        'Number': 'number',
        'Collection': 'collection',
        'Fixed Collection': 'fixedCollection'
      };

      console.log(mapFieldTypes['String']);

      this.resources.forEach(resource => {
        mainParameters[resource.text] = [];
      });

      this.operations.forEach(operation => {
        mainParameters[operation.resource].push({
          name: operation.name,
          description: operation.description,
          endpoint: operation.endpoint,
          requestMethod: operation.requestMethod,
          fields: []
        })
      });

      this.fields.forEach(field => {
        const fieldObj = {
          name: field.name,
          description: field.description,
          type: mapFieldTypes[field.type],
          default: field.default,
          options: []
        };

        if(field.options.length === 0 || field.options[0].name === "") {
          delete fieldObj.options;
        } else {
          field.options.forEach(option => {
            fieldObj.options.push({
              name: option.name,
              description: option.description
            });
          });
        }

        field.resourceOperation.forEach(resourceOp => {
          const [ operation, resource ] = resourceOp.value.split(" : ");
          const operationToUpdate = mainParameters[resource].findIndex(op => op.name === operation);   
          mainParameters[resource][operationToUpdate].fields.push(fieldObj);
        });
      });

      return mainParameters;
    },
    async example() {
      const requester = new Requester();
      const paramsBundle = {
        metaParameters: this.buildMetaParameters(),
        mainParameters: this.buildMainParameters(),
        nodeGenerationType: "Simple",
      };

      console.log(paramsBundle);

      const result = await requester.request(
        "nodegen-channel",
        paramsBundle
      );
      console.log(result);
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

