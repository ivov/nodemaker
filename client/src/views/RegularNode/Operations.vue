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
        <div class="width25">
          <Dropdown 
            class="my-15"
            label="Resource" 
            description="The resource to operate on"
            v-bind:options="resourceNames" 
            :value=operation.resource
            v-model=operation.resource
          />
          <InputField 
            class="my-15"
            label="Operation Name"
            placeholder="Get" 
            description=""
            :value=operation.name
            v-model=operation.name
          />
          <InputField 
            class="my-15"
            label="Description"
            placeholder="Get a Hacker News article." 
            description=""
            :value=operation.description
            v-model=operation.description
          />
          <InputField 
            class="my-15"
            label="Endpoint"
            placeholder="/items/$$articleId$$" 
            description="The endpoint to associate with the operation. Wrap variables in dollar signs with the associated field name in the middle: $$var_name$$"
            :value=operation.endpoint
            v-model=operation.endpoint
          />
          <Dropdown 
            class="my-15"
            label="Request Method" 
            description=""
            v-bind:options="['GET', 'POST', 'PATCH', 'PUT', 'DELETE']" 
            :value=operation.requestMethod
            v-model=operation.requestMethod
          />
          <hr>
        </div>
        <SmallButton 
          class="ml-3" 
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
      <div class="centerButton mt-3">
        <router-link to="/regular/fields">
            <ForwardButton 
                text="Select Your Fields" 
                @click.native="$store.commit('submitOperations', operations)"
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
        <router-link to="/regular/resources">
          <BackwardButton 
            text="Edit the previous selections" 
            @click.native="$store.commit('submitOperations', operations)"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../../components/SharedComponents/Instructions.vue';
import ForwardButton from '../../components/SharedComponents/ForwardButton.vue';
import BackwardButton from '../../components/SharedComponents/BackwardButton.vue';
import InputField from '../../components/SharedComponents/InputField.vue';
import Dropdown from '../../components/SharedComponents/Dropdown.vue';
import AddButton from '../../components/SharedComponents/AddButton.vue';
import SmallButton from '../../components/SharedComponents/SmallButton.vue';

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
    ...mapActions(['addOperation']),
    removeOperation(operationKey) {
      this.$store.commit('submitOperations', this.operations.filter(operation => operation.key !== operationKey));
    }
  }
})

export default class App extends Vue {}
</script>

