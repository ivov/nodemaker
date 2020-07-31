<template>
    <button>
        <div class="button">
            <div>{{text}}</div>
            <i class="fas fa-plus-circle"></i>
        </div>
    </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AddButton',
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
    width: 10rem;
}

.button {
    display: flex;
    align-content: center;
    justify-content: space-evenly;
}

.icon {
    line-height: normal;
}
</style>