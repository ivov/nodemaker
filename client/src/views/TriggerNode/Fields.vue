<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Add your fields."
        subtitle="If a property option has an associated set of fields, add those in here."
        instructions="Choose the field type, enter in the nessecary additional infomation, and choose the options to associate them with."
      />
      <div class="box" v-bind:key="field.key" v-for="field in fields">
        <div class="width30">
          <div v-bind:key="resourceOperation.key" v-for="resourceOperation in field.resourceOperation">
            <Dropdown 
              class="my-15"
              label="Property/Option" 
              description="The property/option pairs to associate this field with. Choose as many associations as you need"
              :add=resourceOperation.add
              :cancel=resourceOperation.cancel
              v-on:plus="addResourceOperation(field.key)"
              v-on:del="removeResourceOperation(field.key, resourceOperation.key)"
              v-bind:options="propertyNames" 
              :value=resourceOperation.value
              v-model=resourceOperation.value
            />
          </div>
          <Dropdown 
            class="my-15"
            label="Type" 
            description=""
            @change.native="adjustFieldParams(field.key, field.type)"
            v-bind:options="['String', 'Options', 'Multioptions', 'Boolean', 'Number', 'Collection', 'Fixed Collection']" 
            :value=field.type
            v-model=field.type
          />
          <InputField 
            class="my-15"
            label="Field Name"
            placeholder="Article id" 
            description=""
            :value=field.name
            v-model=field.name
          />
          <InputField 
            class="my-15"
            label="Description"
            placeholder="The id of the article to get." 
            description=""
            :value=field.description
            v-model=field.description
          />
          <InputField 
            class="my-15"
            label="Default"
            placeholder="123" 
            description="The default value for the field when the user opens the node"
            :value=field.default
            v-model=field.default
          />
          <div v-if="field.type === 'Options' || field.type === 'Multioptions'">
            <strong>Options:</strong>
            <div class="box ml-1" v-bind:key="option.key" v-for="option in field.options">
              <div class="option width25">
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
                class="ml-1" 
                v-if="option.add"
                @click.native="addOption(field.key)" 
                :cancel=option.cancel />
              <SmallButton 
                class="ml-1" 
                v-if="option.cancel"
                @click.native="removeOption(field.key, option.key)" 
                :cancel=option.cancel />
            </div>
          </div>
          <div v-if="field.type === 'Collection'">
            <strong>Collection Options: </strong>
            <div class="box ml-1" v-bind:key="option.key" v-for="option in field.options">
              <div class="option">
                <div class="width25">
                  <Dropdown 
                    class="my-15"
                    label="Type" 
                    description="The type of the collection option"
                    @change.native="adjustCollectionFieldParams(field.key, option.key, option.type)"
                    v-bind:options="['String', 'Options', 'Multioptions', 'Boolean', 'Number']" 
                    :value=option.type
                    v-model=option.type
                  />
                </div>
                <div class="width25">
                  <InputField 
                    class="my-15"
                    label="Field Name"
                    placeholder="Tags" 
                    description=""
                    :value=option.name
                    v-model=option.name
                  />
                  <InputField 
                    class="my-15"
                    label="Description"
                    placeholder="The id of the article to get." 
                    description=""
                    :value=option.description
                    v-model=option.description
                  />
                  <InputField 
                    class="my-15"
                    label="Default"
                    placeholder="123" 
                    description="The default value for the field when the user opens the node" 
                    :value=option.default
                    v-model=option.default
                  />
                </div>
                <div v-if="option.type === 'Options' || option.type === 'Multioptions'" class="width25">
                  <strong>Options:</strong>
                  <div class="ml-3 width25">
                    <div class="box" v-bind:key="innerOption.key" v-for="innerOption in option.options">
                      <div class="option">
                        <InputField 
                          class="my-15"
                          label="Option Name"
                          placeholder="Comment" 
                          description=""
                          :value=innerOption.name
                          v-model=innerOption.name
                        />
                        <InputField 
                          class="my-15"
                          label="Description"
                          placeholder="Returns query results filtered by comment tag." 
                          description=""
                          :value=innerOption.description
                          v-model=innerOption.description
                        />
                      </div>
                      <SmallButton 
                        class="ml-1" 
                        v-if="innerOption.add"
                        @click.native="addInnerOption({ fieldKey: field.key, optionKey: option.key })" 
                        :cancel=innerOption.cancel />
                      <SmallButton 
                        class="ml-1" 
                        v-if="innerOption.cancel"
                        @click.native="removeInnerOption(field.key, option.key, innerOption.key)" 
                        :cancel=innerOption.cancel />
                    </div>
                  </div>
                </div>
                <hr>
              </div>
              <SmallButton 
                class="ml-4" 
                v-if="option.add"
                @click.native="addOption(field.key)" 
                :cancel=option.cancel />
              <SmallButton 
                class="ml-4" 
                v-if="option.cancel"
                @click.native="removeOption(field.key, option.key)" 
                :cancel=option.cancel />
            </div>
          </div>
          <hr>
        </div>
        <SmallButton 
          class="ml-3" 
          v-if="field.cancel"
          @click.native="removeField(field.key)" 
          :cancel=field.cancel />
      </div>
      <div class="centerButton">
          <AddButton 
            text="Add another field"
            @click.native="addField()" 
          />
      </div>
      <div class="centerButton mt-3">
        <router-link to="/trigger/complete">
            <ForwardButton 
              text="Generate your node" 
              @click.native="$store.commit('submitFields', fields)"
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
        <router-link to="/trigger/properties">
          <BackwardButton 
            text="Edit the previous selections" 
            @click.native="$store.commit('submitFields', fields)"
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

import { mapGetters, mapActions} from 'vuex';

export default {
  name: 'Fields',
  components: {
    Instructions,
    ForwardButton,
    BackwardButton,
    InputField,
    Dropdown,
    AddButton,
    SmallButton
  },
  computed: {
    ...mapGetters(['propertyNames', 'fields']),
  },
  methods: {
    ...mapActions([
      'addField', 
      'addResourceOperation', 
      'createOption', 
      'addOption', 
      'createCollectionOption', 
      'addCollectionOption', 
      'createInnerOption', 
      'addInnerOption',
    ]),
    adjustFieldParams(fieldKey, type) {
      if(type === "Options" || type === "Multioptions") {
        this.createOption(fieldKey);
      } else if(type === "Collection" || type === "Fixed Collection") {
        this.createCollectionOption(fieldKey);
      }
    },
    adjustCollectionFieldParams(fieldKey, optionKey, type) {
      if(type === "Options" || type === "Multioptions") {
        this.createInnerOption({ fieldKey, optionKey });
      }
    },
    removeInnerOption(fieldKey, optionKey, innerOptionKey) {
      const newObj = this.fields[fieldKey].options[optionKey].options.filter(innerOption => innerOption.key !== innerOptionKey);
      this.$store.commit('submitInnerOptions', { fieldKey, optionKey, newObj });
    },
    removeOption(fieldKey, optionKey) {
      const newObj = this.fields[fieldKey].options.filter(option => option.key !== optionKey);
      this.$store.commit('submitOptions', { fieldKey, newObj});
    },
    removeField(fieldKey) {
      this.$store.commit('submitFields', this.fields.filter(field => field.key !== fieldKey));
    },
    removeResourceOperation(fieldKey, resourceKey) {
      const newObj = this.fields[fieldKey].resourceOperation.filter(resource => resource.key !== resourceKey);
      this.$store.commit('submitResourceOperation', { newObj, fieldKey});
    },
  },
}
</script>

