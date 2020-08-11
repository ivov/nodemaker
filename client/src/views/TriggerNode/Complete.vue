<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Thank you for using the nodemaker."
        instructions="Choose your file configurations below. The nodemaker will put the generated file into the output folder."
      />
      <div class="centerButton stacked">
          <GenericButton 
            class="input"
            text="Generate *.node.ts, GenericFunctions.ts, and *.credentials.ts." 
            @click.native="simpleNode()"
          />
          <GenericButton 
            class="input"
            text="Place the generated node files into the proper n8n folders (must have file structure specified on nodemaker docs)." 
            @click.native="placeFunctional()"
          />
      </div>
    </div>
    <div id="previewBox">
      <Instructions
        class="instructions"
        header="A preview of your node will show up here as you create." 
      />
      <div class="centerButton">
        <router-link to="/trigger/fields">
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

import Instructions from '../../components/SharedComponents/Instructions.vue';
import ForwardButton from '../../components/SharedComponents/ForwardButton.vue';
import BackwardButton from '../../components/SharedComponents/BackwardButton.vue';
import GenericButton from '../../components/SharedComponents/GenericButton.vue';
import InputField from '../../components/SharedComponents/InputField.vue';
import Dropdown from '../../components/SharedComponents/Dropdown.vue';
import AddButton from '../../components/SharedComponents/AddButton.vue';

import Requester from '../../../Requester';

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
  computed: mapGetters(['basicInfo', 'properties', 'fields']),
  methods: {
    toCamelCase(str) {
      return str
          .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
          .replace(/\s/g, '')
          .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    },
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
      let mainParameters = {
        webhookEndpoint: this.basicInfo.webhookEndpoint,
        webhookProperties: []
      };

      const mapFieldTypes = {
        'String': 'string',
        'Options': 'options',
        'Multioptions': 'multiOptions',
        'Boolean': 'boolean',
        'Number': 'number',
        'Collection': 'collection',
        'Fixed Collection': 'fixedCollection'
      };

      this.properties.forEach(property => {
        const { displayName, required, description, type } = property;

        let defaultValue = property.default;
        console.log(defaultValue);
        if(type === "Number") {
          defaultValue = Number(defaultValue);
        } else if(type === "Boolean") {
          defaultValue = Boolean(defaultValue);
        }

        const propertyObj = {
          displayName,
          name: this.toCamelCase(displayName),
          required,
          description,
          type: mapFieldTypes[type],
          default: defaultValue,
          options: []
        };

        if(["Options", "Multioptions"].includes(type)) {
            property.options.forEach(option => {
              propertyObj.options.push({
                name: option.name,
                value: this.toCamelCase(option.name),
                description: option.description,
                fields: []
              });
            });
        } else {
          delete propertyObj.options;
        }

        mainParameters.webhookProperties.push(propertyObj);
      });

      if(this.fields[0].name !== "") {
        this.fields.forEach(field => {
          // fix the default for first-layer options
          let defaultValue = field.default;
          if(field.type === "Number") {
            defaultValue = Number(defaultValue);
          } else if(field.type === "Boolean") {
            defaultValue = Boolean(defaultValue);
          } else if(["Options", "Multioptions", "Collection", "Fixed Collection"].includes(field.type)) {
            defaultValue = JSON.parse(defaultValue);
          }

          const fieldObj = {
            displayName: field.name,
            name: this.toCamelCase(field.name),
            description: field.description,
            type: mapFieldTypes[field.type],
            default: defaultValue,
            required: true,
            options: []
          };

          if(field.name === "Additional Fields") {
            delete fieldObj.description;
          }
          if(field.options === undefined || field.options.length === 0 || field.options[0].name === "") {
            delete fieldObj.options;
          } else if(field.type === "Collection" || field.type === "Fixed Collection") {
            field.options.forEach(option => {
              // fix the default for internal options
              let defaultValue = option.default;
              if(option.type === "Number") {
                defaultValue = Number(defaultValue);
              } else if(option.type === "Boolean") {
                defaultValue = Boolean(defaultValue);
              } else if(["Options", "Multioptions", "Collection", "Fixed Collection"].includes(option.type)) {
                defaultValue = JSON.parse(defaultValue);
              }

              //handle internal options, which will never be a collection
              let innerOptions = [];
              if(option.options !== undefined && option.options !== null) {
                option.options.forEach(innerOption => {
                  innerOptions.push({
                    name: innerOption.name,
                    description: innerOption.description
                  })
                });
              }

              fieldObj.options.push({
                name: option.name,
                description: option.description,
                type: mapFieldTypes[option.type],
                default: defaultValue,
                options: innerOptions
              });

              if(fieldObj.options[fieldObj.options.length - 1].options.length === 0) {
                delete fieldObj.options[fieldObj.options.length - 1].options;
              }
            });
          } else {
            field.options.forEach(option => {
              fieldObj.options.push({
                name: option.name,
                description: option.description
              });
            });
          }

          console.log("here")

          field.resourceOperation.forEach(resourceOp => {
            const [ property, option ] = resourceOp.value.split(" : ");
            const propertyIndex = mainParameters.webhookProperties.findIndex(prop => prop.displayName === property);
            const optionIndex = mainParameters.webhookProperties[propertyIndex].options.findIndex(op => op.name === option);
            mainParameters.webhookProperties[propertyIndex].options[optionIndex].fields.push(fieldObj);
          });
        });
      }

      return mainParameters;
    },
    async simpleNode() {
      const requester = new Requester();
      const paramsBundle = {
        metaParameters: this.buildMetaParameters(),
        mainParameters: this.buildMainParameters(),
        nodeGenerationType: "Simple",
        nodeType: "Trigger",
      };

      console.log(paramsBundle);

      const result = await requester.request(
        "nodegen-channel",
        paramsBundle
      );
      console.log(result);
      alert("Thank you for using the nodemaker! Check your output folder.")
    },
    async placeFunctional() {
      const requester = new Requester();
      const placementResult = await requester.request<PlacementChannelArgument>(
        "placement-channel",
        { filesToPlace: "functionality" }
      );
      console.log(placementResult);

      alert(`Thank you for using the nodemaker! Check the n8n/packages/nodes-base/nodes/${this.basicInfo.name.replace(/\s/g, '')} folder for your code.`);
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

