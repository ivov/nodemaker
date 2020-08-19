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
            label="Generate an updated package.json file." 
            idInfo="box2"
            :value=packageGen
            v-model=packageGen
          />
          <Checkbox 
            label="Empty the output directory before generation" 
            idInfo="box3"
            :value=empty
            v-model=empty
          />
          <Checkbox 
            label="Place the generated node files into the proper n8n folders (must have file structure specified on nodemaker docs)." 
            idInfo="box4"
            :value=placeNode
            v-model=placeNode
          />
          <div class="centerButton">
            <GenericButton 
              class="my-1"
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
        <router-link to="/trigger/fields">
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
  computed: mapGetters(['basicInfo', 'properties', 'fields']),
  mixins: [RoutesMixin, ParamsBuilderMixin],
  data: () => {
    return {
      basicNodeGen: false,
      packageGen: false,
      empty: false,
      placeNode: false,
    }
  },
  methods: {
    async submit()  {
      const metaParameters = this.buildMetaParameters(this.basicInfo);
      const mainParameters = this.buildMainTriggerParameters(this.basicInfo.webhookEndpoint, this.properties, this.fields);
      if(this.empty) {
        await this.emptyOutput();
      }
      if(this.basicNodeGen) {
        const paramsBundle = {
          metaParameters,
          mainParameters,
          nodeGenerationType: "Simple",
          nodeType: "Trigger",
        };
        await this.simpleNode(paramsBundle);
      }
      if(this.packageGen) {
        await this.packageGenerator(metaParameters);
      }
      if(this.placeNode) {
        await this.placeFunctional();
      }
      alert("All done! Thank you for using the nodemaker. Check the developer console for more detailed logs.")
    },
  },
}
</script>

<style scoped>
.stacked {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
</style>

