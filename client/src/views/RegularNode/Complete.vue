<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Thank you for using the nodemaker."
        instructions="Choose your file configurations below. The nodemaker will put the generated file into the output folder."
      />
      <div class="stacked">
          <Checkbox 
            label="Generate *.node.ts, GenericFunctions.ts, and *.credentials.ts." 
            idInfo="box1"
            :value=basicNodeGen
            v-model=basicNodeGen
          />
          <Checkbox 
            label="Generate *.node.ts, GenericFunctions.ts, *.Description.ts, and *.credentials.ts." 
            idInfo="box2"
            :value=complexNodeGen
            v-model=complexNodeGen
          />
          <Checkbox 
            label="Generate an updated package.json file." 
            idInfo="box3"
            :value=packageGen
            v-model=packageGen
          />
          <Checkbox 
            label="Empty the output directory before generation" 
            idInfo="box4"
            :value=empty
            v-model=empty
          />
          <Checkbox 
            v-if="documentation"
            label="Generate a node functionality doc file and a node credential doc file in markdown (if you filled out the optional documentation parameters)." 
            idInfo="box5"
            :value=docs
            v-model=docs
          />
          <Checkbox 
            label="Place the generated node files into the proper n8n folders (must have file structure specified on nodemaker docs)." 
            idInfo="box6"
            :value=placeNode
            v-model=placeNode
          />
          <Checkbox 
            v-if="documentation"
            label="Place the generated documentation files into the proper n8n-docs folders (must have file structure specified on nodemaker docs)." 
            idInfo="box7"
            :value=placeDocs
            v-model=placeDocs
          />
          <div class="centerButton">
            <GenericButton 
              class="input"
              text="Submit" 
              @click.native="submit()"
            />
          </div>
      </div>
    </div>
    <div id="previewBox">
      <Instructions
        class="instructions"
        header="A preview of your node will show up here as you create." 
      />
      <div class="centerButton">
        <router-link to="/regular/fields">
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
import Checkbox from '../../components/SharedComponents/Checkbox.vue';
import AddButton from '../../components/SharedComponents/AddButton.vue';

import Requester from '../../../Requester';

import { mapGetters } from 'vuex';

const requester = new Requester();

@Component({
  name: 'Fields',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    GenericButton,
    InputField,
    Checkbox,
    AddButton
  },
  data: () => {
    return {
      basicNodeGen: false,
      complexNodeGen: false,
      packageGen: false,
      empty: false,
      docs: false,
      placeNode: false,
      placeDocs: false
    }
  },
  computed: mapGetters(['basicInfo', 'documentation', 'docsInfo', 'resources', 'operations', 'fields']),
  methods: {
    async submit(): {} {
      if(this.empty) {
        await this.emptyOutput();
      }
      if(this.basicNodeGen) {
        await this.simpleNode();
      }
      if(this.complexNodeGen) {
        await this.complexNode();
      }
      if(this.packageGen) {
        await this.packageGenerator();
      }
      if(this.docs) {
        await this.docsGen();
      }
      if(this.placeNode) {
        await this.placeFunctional();
      }
      if(this.placeDocs) {
        await this.placeDocumentation();
      }
      alert("All done! Thank you for using the nodemaker.")
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
            name: field.name,
            description: field.description,
            type: mapFieldTypes[field.type],
            default: defaultValue,
            options: []
          };

          if(field.name === "Additional Fields") {
            delete fieldObj.description;
          }
          if(field.options === undefined || field.options.length === 0 || field.options[0].name === "") {
            delete fieldObj.options;
          } else if(field.type === "Collection" || field.type === "Fixed Collection"){
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

          field.resourceOperation.forEach(resourceOp => {
            const [ operation, resource ] = resourceOp.value.split(" : ");
            const operationToUpdate = mainParameters[resource].findIndex(op => op.name === operation);   
            mainParameters[resource][operationToUpdate].fields.push(fieldObj);
          });
        });
      }

      return mainParameters;
    },
    buildDocsParameters(): {} {
        const { name } = this.basicInfo;
        const { serviceURL, introDescription, exampleUsage, workflowNumber } = this.docsInfo;

        return {
            serviceName: name,
            serviceURL,
            introDescription,
            exampleUsage,
            workflowNumber
        };
    },
    async simpleNode() {
      const paramsBundle = {
        metaParameters: this.buildMetaParameters(),
        mainParameters: this.buildMainParameters(),
        nodeGenerationType: "Simple",
        nodeType: "Regular",
      };

      console.log(paramsBundle);

      const result = await requester.request(
        "nodegen-channel",
        paramsBundle
      );
      console.log(result);
    },
    async complexNode() {
      
      const paramsBundle = {
        metaParameters: this.buildMetaParameters(),
        mainParameters: this.buildMainParameters(),
        nodeGenerationType: "Complex",
        nodeType: "Regular",
      };

      console.log(paramsBundle);

      const result = await requester.request(
        "nodegen-channel",
        paramsBundle
      );
      console.log(result);
    },
    async packageGenerator() {
      
      const metaParameters = this.buildMetaParameters();

      console.log(metaParameters);

      const result = await requester.request(
        "packgen-channel",
        metaParameters
      );
      console.log(result);
    },
    async emptyOutput() {
      const result = await requester.request(
        "empty-channel"
      );
      console.log(result);
    },
    async docsGen() {
      
      const paramsBundle = {
        metaParameters: this.buildMetaParameters(),
        mainParameters: this.buildMainParameters(),
        docsParameters: this.buildDocsParameters()
      };

      console.log(paramsBundle);

      const result = await requester.request(
        "docsgen-channel",
        paramsBundle
      );
      console.log(result);
    },
    async placeFunctional() {
      
      const placementResult = await requester.request<PlacementChannelArgument>(
        "placement-channel",
        { filesToPlace: "functionality" }
      );
      console.log(placementResult);
    },
    async placeDocumentation() {
      
      const placementResult = await requester.request<PlacementChannelArgument>(
        "placement-channel",
        { filesToPlace: "documentation" }
      );
      console.log(placementResult);
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
    justify-content: space-between;
}
</style>

