<template>
  <span class="input">
      <div class="group">
        <label>{{label}}: </label>
        <i v-if="description !== ''" class="fas fa-info-circle icon" :title=description></i>
      </div>
      <div class="group">
        <select @input="input" ref="dropdown">
          <option value="">Please select one</option>
          <option 
            v-bind:key="option" 
            v-for="option in options" 
            :value="option" 
            :selected="$attrs.value === option">
              {{ option }}
          </option>
        </select>
        <SmallButton v-if="add" @click.native="$emit('plus')" />
        <SmallButton v-if="cancel" @click.native="$emit('del')" cancel=true />
      </div>
  </span>
</template>

<script>
import SmallButton from './SmallButton.vue';

export default {
  name: 'Dropdown',
  components: {
    SmallButton
  },
  props: ["label", "options", "add", "cancel", "description"],
  methods: {
    input() {
      this.$emit('input', this.$refs.dropdown.value)
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
  justify-content: end;
  align-items: center;
}

.icon {
    line-height: normal;
    margin-left: .25rem;
    opacity: 0.6;
}

select {
    background: #F4F4F4;
    border: 1px solid #555555;
    box-sizing: border-box;
    border-radius: 15px;
    padding: .3rem;
    padding-right: -1rem;
    margin-right: .5rem;
    width: 13rem;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #555555;
}
</style>
