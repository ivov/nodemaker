<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions 
        class="instructions"
        header="Enter in the resources you are operating on."
        subtitle="These can be users, articles, files, emails, etc."
        instructions="Enter in each resource name."
      />
      <div class="box" v-bind:key="resource.key" v-for="resource in resources">
        <div class="width25">
          <InputField 
            class="my-1"
            label="Resource"
            placeholder="Article"
            description=""
            :value=resource.text
            v-model=resource.text
          />
        </div>
        <SmallButton 
          class="ml-3" 
          v-if="resource.cancel"
          @click.native="removeResource(resource.key)" 
          :cancel=resource.cancel />
      </div>
      <div class="centerButton">
          <AddButton @click.native="addResource()" text="Add another resource" />
      </div>
      <div class="centerButton mt-3">
        <router-link to="/regular/operations">
          <ForwardButton 
            text="Select Your Operations"
            @click.native="$store.commit('submitResources', resources)" 
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
        <router-link to="/">
          <BackwardButton 
            text="Edit the previous selections" 
            @click.native="$store.commit('submitResources', resources)"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Instructions from '../../components/Instructions.vue';
import ForwardButton from '../../components/ForwardButton.vue';
import BackwardButton from '../../components/BackwardButton.vue';
import InputField from '../../components/InputField.vue';
import AddButton from '../../components/AddButton.vue';
import SmallButton from '../../components/SmallButton.vue';

import { mapGetters, mapActions} from 'vuex';

export default {
  name: 'Resources',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    InputField,
    AddButton,
    SmallButton
  },
  computed: mapGetters(['resources']),
  methods: {
    ...mapActions(['addResource']),
    removeResource(resourceKey) {
      this.$store.commit('submitResources', this.resources.filter(resource => resource.key !== resourceKey));
    },
  }
}
</script>

