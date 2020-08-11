<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions 
        class="instructions"
        header="Welcome to the nodemaker."
        subtitle="This tool is designed to help developers create their own n8n nodes."
        instructions="To get started, enter in your node’s name, authorization method, color, and API base url."
      />
      <div class="inputContainer">
        <InputField 
          class="input"
          label="Name"
          description=""
          placeholder="Hacker News" 
          :value=basicInfo.name
          v-model=basicInfo.name
        />
        <Dropdown 
          class="input"
          label="Auth" 
          description="The type of authorization your node uses"
          v-bind:options="['No Auth', 'API Key', 'OAuth2']" 
          :option=basicInfo.auth
          v-model=basicInfo.auth
        />
        <InputField 
          class="input"
          label="Color"
          description=""
          placeholder="#ffffff" 
          :value=basicInfo.color
          v-model=basicInfo.color
        />
        <InputField 
          class="input"
          label="API Base URL"
          description="The base URL for your node's API endpoints"
          placeholder="http://hn.algolia.com/api/v1" 
          :value=basicInfo.baseURL
          v-model=basicInfo.baseURL
        />
        <Dropdown 
          class="input"
          label="Node Type" 
          description=""
          v-bind:options="['Regular Node', 'Trigger Node']" 
          :value=nodeType
          v-on:input="changeNodeType"
        />
        <InputField 
          class="input"
          label="Webhook Endpoint"
          description="The endpoint to register your webhook."
          placeholder="/webhook" 
          v-if="nodeType === 'Trigger Node'"
          :value=basicInfo.webhookEndpoint
          v-model=basicInfo.webhookEndpoint
        />
        <SwitchComponent
          class="input"
          label="Enter in Documentation Info"
          description=""
          placeholder="http://hn.algolia.com/api/v1" 
          v-if="nodeType === 'Regular Node'"
          :value=documentation
          v-on:input="toggleDocumentation" />
        <div v-if="documentation">
          <InputField 
          class="input"
          label="Homepage URL"
          description=""
          placeholder="https://news.ycombinator.com" 
          :value=docsInfo.serviceURL
          v-model=docsInfo.serviceURL
        />
        <TextArea
          class="input"
          label="Description" 
          description=""
          placeholder="A social news website focusing on computer science and entrepreneurship."
          :value=docsInfo.introDescription
          v-model=docsInfo.introDescription
        />
        <InputField 
          class="input"
          label="Example Usage Name"
          description="The name of the example workflow on n8n's site."
          placeholder="Get an article from Hacker News" 
          :value=docsInfo.exampleUsage
          v-model=docsInfo.exampleUsage
        />
        <InputField 
          class="input"
          label="Workflow Number"
          description="The id number of the example workflow on n8n's site."
          placeholder="123"
          :value=docsInfo.workflowNumber
          v-model=docsInfo.workflowNumber
        />
        </div>
      </div>
      <div class="centerButton">
        <router-link v-if="nodeType === 'Regular Node'" to="/regular/resources">
          <ForwardButton 
            text="Get Started" 
          />
        </router-link>
        <router-link v-if="nodeType === 'Trigger Node'" to="/trigger/properties">
          <ForwardButton 
            text="Get Started" 
          />
        </router-link>
      </div>
    </div>
    <div id="previewBox">
      <Instructions
        class="instructions"
        header="A preview of your node will show up here as you create." 
      />
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions.vue';
import ForwardButton from '../components/SharedComponents/ForwardButton.vue';
import BackwardButton from '../components/SharedComponents/BackwardButton.vue';
import InputField from '../components/SharedComponents/InputField.vue';
import Dropdown from '../components/SharedComponents/Dropdown.vue';
import TextArea from '../components/SharedComponents/TextArea.vue';
import SwitchComponent from '../components/SharedComponents/Switch.vue';

import { mapGetters } from 'vuex';

@Component({
  name: 'BasicInfo',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    InputField,
    Dropdown,
    TextArea,
    SwitchComponent,
  },
  computed: mapGetters(['basicInfo', 'docsInfo', 'nodeType', 'documentation']),
  methods: {
    changeNodeType(prop) {
      this.$store.commit('setNodeType', prop);
    },
    toggleDocumentation() {
      this.$store.commit('setDocumentation', !this.documentation);
    },
    submitInfo() {
      this.$store.commit('submitBasicInfo', this.basicInfo);

      if(this.documentation) {
        this.$store.commit('submitDocsInfo', this.docsInfo);
      }
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
  margin-top: 3rem;
  text-align: center;
}
</style>
