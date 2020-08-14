<template>
  <div class="input">
      <div class="group">
        <label>{{label}}: </label>
        <i v-if="description !== ''" class="fas fa-info-circle icon" :title=description></i>
      </div>
      <div class="group">
        <input 
          type="text" 
          ref="text_input"
          :placeholder="placeholder" 
          :value="value"
          @input="input" />
          <SmallButton v-if="add" @click.native="$emit('plus')" />
          <SmallButton v-if="cancel" @click.native="$emit('del')" cancel=true />
        </div>
  </div>
</template>

<script>
import SmallButton from './SmallButton.vue';

export default {
  name: 'InputField',
  components: {
    SmallButton
  },
  props: ["label", "placeholder", "value", "add", "cancel", "description"],
  methods: {
    input() {
      this.$emit('input', this.$refs.text_input.value);
    }
  }
}
</script>

<style scoped>
.input {
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
}

.group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.icon {
    line-height: normal;
    margin-left: .25rem;
    opacity: 0.6;
}

input {
    background: #F4F4F4;
    border: 1px solid #555555;
    box-sizing: border-box;
    border-radius: 15px;
    padding: .35rem;
    padding-left: .75rem;
    width: 13rem;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #555555;
}
</style>
