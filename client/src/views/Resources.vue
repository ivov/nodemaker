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
        <div class="inputContainer">
          <InputField 
            class="input"
            label="Resource"
            placeholder="Article"
            description=""
            :value=resource.text
            v-model=resource.text
          />
        </div>
        <SmallButton 
          class="delete" 
          v-if="resource.cancel"
          @click.native="removeResource(resource.key)" 
          :cancel=resource.cancel />
      </div>
      <div class="centerButton">
          <AddButton @click.native="addResource()" text="Add another resource" />
      </div>
      <div class="centerButton finalButton">
        <router-link to="/operations">
          <ForwardButton 
            text="Select Your Operations"
            @click.native="submitResources(resources)" 
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
            @click.native="submitResources(resources)"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions.vue';
import ForwardButton from '../components/SharedComponents/ForwardButton.vue';
import BackwardButton from '../components/SharedComponents/BackwardButton.vue';
import InputField from '../components/SharedComponents/InputField.vue';
import AddButton from '../components/SharedComponents/AddButton.vue';
import SmallButton from '../components/SharedComponents/SmallButton.vue';

import { mapGetters, mapActions} from 'vuex';

@Component({
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
    ...mapActions(['submitResources']),
    addResource() {
      this.resources.push({
        key: this.resources.length,
        text: "",
        cancel: true
      });

      this.$store.commit('submitResources', this.resources);
    },
    removeResource(resourceKey) {
      this.$store.commit('submitResources', this.resources.filter(resource => resource.key !== resourceKey));
    },
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
  margin: 1rem 0rem;
}

.inputContainer {
  width: 25rem;
}

.box {
  display: flex;
  align-items: center;
}

.delete {
  margin-left: 3rem;
}

.centerButton {
  text-align: center;
}

.finalButton {
   margin-top: 3rem;
}
</style>

