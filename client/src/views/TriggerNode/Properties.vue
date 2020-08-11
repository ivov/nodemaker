<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Add your webhook properties"
        instructions="Enter in each property's name, description, type, and required property."
      />
      <div class="box" v-bind:key="property.key" v-for="property in properties">
        <div class="inputContainer">
          <InputField 
            class="input"
            label="Property Name"
            placeholder="Event" 
            description=""
            :value=property.displayName
            v-model=property.displayName
          />
          <InputField 
            class="input"
            label="Description"
            placeholder="The events that can trigger the webhook and whether they are enabled." 
            description=""
            :value=property.description
            v-model=property.description
          />
          <InputField 
            class="input"
            label="Default"
            placeholder="" 
            description=""
            :value=property.default
            v-model=property.default
          />
          <SwitchComponent
            class="input"
            label="Required"
            description=""
            :value=property.required
            v-on:input="toggleRequired(property.key)"
          />
          <Dropdown 
            class="input"
            label="Type" 
            description=""
            @change.native="adjustPropertyParams(property.key, property.type)"
            v-bind:options="['String', 'Options', 'Multioptions', 'Boolean', 'Number']" 
            :value=property.type
            v-model=property.type
          />
          <div v-if="property.type === 'Options' || property.type === 'Multioptions'">
            <strong>Options:</strong>
            <div class="box innerText" v-bind:key="option.key" v-for="option in property.options">
              <div class="option optionBox">
                <InputField 
                  class="input"
                  label="Option Name"
                  placeholder="Comment" 
                  description=""
                  :value=option.name
                  v-model=option.name
                />
                <InputField 
                  class="input"
                  label="Description"
                  placeholder="Returns query results filtered by comment tag."
                  description="" 
                  :value=option.description
                  v-model=option.description
                />
              </div>
              <SmallButton 
                class="deleteOption" 
                v-if="option.add"
                @click.native="addOption(property.key)" 
                :cancel=option.cancel />
              <SmallButton 
                class="deleteOption" 
                v-if="option.cancel"
                @click.native="removeOption(property.key, option.key)" 
                :cancel=option.cancel />
            </div>
          </div>
          <hr>
        </div>
        <SmallButton 
          class="delete" 
          v-if="property.cancel"
          @click.native="removeProperty(property.key)" 
          :cancel=property.cancel />
      </div>
      <div class="centerButton">
          <AddButton 
            text="Add another property" 
            @click.native="addProperty()" 
            />
      </div>
      <div class="centerButton finalButton">
        <router-link to="/trigger/fields">
            <ForwardButton 
                text="Select Your Fields" 
                @click.native="$store.commit('submitProperties', properties)"
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
            @click.native="$store.commit('submitProperties', properties)"
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
import InputField from '../../components/SharedComponents/InputField.vue';
import Dropdown from '../../components/SharedComponents/Dropdown.vue';
import AddButton from '../../components/SharedComponents/AddButton.vue';
import SmallButton from '../../components/SharedComponents/SmallButton.vue';
import SwitchComponent from '../../components/SharedComponents/Switch.vue';

import { mapGetters, mapActions } from 'vuex';

@Component({
  name: 'Events',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    InputField,
    Dropdown,
    AddButton,
    SmallButton,
    SwitchComponent,
  },
  computed: mapGetters(['properties']),
  methods: {
    ...mapActions(['createPropertyOption']),
    addProperty() {
        this.properties.push({
            key: this.properties.length,
            resource: "",
            name: "",
            description: "",
            endpoint: "",
            requestMethod: "",
            default: "",
            cancel: true
        });

        this.$store.commit('submitProperties', this.properties);
    },
    removeProperty(propertyKey) {
      this.$store.commit('submitProperties', this.properties.filter(property => property.key !== propertyKey));
    },
    toggleRequired(propertyKey) {
      const newValue = !this.properties[propertyKey].required;
      this.$store.commit('toggleRequired', { propertyKey, newValue });
    },
    adjustPropertyParams(propertyKey, type) {
      if(type === "Options" || type === "Multioptions") {
        this.createPropertyOption(propertyKey);
      }
    },
    addOption(propertyKey) {
      const option = {
        name: "",
        description: "",
        key: this.properties[propertyKey].options.length,
        add: false,
        cancel: true
      };

      this.$store.commit('pushPropertyOption', { propertyKey, option });
    },
    removeOption(propertyKey, optionKey) {
      const newObj = this.properties[propertyKey].options.filter(option => option.key !== optionKey);
      this.$store.commit('submitPropertyOptions', { propertyKey, newObj});
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
  margin: 1.5rem 0rem;
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

