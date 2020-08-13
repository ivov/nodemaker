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
              class="my-15"
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

<script>
import Instructions from '../../components/Instructions.vue';
import BackwardButton from '../../components/BackwardButton.vue';
import GenericButton from '../../components/GenericButton.vue';
import Checkbox from '../../components/Checkbox.vue';

import RoutesMixin from '../../mixins/routes-mixin';
import ParamsBuilderMixin from '../../mixins/params-build-mixin';

import { mapGetters } from 'vuex';

export default {
  name: 'Fields',
  components: {
    Instructions,
    BackwardButton,
    GenericButton,
    Checkbox,
  },
  mixins: [RoutesMixin, ParamsBuilderMixin],
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
    async submit(){
      const metaParameters = this.buildMetaParameters(this.basicInfo);
      const mainParameters = this.buildMainParameters(this.resources, this.operations, this.fields);

      if(this.empty) {
        await this.emptyOutput();
      }
      if(this.basicNodeGen) {
        const paramsBundle = {
          metaParameters,
          mainParameters,
          nodeGenerationType: "Simple",
          nodeType: "Regular",
        };
        await this.simpleNode(paramsBundle);
      }
      if(this.complexNodeGen) {
        const paramsBundle = {
          metaParameters,
          mainParameters,
          nodeGenerationType: "Complex",
          nodeType: "Regular",
        };
        await this.simpleNode(paramsBundle);
      }
      if(this.packageGen) {
        await this.packageGenerator(metaParameters);
      }
      if(this.docs) {
        const paramsBundle = {
          metaParameters,
          mainParameters,
          docsParameters: this.buildDocsParameters(this.basicInfo, this.docsInfo)
        };
        await this.docsGen(paramsBundle);
      }
      if(this.placeNode) {
        await this.placeFunctional();
      }
      if(this.placeDocs) {
        await this.placeDocumentation();
      }
      alert("All done! Thank you for using the nodemaker.")
    },
  },
}
</script>

<style scoped>
.stacked {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>

