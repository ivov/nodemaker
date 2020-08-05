<template>
    <div>
    <InputField 
        class="input"
        label="Field Name"
        placeholder="Article id" 
        :value=name
        v-model=name
    />
    <InputField 
        class="input"
        label="Description"
        placeholder="The id of the article to get." 
        :value=description
        v-model=description
    />
    <InputField 
        class="input"
        label="Default"
        placeholder="123" 
        :value=defaultValue
        v-model=defaultValue
    />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputField from '../SharedComponents/InputField.vue';

@Component({
  name: 'StringInput',
  components: {
      InputField
  },
  props: ["name", "description", "defaultValue"]
})

export default class App extends Vue {}
</script>

<style scoped>
.input {
  margin: 1.5rem 0rem;
}
</style>