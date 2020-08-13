<template>
  <div class="input">
      <div class="group">
        <label>{{label}}: </label>
        <i v-if="description !== ''" class="fas fa-info-circle icon" :title=description></i>
      </div>
      <textarea 
        type="text" 
        ref="text_input"
        :placeholder="placeholder" 
        :value="value"
        @input="input" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'TextArea',
  props: ["label", "placeholder", "value", "description"],
  methods: {
    input() {
      this.$emit('input', this.$refs.text_input.value);
    }
  }
})
export default class App extends Vue {}
</script>

<style scoped>
.input {
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
}

.group {
  display: flex;
  justify-content: end;
  align-items: center;
}

.icon {
    line-height: normal;
    margin-left: .25rem;
    opacity: 0.6;
}

textarea {
    background: #F4F4F4;
    border: 1px solid #555555;
    box-sizing: border-box;
    border-radius: 15px;
    padding: .35rem;
    padding-left: .75rem;
    width: 13rem;
    height: 6rem;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #555555;
}
</style>
