<template>
    <button>
        <div>{{text}}</div>
    </button>
</template>

<script lang="ts">
/* eslint no-unused-vars: "warn" */
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'GenericButton',
  props: ["text"]
})

export default class App extends Vue {}
</script>

<style scoped>
button {
    cursor: pointer;
    background: #FF6D5A;
    box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
    border-width: 0;
    padding: 1rem;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    width: 15rem;
}
</style>