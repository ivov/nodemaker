<template>
  <div class="home">
    <div id="optionsBox">
      <Instructions
        class="instructions"
        header="Add your fields."
        subtitle="If an operation has an associated set of fields, add those in here."
        instructions="Choose the field type, enter in the nessecary additional infomation, and choose the operations to associate them with."
      />
      <div class="box" v-bind:key="field.key" v-for="field in fields">
        <div class="inputContainer">
          <div v-bind:key="resourceOperation.key" v-for="resourceOperation in field.resourceOperation">
            <Dropdown 
              class="input"
              label="Resource/Operation" 
              :add=resourceOperation.add
              :cancel=resourceOperation.cancel
              v-on:plus="addResourceOperation(field.key)"
              v-on:del="removeResourceOperation(field.key, resourceOperation.key)"
              v-bind:options="operationWithResourceNames" 
              :value=resourceOperation.value
              v-model=resourceOperation.value
            />
          </div>
          <Dropdown 
            class="input"
            label="Type" 
            @change.native="adjustFieldParams(field.key, field.type)"
            v-bind:options="['String', 'Options', 'Multioptions', 'Boolean', 'Number', 'Collection', 'Fixed Collection']" 
            :value=field.type
            v-model=field.type
          />
          <div v-if="field.type === 'String'">
            <InputField 
              class="input"
              label="Field Name"
              placeholder="Article id" 
              :value=field.name
              v-model=field.name
            />
            <InputField 
              class="input"
              label="Description"
              placeholder="The id of the article to get." 
              :value=field.description
              v-model=field.description
            />
            <InputField 
              class="input"
              label="Default"
              placeholder="123" 
              :value=field.default
              v-model=field.default
            />
          </div>
          <div v-if="field.type === 'Boolean'">
            <InputField 
              class="input"
              label="Field Name"
              placeholder="Return All" 
              :value=field.name
              v-model=field.name
            />
            <InputField 
              class="input"
              label="Description"
              placeholder="Whether to return all results or only up to a limit." 
              :value=field.description
              v-model=field.description
            />
            <InputField 
              class="input"
              label="Default"
              placeholder="false" 
              :value=field.default
              v-model=field.default
            />
          </div>
          <div v-if="field.type === 'Number'">
            <InputField 
              class="input"
              label="Field Name"
              placeholder="Limit" 
              :value=field.name
              v-model=field.name
            />
            <InputField 
              class="input"
              label="Description"
              placeholder="Limit of Hacker News articles to be returned for the query." 
              :value=field.description
              v-model=field.description
            />
            <InputField 
              class="input"
              label="Default"
              placeholder="20" 
              :value=field.default
              v-model=field.default
            />
          </div>
          <div v-if="field.type === 'Options' || field.type === 'Multioptions'">
            <InputField 
              class="input"
              label="Field Name"
              placeholder="Tags" 
              :value=field.name
              v-model=field.name
            />
            <InputField 
              class="input"
              label="Description"
              placeholder="Tags for filtering the results of the query." 
              :value=field.description
              v-model=field.description
            />
            <InputField 
              class="input"
              label="Default"
              placeholder="{}" 
              :value=field.default
              v-model=field.default
            />
            <strong>Options:</strong>
            <div class="box innerText" v-bind:key="option.key" v-for="option in field.options">
              <div class="option optionBox">
                <InputField 
                  class="input"
                  label="Option Name"
                  placeholder="Comment" 
                  :value=option.name
                  v-model=option.name
                />
                <InputField 
                  class="input"
                  label="Description"
                  placeholder="Returns query results filtered by comment tag." 
                  :value=option.description
                  v-model=option.description
                />
              </div>
              <SmallButton 
                class="deleteOption" 
                v-if="option.add"
                @click.native="addOption(field.key)" 
                :cancel=option.cancel />
              <SmallButton 
                class="deleteOption" 
                v-if="option.cancel"
                @click.native="removeOption(field.key, option.key)" 
                :cancel=option.cancel />
            </div>
          </div>
          <div v-if="field.type === 'Collection'">
            <InputField 
              class="input"
              label="Field Name"
              placeholder="Tags" 
              :value=field.name
              v-model=field.name
            />
            <InputField 
              class="input"
              label="Description"
              placeholder="Tags for filtering the results of the query." 
              :value=field.description
              v-model=field.description
            />
            <InputField 
              class="input"
              label="Default"
              placeholder="{}" 
              :value=field.default
              v-model=field.default
            />
            <strong>Collection Options: </strong>
            <div class="box innerText" v-bind:key="option.key" v-for="option in field.options">
              <div class="option">
                <div class="optionBox">
                  <Dropdown 
                    class="input"
                    label="Type" 
                    @change.native="adjustCollectionFieldParams(field.key, option.key, option.type)"
                    v-bind:options="['String', 'Options', 'Multioptions', 'Boolean', 'Number']" 
                    :value=option.type
                    v-model=option.type
                  />
                </div>
                <div v-if="option.type === 'String'" class="optionBox">
                  <InputField 
                    class="input"
                    label="Field Name"
                    placeholder="Article id" 
                    :value=option.name
                    v-model=option.name
                  />
                  <InputField 
                    class="input"
                    label="Description"
                    placeholder="The id of the article to get." 
                    :value=option.description
                    v-model=option.description
                  />
                  <InputField 
                    class="input"
                    label="Default"
                    placeholder="123" 
                    :value=option.default
                    v-model=option.default
                  />
                </div>
                <div v-if="option.type === 'Boolean'" class="optionBox">
                  <InputField 
                    class="input"
                    label="Field Name"
                    placeholder="Return All" 
                    :value=option.name
                    v-model=option.name
                  />
                  <InputField 
                    class="input"
                    label="Description"
                    placeholder="Whether to return all results or only up to a limit." 
                    :value=option.description
                    v-model=option.description
                  />
                  <InputField 
                    class="input"
                    label="Default"
                    placeholder="false" 
                    :value=option.default
                    v-model=option.default
                  />
                </div>
                <div v-if="option.type === 'Number'" class="optionBox">
                  <InputField 
                    class="input"
                    label="Field Name"
                    placeholder="Limit" 
                    :value=option.name
                    v-model=option.name
                  />
                  <InputField 
                    class="input"
                    label="Description"
                    placeholder="Limit of Hacker News articles to be returned for the query." 
                    :value=option.description
                    v-model=option.description
                  />
                  <InputField 
                    class="input"
                    label="Default"
                    placeholder="20" 
                    :value=option.default
                    v-model=option.default
                  />
                </div>
                <div v-if="option.type === 'Options' || field.type === 'Multioptions'" class="optionBox">
                  <InputField 
                    class="input"
                    label="Field Name"
                    placeholder="Tags" 
                    :value=option.name
                    v-model=option.name
                  />
                  <InputField 
                    class="input"
                    label="Description"
                    placeholder="Tags for filtering the results of the query." 
                    :value=option.description
                    v-model=option.description
                  />
                  <InputField 
                    class="input"
                    label="Default"
                    placeholder="{}" 
                    :value=option.default
                    v-model=option.default
                  />
                  <strong>Options:</strong>
                  <div class="innerOptions optionBox">
                    
                    <div class="box" v-bind:key="innerOption.key" v-for="innerOption in option.options">
                      <div class="option">
                        <InputField 
                          class="input"
                          label="Option Name"
                          placeholder="Comment" 
                          :value=innerOption.name
                          v-model=innerOption.name
                        />
                        <InputField 
                          class="input"
                          label="Description"
                          placeholder="Returns query results filtered by comment tag." 
                          :value=innerOption.description
                          v-model=innerOption.description
                        />
                      </div>
                      <SmallButton 
                        class="deleteOption" 
                        v-if="innerOption.add"
                        @click.native="addInnerOption(field.key, option.key)" 
                        :cancel=innerOption.cancel />
                      <SmallButton 
                        class="deleteOption" 
                        v-if="innerOption.cancel"
                        @click.native="removeInnerOption(field.key, option.key, innerOption.key)" 
                        :cancel=innerOption.cancel />
                    </div>
                  </div>
                </div>
                <hr>
              </div>
              <SmallButton 
                class="deleteSection" 
                v-if="option.add"
                @click.native="addOption(field.key)" 
                :cancel=option.cancel />
              <SmallButton 
                class="deleteSection" 
                v-if="option.cancel"
                @click.native="removeOption(field.key, option.key)" 
                :cancel=option.cancel />
            </div>
          </div>
          <hr>
        </div>
        <SmallButton 
          class="delete" 
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
      <div class="centerButton finalButton">
        <router-link to="/complete">
            <ForwardButton 
              text="Generate your node" 
              @click.native="submitFields(fields)"
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
        <router-link to="/operations">
          <BackwardButton 
            text="Edit the previous selections" 
            @click.native="submitFields(fields)"
          />
        </router-link>
      </div>
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
import AddButton from '../components/SharedComponents/AddButton.vue';
import SmallButton from '../components/SharedComponents/SmallButton.vue';

