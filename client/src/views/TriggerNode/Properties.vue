<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Add your webhook properties"
        instructions="Enter in each property's name, description, type, and required property."
      />
      <div class="box" v-bind:key="property.key" v-for="property in properties">
        <div class="width25">
          <InputField 
            class="my-15"
            label="Property Name"
            placeholder="Event" 
            description=""
            :value=property.displayName
            v-model=property.displayName
          />
          <InputField 
            class="my-15"
            label="Description"
            placeholder="The events that can trigger the webhook and whether they are enabled." 
            description=""
            :value=property.description
            v-model=property.description
          />
          <InputField 
            class="my-15"
            label="Default"
            placeholder="" 
            description=""
            :value=property.default
            v-model=property.default
          />
          <SwitchComponent
            class="my-15"
            label="Required"
            description=""
            :value=property.required
            v-on:input="toggleRequired(property.key)"
          />
          <Dropdown 
            class="my-15"
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
                  class="my-15"
                  label="Option Name"
                  placeholder="Comment" 
                  description=""
                  :value=option.name
                  v-model=option.name
                />
                <InputField 
                  class="my-15"
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
                @click.native="addPropertyOption(property.key)" 
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
          class="ml-3" 
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
      <div class="centerButton mt-3">
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

<script>
import Instructions from '../../components/Instructions.vue';
import ForwardButton from '../../components/ForwardButton.vue';
import BackwardButton from '../../components/BackwardButton.vue';
import InputField from '../../components/InputField.vue';
import Dropdown from '../../components/Dropdown.vue';
import AddButton from '../../components/AddButton.vue';
import SmallButton from '../../components/SmallButton.vue';
import SwitchComponent from '../../components/Switch.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
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
    ...mapActions(['createPropertyOption', 'addProperty', 'addPropertyOption']),
    adjustPropertyParams(propertyKey, type) {
      if(type === "Options" || type === "Multioptions") {
        this.createPropertyOption(propertyKey);
      }
    },
    toggleRequired(propertyKey) {
      const newValue = !this.properties[propertyKey].required;
      this.$store.commit('toggleRequired', { propertyKey, newValue });
    },
    removeProperty(propertyKey) {
      this.$store.commit('submitProperties', this.properties.filter(property => property.key !== propertyKey));
    },
    removeOption(propertyKey, optionKey) {
      const newObj = this.properties[propertyKey].options.filter(option => option.key !== optionKey);
      this.$store.commit('submitPropertyOptions', { propertyKey, newObj});
    },
  }
}
</script>
