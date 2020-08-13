<template>
<div class="input">
      <div class="group">
        <label>{{label}}: </label>
        <i v-if="description !== ''" class="fas fa-info-circle icon" :title=description></i>
      </div>
      <div class="switch" @click="input">
        <input type="checkbox" ref="boolean_input" :checked=value>
        <span class="slider round"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchComponent',
  props: ["label", "placeholder", "value", "description"],
  methods: {
    input() {
        this.$emit('input', this.$refs.boolean_input.value);
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
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 25.5px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19.5px;
  width: 19.5px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #40c351;
}

input:focus + .slider {
  box-shadow: 0 0 1px #40c351;
}

input:checked + .slider:before {
  -webkit-transform: translateX(19.5px);
  -ms-transform: translateX(19.5px);
  transform: translateX(19.5px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 25.5px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>