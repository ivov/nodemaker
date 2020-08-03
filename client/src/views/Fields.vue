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
            v-bind:options="['String', 'Options', 'Multioptions', 'Boolean', 'Number', 'Collection', 'Fixed Collection']" 
            :value=field.type
            v-model=field.type
          />
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
import { Component, Vue } from 'vue-property-decorator';

import Instructions from '../components/SharedComponents/Instructions';
import ForwardButton from '../components/SharedComponents/ForwardButton';
import BackwardButton from '../components/SharedComponents/BackwardButton';
import InputField from '../components/SharedComponents/InputField';
import Dropdown from '../components/SharedComponents/Dropdown';
import AddButton from '../components/SharedComponents/AddButton';
import SmallButton from '../components/SharedComponents/SmallButton';

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
  computed: mapGetters(['operationWithResourceNames', 'fields']),
  methods: {
    ...mapActions(['submitFields']),
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

.box {
  display: flex;
  align-items: center;
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