import { mapGetters, mapActions} from 'vuex';

@Component({
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
    ...mapGetters(['operationWithResourceNames', 'fields']),
  },
  methods: {
    ...mapActions(['submitFields', 'createOption', 'createCollectionOption', 'createInnerOption']),
    adjustFieldParams(fieldKey, type) {
      console.log(type);
      if(type === "Options" || type === "Multioptions") {
        this.createOption(fieldKey);
      } else if(type === "Collection" || type === "Fixed Collection") {
        this.createCollectionOption(fieldKey);
      }
    },
    adjustCollectionFieldParams(fieldKey, optionKey, type) {
      console.log(type === "Multioptions");
      if(type === "Options" || type === "Multioptions") {
        this.createInnerOption({ fieldKey, optionKey });
      }
    },
    addOption(fieldKey) {
      const option = {
        name: "",
        description: "",
        key: this.fields[fieldKey].options.length,
        add: false,
        cancel: true
      };

      this.$store.commit('pushOption', { fieldKey, option });
    },
    addInnerOption(fieldKey, optionKey) {
      const option = {
        name: "",
        description: "",
        key: this.fields[fieldKey].options[optionKey].options.length,
        add: false,
        cancel: true
      };

      this.$store.commit('pushInnerOption', { fieldKey, optionKey, option });
    },
    removeInnerOption(fieldKey, optionKey, innerOptionKey) {
      const newObj = this.fields[fieldKey].options[optionKey].options.filter(innerOption => innerOption.key !== innerOptionKey);
      this.$store.commit('submitInnerOptions', { fieldKey, optionKey, newObj });
    },
    addCollectionOption(fieldKey) {
      const option = {
        key: this.fields[fieldKey].options.length,
        type: "",
        name: "",
        description: "",
        default: "",
        add: false,
        cancel: true
      };

      this.$store.commit('pushOption', { fieldKey, option });
    },
    removeOption(fieldKey, optionKey) {
      const newObj = this.fields[fieldKey].options.filter(option => option.key !== optionKey);
      this.$store.commit('submitOptions', { fieldKey, newObj});
    },
    addField() {
      this.$store.commit('pushToFields', {
          key: this.fields.length,
          resourceOperation: [
            {
              key: 0,
              value: "",
              resource: "",
              operation: "",
              add: true,
              cancel: false
            }
          ],
          type: "",
          name: "",
          description: "",
          default: "",
          cancel: true
        });
    },
    addResourceOperation(key) {
      const newObj = {
        key: this.fields[key].resourceOperation.length,
        text: "",
        add: false,
        cancel: true
      };

      this.$store.commit('pushToResourceOperation', { newObj, key });
    },
    removeField(fieldKey) {
      this.$store.commit('submitFields', this.fields.filter(field => field.key !== fieldKey));
    },
    removeResourceOperation(fieldKey, resourceKey) {
      const newObj = this.fields[fieldKey].resourceOperation.filter(resource => resource.key !== resourceKey);
      this.$store.commit('submitResourceOperation', { newObj, fieldKey});
    },
  },
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

.delete {
  margin-left: 3rem;
}

.deleteOption {
  margin-left: 1rem;
}

.deleteSection {
  margin-left: 4rem;
}

/* .option {
  min-width: 20rem;
} */

.box {
  display: flex;
  align-items: center;
}

.optionBox {
  width: 25rem;
}

.innerText {
  margin-left: 1rem;
}

.innerOptions {
  margin-left: 3rem;
}

.inputContainer {
  width: 30rem;
}

.centerButton {
  text-align: center;
}

.finalButton {
   margin-top: 3rem;
}
</style>

