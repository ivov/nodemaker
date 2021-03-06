<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions 
        class="instructions"
        header="Welcome to the nodemaker."
        subtitle="This tool is designed to help developers create their own n8n nodes."
        instructions="To get started, enter in your node’s name, authorization method, color, and API base url."
      />
      <div class="width25">
        <InputField 
          class="my-15"
          label="Name"
          description=""
          placeholder="Hacker News" 
          :value=basicInfo.serviceName
          v-model=basicInfo.serviceName
        />
        <Dropdown 
          class="my-15"
          label="Auth" 
          description="The type of authorization your node uses"
          v-bind:options="['No Auth', 'API Key', 'OAuth2']" 
          :option=basicInfo.authType
          v-model=basicInfo.authType
        />
        <InputField 
          class="my-15"
          label="Color"
          description=""
          placeholder="#ffffff" 
          :value=basicInfo.nodeColor
          v-model=basicInfo.nodeColor
        />
        <InputField 
          class="my-15"
          label="API Base URL"
          description="The base URL for your node's API endpoints"
          placeholder="http://hn.algolia.com/api/v1" 
          :value=basicInfo.apiUrl
          v-model=basicInfo.apiUrl
        />
        <Dropdown 
          class="my-15"
          label="Node Type" 
          description=""
          v-bind:options="['Regular', 'Trigger']" 
          :value=nodeType
          v-on:input="changeNodeType"
        />
        <InputField 
          class="my-15"
          label="Webhook Endpoint"
          description="The endpoint to register your webhook."
          placeholder="/webhook" 
          v-if="nodeType === 'Trigger'"
          :value=basicInfo.webhookEndpoint
          v-model=basicInfo.webhookEndpoint
        />
        <SwitchComponent
          class="my-15"
          label="Enter in Documentation Info"
          description=""
          placeholder="http://hn.algolia.com/api/v1" 
          v-if="nodeType === 'Regular'"
          :value=documentation
          v-on:input="toggleDocumentation" />
        <div v-if="documentation">
          <InputField 
          class="my-15"
          label="Homepage URL"
          description=""
          placeholder="https://news.ycombinator.com" 
          :value=docsInfo.serviceUrl
          v-model=docsInfo.serviceUrl
        />
        <TextArea
          class="my-15"
          label="Description" 
          description=""
          placeholder="A social news website focusing on computer science and entrepreneurship."
          :value=docsInfo.introDescription
          v-model=docsInfo.introDescription
        />
        <InputField 
          class="my-15"
          label="Example Usage Name"
          description="The name of the example workflow on n8n's site."
          placeholder="Get an article from Hacker News" 
          :value=docsInfo.exampleUsage
          v-model=docsInfo.exampleUsage
        />
        <InputField 
          class="my-15"
          label="Workflow URL"
          description="The url of the example workflow on n8n's site."
          placeholder="https://n8n.io/workflows/608"
          :value=docsInfo.workflowUrl
          v-model=docsInfo.workflowUrl
        />
        </div>
      </div>
      <div class="mt-3 centerButton">
        <router-link v-if="nodeType === 'Regular'" to="/regular/resources">
          <ForwardButton 
            text="Get Started" 
          />
        </router-link>
        <router-link v-if="nodeType === 'Trigger'" to="/trigger/properties">
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

<script>
import Instructions from '../components/Instructions.vue';
import ForwardButton from '../components/ForwardButton.vue';
import InputField from '../components/InputField.vue';
import Dropdown from '../components/Dropdown.vue';
import TextArea from '../components/TextArea.vue';
import SwitchComponent from '../components/Switch.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'BasicInfo',
  components: {
    Instructions,
    ForwardButton,
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
}
</script>
